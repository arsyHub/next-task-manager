import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Circle, Plus } from "lucide-react";
import React from "react";

export default function Board() {
  const board = [
    {
      name: "todo",
      label: "To-Do",
      color: "gray",
    },
    {
      name: "on progress",
      label: "On Progress",
      color: "violet",
    },
    {
      name: "in review",
      label: "In Review",
      color: "orange",
    },
    {
      name: "completed",
      label: "Completed",
      color: "green",
    },
  ];

  const task = [
    {
      status: "todo",
      title: "Task 1",
      description: "Task description",
    },
    {
      status: "todo",
      title: "Task 2",
      description: "Task description",
    },
    {
      status: "on progress",
      title: "Task 3",
      description: "Task description",
    },
    {
      status: "in review",
      title: "Task 4",
      description: "Task description",
    },
    {
      status: "completed",
      title: "Task 5",
      description: "Task description",
    },
    {
      status: "completed",
      title: "Task 6",
      description: "Task description",
    },
    {
      status: "completed",
      title: "Task 7",
      description: "Task description",
    },
  ];

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
                <span className="ml-2 text-sm text-gray-500">10</span>
              </h1>
            </div>

            <Button variant="secondary" className="rounded-full" size={"icon"}>
              <Plus />
            </Button>
          </div>

          <div className="overflow-y-auto h-[calc(100vh-150px)] flex flex-col gap-3 p-2 bg-gray-100 rounded-md pb-14 border border-gray-300">
            {/* {Array.from({ length: 10 }).map((_, index) => (
              <Card key={index} className=" rounded-lg">
                <CardHeader>
                  <CardTitle className="text-md">Task {index + 1}</CardTitle>
                  <CardDescription>Task description</CardDescription>
                </CardHeader>
              </Card>
            ))} */}

            {task.map((item, index) =>
              item.status === boards.name ? (
                <Card key={index} className=" rounded-lg max-h-[100px]">
                  <CardHeader>
                    <CardTitle className="text-md">Task {index + 1}</CardTitle>
                    <CardDescription>Task description</CardDescription>
                  </CardHeader>
                </Card>
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
