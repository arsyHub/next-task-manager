import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Circle, Plus, Squircle } from "lucide-react";
import React from "react";
import Create from "./create/create";
import DetailTask from "./detail";
import { AvatarGroup } from "./avatarGroup";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);

interface BoardProps {
  tasks: Array<{
    id: string;
    status: StatusEnum;
    title: string;
    description: string;
    tag: string;
    users: { id: string; name: string; email: string }[] | null;
    due_date: string;
  }>;
  fetchData: () => void;
}

enum StatusEnum {
  todo = "todo",
  onProgress = "on progress",
  inReview = "in review",
  completed = "completed",
}

interface Iboard {
  name: StatusEnum;
  label: string;
  color: string;
}

export default function Board({ tasks, fetchData }: BoardProps) {
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

  return (
    <>
      {board.map((boards, index) => (
        <div
          key={index}
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
                  {tasks.filter((item) => item.status === boards.name).length}
                </span>
              </h1>
            </div>

            <Create
              buttonTrigger={buttonAction}
              fetchData={fetchData}
              status={boards.name}
            />
          </div>

          <div className="overflow-y-auto h-[calc(100vh-150px)] flex flex-col gap-3 p-2 bg-gray-100 rounded-md pb-14 border border-gray-300">
            {tasks.map((item, index) =>
              item.status === boards.name ? (
                <DetailTask key={index} taskDetail={item} fetchData={fetchData}>
                  <Card className=" rounded-lg max-h-[] text-start">
                    <CardHeader className="p-3">
                      <CardTitle className="text-md flex gap-1 items-center ">
                        <span>
                          <Squircle
                            className={`${`${
                              item.tag ? tagColor[item.tag] : "text-gray-300"
                            }`} ${"fill-current"}`}
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
                          {item.due_date && dayjs(item.due_date).fromNow()}
                        </div>
                      </div>
                    </CardHeader>
                  </Card>
                </DetailTask>
              ) : (
                <></>
              )
            )}
          </div>
        </div>
      ))}
    </>
  );
}
