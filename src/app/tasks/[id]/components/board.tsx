import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Circle, Plus, Squircle } from "lucide-react";
import React, { useState, useEffect } from "react";
import Create from "./create/create";
import DetailTask from "./detail";
import { AvatarGroup } from "./avatarGroup";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import {
  DragDropContext,
  Draggable,
  Droppable,
  type DropResult,
} from "react-beautiful-dnd";
import api from "@/lib/api";
import { toast } from "sonner";
import { StatusEnum, Task } from "../../types/types";

dayjs.extend(relativeTime);

interface Props {
  tasks: Array<Task>;
  fetchData: () => void;
}

interface Iboard {
  name: StatusEnum;
  label: string;
  color: string;
}

export default function Board({ tasks, fetchData }: Props) {
  const [localTasks, setTasks] = useState(tasks);

  // Sinkronisasi state lokal dengan prop tasks
  useEffect(() => {
    setTasks(tasks);
  }, [tasks]);

  const board: Iboard[] = [
    {
      name: StatusEnum.todo,
      label: "To-Do",
      color: "gray",
    },
    {
      name: StatusEnum.onProgress,
      label: "On Progress",
      color: "violet",
    },
    {
      name: StatusEnum.inReview,
      label: "In Review",
      color: "orange",
    },
    {
      name: StatusEnum.completed,
      label: "Completed",
      color: "green",
    },
  ];

  const avatarIcn: { [key: number]: string } = {
    0: "/images/avatar-02.png",
    1: "/images/avatar-04.png",
    2: "/images/avatar-05.png",
  };

  const buttonAction = (
    <Button variant="secondary" size="icon" className="rounded-full">
      <Plus />
    </Button>
  );

  const tagColor: { [key: string]: string } = {
    Priority: "text-blue-600",
    Bug: "text-red-600",
    Task: "text-green-400",
    Reject: "text-yellow-500",
    Refactor: "text-orange-500",
  };

  const onDragEnd = async (result: DropResult) => {
    if (!result.destination) return; // Jika tidak ada destinasi, keluar
    if (result.destination.droppableId === result.source.droppableId) return; // Jika tidak berpindah kolom, keluar

    const draggableId = result.draggableId;
    const destinationIndex = result.destination.index;

    // Salin tasks
    const updatedTasks = [...localTasks];
    const movedTaskIndex = updatedTasks.findIndex(
      (task) => String(task.id) === draggableId
    );

    if (movedTaskIndex !== -1) {
      // Pindahkan task di state lokal
      const [movedTask] = updatedTasks.splice(movedTaskIndex, 1);
      movedTask.status = result.destination.droppableId as StatusEnum; // Ubah status sesuai kolom
      updatedTasks.splice(destinationIndex, 0, movedTask); // Masukkan ke posisi baru

      setTasks(updatedTasks); // Perbarui state lokal
    }

    try {
      // Update ke backend
      await api.put(`/tasks/${draggableId}`, {
        status: result.destination.droppableId,
        order: destinationIndex,
      });
      toast.success("Task moved successfully");
      fetchData(); // Sinkronisasi ulang dengan backend
    } catch (error) {
      console.error("Error updating task:", error);
      toast.error("Failed to move task. Please try again.");
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      {board.map((boards) => (
        <div
          key={boards.name}
          className="flex-1 snap-center bg-white p-2 rounded-lg min-w-[290px] border border-gray-300 shadow-md"
        >
          <div className="flex justify-between items-center mb-3 ">
            <div className="flex items-center gap-2">
              <span className="mb-[2px] ml-2">
                <Circle color={boards.color} size={15} />
              </span>
              <h1 className="text-lg">
                {boards.label}
                <span className="ml-2 text-sm text-gray-500">
                  {
                    localTasks.filter((item) => item.status === boards.name)
                      .length
                  }
                </span>
              </h1>
            </div>

            <Create
              buttonTrigger={buttonAction}
              fetchData={fetchData}
              status={boards.name}
            />
          </div>

          <Droppable droppableId={boards.name}>
            {(provided, snapshot) => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                className={`overflow-y-auto h-[calc(100vh-150px)] flex flex-col gap-3 p-2 rounded-md pb-14 border border-gray-300 ${
                  snapshot.isDraggingOver ? "bg-gray-200" : "bg-gray-100"
                }`}
              >
                {localTasks.map((item, index) =>
                  item.status === boards.name ? (
                    <DetailTask
                      key={item.id} // Pastikan key unik
                      taskDetail={item}
                      fetchData={fetchData}
                    >
                      <Draggable draggableId={String(item.id)} index={index}>
                        {(provided) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                          >
                            <Card className="rounded-lg text-start">
                              <CardHeader className="p-3">
                                <CardTitle className="text-md flex gap-1 items-center ">
                                  <span>
                                    <Squircle
                                      className={`${`${
                                        item.tag
                                          ? tagColor[item.tag]
                                          : "text-gray-300"
                                      }`} fill-current`}
                                      size={12}
                                    />
                                  </span>
                                  <p className="line-clamp-1">{item.title}</p>
                                </CardTitle>
                                <CardDescription className="line-clamp-1">
                                  {item.description}
                                </CardDescription>

                                <div className="flex justify-between">
                                  <AvatarGroup
                                    avatars={
                                      item.users?.map((user, index) => ({
                                        src: index < 3 ? avatarIcn[index] : "",
                                        alt: user.name,
                                      })) || []
                                    }
                                  />

                                  <div className="text-xs text-gray-500 mt-2">
                                    {item.due_date &&
                                      dayjs(item.due_date).format(
                                        "DD MMM YYYY"
                                      )}
                                  </div>
                                </div>
                              </CardHeader>
                            </Card>
                          </div>
                        )}
                      </Draggable>
                    </DetailTask>
                  ) : null
                )}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </div>
      ))}
    </DragDropContext>
  );
}
