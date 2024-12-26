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
import { Clock, Ellipsis } from "lucide-react";
import React from "react";
import DeleteProject from "./delete/delete";
import EditProject from "./edit/edit";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { Badge } from "@/components/ui/badge";
import { useRouter } from "next/navigation";
dayjs.extend(relativeTime);

interface CardProjectProps {
  id: string;
  title: string;
  description: string;
  fetchData?: () => void;
  date: string;
  tasks: Array<object>;
}

export default function CardProject({
  id,
  title,
  description,
  date,
  tasks,
  fetchData,
}: CardProjectProps) {
  const router = useRouter();
  return (
    <Card className="w-full md:max-w-[400px]">
      <CardHeader>
        <div className="flex justify-between items-center mb-3">
          <Badge variant="default">
            <div className="flex items-center gap-1">{tasks.length} Tasks</div>
          </Badge>
          <Popover>
            <PopoverTrigger className="bg-[#F2F3F8] px-2 rounded-md">
              <Ellipsis />
            </PopoverTrigger>
            <PopoverContent className="p-2">
              <div className="bg-white flex flex-col gap-2 p-3 border border-gray-200 rounded-lg">
                <EditProject id={id} fetchData={fetchData} />
                <DeleteProject id={id} fetchData={fetchData} />
              </div>
            </PopoverContent>
          </Popover>
        </div>
        <CardTitle
          onClick={() => router.push(`/tasks/${id}`)}
          className="text-xl cursor-pointer"
        >
          {title}
        </CardTitle>
        <CardDescription className="line-clamp-2">
          {description}
        </CardDescription>
        <div className="flex items-center justify-end gap-1 text-[11px] text-muted-foreground pt-2">
          <Clock size={13} /> {dayjs(date).fromNow()}
        </div>
      </CardHeader>
    </Card>
  );
}
