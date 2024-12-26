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
import { Circle, Ellipsis } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { FormTask } from "./edit/formTask";

enum StatusEnum {
  todo = "todo",
  onProgress = "on progress",
  inReview = "in review",
  completed = "completed",
}

type Task = {
  id: string;
  title: string;
  description: string;
  status: StatusEnum;
  tag: string;
  user_ids: string[];
  due_date: string;
};

interface DetailTaskProps {
  children: React.ReactNode;
  taskDetail: Task;
  fetchData: () => void;
}

export default function DetailTask({
  children,
  taskDetail: task,
  fetchData,
}: DetailTaskProps) {
  const [selectedStatus, setSelectedStatus] = React.useState<string>(
    task.status
  );
  const [isEdit, setIsEdit] = React.useState<boolean>(false);

  return (
    <Sheet>
      <SheetTrigger onClick={() => setIsEdit(false)}>{children}</SheetTrigger>
      {!isEdit ? (
        <SheetContent className="md:w-1/2 w-full p-2 md:p-4">
          <SheetHeader>
            <SheetTitle>
              <h1 className="text-xl text-start mt-8">{task.title}</h1>

              <div className="my-3">
                <Select
                  value={selectedStatus}
                  onValueChange={setSelectedStatus}
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
                <h1 className="text-black">Description</h1>
                <p>{task.description}</p>
              </div>

              <div className="flex justify-end items-center">
                <Popover>
                  <PopoverTrigger className="bg-[#F2F3F8] px-2 rounded-md">
                    <Ellipsis />
                  </PopoverTrigger>
                  <PopoverContent className="p-2 w-[100px]">
                    {/* <div className="bg-white flex flex-col gap-2 p-3 border border-gray-200 rounded-lg"> */}
                    <div className="text-sm flex gap-2 flex-col">
                      <p
                        className="cursor-pointer"
                        onClick={() => setIsEdit(true)}
                      >
                        Edit
                      </p>
                      <p className="text-[red] cursor-pointer">Delete</p>
                    </div>
                  </PopoverContent>
                </Popover>
              </div>
              <div className="border border-gray-300 rounded-md p-2 mt-4">
                <table className="border-spacing-y-3 border-separate w-full">
                  <tbody>
                    <tr>
                      <td className="text-start">Due date </td>
                      <td className="block sm:ml-16 text-start">
                        : {dayjs(task.due_date).format("DD/MM/YYYY")}
                      </td>
                    </tr>

                    <tr>
                      <td className="text-start">Assignee </td>
                      <td className="block sm:ml-16 text-start">
                        : {task.user_ids}
                      </td>
                    </tr>

                    <tr>
                      <td className="text-start">Tag </td>
                      <td className="block sm:ml-16 text-start">
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
        <SheetContent className="md:w-1/2 w-full p-2 md:p-4">
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
