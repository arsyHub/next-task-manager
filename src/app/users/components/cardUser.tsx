import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@radix-ui/react-popover";
import { Ellipsis } from "lucide-react";
import React from "react";
import DeleteUser from "./delete/delete";
import EditUser from "./edit/edit";

interface CardUserProps {
  id: string;
  name: string;
  email: string;
  fetchData?: () => void;
}

export default function CardUser({
  id,
  name,
  email,
  fetchData,
}: CardUserProps) {
  return (
    <Card className="w-full md:max-w-[400px]">
      <CardHeader>
        <div className="flex justify-end items-center">
          <Popover>
            <PopoverTrigger className="bg-[#F2F3F8] px-2 rounded-md">
              <Ellipsis />
            </PopoverTrigger>
            <PopoverContent className="p-2">
              <div className="bg-white flex flex-col gap-2 p-3 border border-gray-200 rounded-lg">
                <EditUser id={id} fetchData={fetchData} />
                <DeleteUser id={id} fetchData={fetchData} />
              </div>
            </PopoverContent>
          </Popover>
        </div>
        <CardTitle>{name}</CardTitle>
        <CardDescription>{email}</CardDescription>
      </CardHeader>
    </Card>
  );
}
