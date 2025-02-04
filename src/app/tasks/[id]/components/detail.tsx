import * as React from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import dayjs from "dayjs";
import { Badge } from "@/components/ui/badge";
import {
  CalendarClock,
  Circle,
  Ellipsis,
  Squircle,
  Tag,
  UserRoundCheck,
} from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { FormTask } from "./edit/formTask";
import DeleteTask from "./delete/delete";
import api from "@/lib/api";
import { toast } from "sonner";
import { Task } from "../../types/types";

interface Props {
  children: React.ReactNode;
  taskDetail: Task;
  fetchData: () => void;
}

export default function DetailTask({
  children,
  taskDetail: task,
  fetchData,
}: Props) {
  const [selectedStatus, setSelectedStatus] = React.useState<string>(
    task.status
  );
  const [isEdit, setIsEdit] = React.useState<boolean>(false);

  const onUpdateStatus = async (status: string) => {
    try {
      setSelectedStatus(status);
      await api.put(`/tasks/${task.id}`, {
        status: status,
      });
      toast.success("Status edited successfully");
      fetchData();
    } catch {
      toast.error("Something went wrong");
    }
  };

  const tagColor: { [key: string]: string } = {
    Priority: "text-blue-600",
    Bug: "text-red-600",
    Task: "text-green-400",
    Reject: "text-yellow-500",
    Refactor: "text-orange-500",
  };

  return (
    <Sheet>
      <SheetTrigger onClick={() => setIsEdit(false)}>{children}</SheetTrigger>
      {!isEdit ? (
        <SheetContent className="md:w-[450px] w-full p-2 md:p-4">
          <SheetHeader>
            <SheetTitle>
              <h1 className="text-xl text-start mt-8 flex items-center gap-2">
                <span>
                  <Squircle
                    size={20}
                    className={`${
                      task.tag ? tagColor[task.tag] : "text-gray-300"
                    } fill-current`}
                  />
                </span>
                {task.title}
              </h1>

              <div className="my-3">
                <Select
                  value={selectedStatus}
                  onValueChange={(value) => onUpdateStatus(value)}
                >
                  <SelectTrigger className="w-[180px] bg-[white]">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent defaultValue="todo">
                    <SelectGroup>
                      <SelectLabel>Status</SelectLabel>
                      <SelectItem value="todo">
                        <div className="flex items-center gap-2">
                          <Circle size={14} color="gray" />
                          To-Do
                        </div>
                      </SelectItem>
                      <SelectItem value="on progress">
                        <div className="flex items-center gap-2">
                          <Circle size={14} color="violet" />
                          On Progress
                        </div>
                      </SelectItem>
                      <SelectItem value="in review">
                        <div className="flex items-center gap-2">
                          <Circle size={14} color="orange" />
                          In Review
                        </div>
                      </SelectItem>
                      <SelectItem value="completed">
                        <div className="flex items-center gap-2">
                          <Circle size={14} color="green" />
                          Completed
                        </div>
                      </SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            </SheetTitle>
            <SheetDescription>
              <div className="text-start">
                <h1 className="text-black font-bold">Description</h1>
                <p>{task.description}</p>
              </div>

              <div className="flex justify-end items-center mt-2">
                <Popover>
                  <PopoverTrigger className="bg-[#F2F3F8] px-2 rounded-md">
                    <Ellipsis />
                  </PopoverTrigger>
                  <PopoverContent className="p-2 w-[100px]">
                    <div className="text-sm flex gap-2 flex-col">
                      <p
                        className="cursor-pointer"
                        onClick={() => setIsEdit(true)}
                      >
                        Edit
                      </p>
                      <DeleteTask id={task.id} fetchData={fetchData} />
                    </div>
                  </PopoverContent>
                </Popover>
              </div>
              <div className="border border-gray-300 rounded-md p-2 mt-4">
                <table className="border-spacing-y-3 border-separate w-full">
                  <tbody>
                    <tr>
                      <td className="text-start text-black">
                        <span>
                          <CalendarClock size={15} />
                        </span>
                        Due date
                      </td>
                      <td className="block sm:ml-12 text-start mt-2">
                        :{" "}
                        {task.due_date &&
                          dayjs(task.due_date).format("DD/MM/YYYY")}
                      </td>
                    </tr>

                    <tr>
                      <td className="text-start text-black">
                        <span>
                          <UserRoundCheck size={15} />
                        </span>
                        Assign to{" "}
                      </td>
                      <td className="block sm:ml-12 text-start mt-2">
                        : {task.users?.map((user) => user.name).join(", ")}
                      </td>
                    </tr>

                    <tr>
                      <td className="text-start text-black">
                        <span>
                          <Tag size={15} />
                        </span>
                        Tag{" "}
                      </td>
                      <td className="block sm:ml-12 text-start mt-2">
                        : {task.tag ? <Badge>{task.tag}</Badge> : ""}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </SheetDescription>
          </SheetHeader>
        </SheetContent>
      ) : (
        <SheetContent className="md:w-[450px] w-full p-2 md:p-4">
          <FormTask
            onClose={() => {
              setIsEdit(false);
              fetchData();
            }}
            task={task}
          />
        </SheetContent>
      )}
    </Sheet>
  );
}
