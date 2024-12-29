import React, { useEffect, useState } from "react";
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
import { Clock, Ellipsis, Heart } from "lucide-react";
import DeleteProject from "./delete/delete";
import EditProject from "./edit/edit";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { Badge } from "@/components/ui/badge";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

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

  const [savedProjects, setSavedProjects] = useState<string[]>([]);

  useEffect(() => {
    // Fetch projects from cookies when component mounts
    const projects = Cookies.get("projects");
    if (projects) {
      setSavedProjects(JSON.parse(projects));
    }
  }, []);

  const toggleSave = (id: string) => {
    let projects = [...savedProjects]; // Create a copy of the current saved projects

    if (projects.includes(id)) {
      // If the ID is already in the array, remove it
      projects = projects.filter((projectId) => projectId !== id);
    } else {
      // Otherwise, add the ID to the array
      projects.push(id);
    }

    // Update cookies and state
    Cookies.set("projects", JSON.stringify(projects), { expires: 30 });
    setSavedProjects(projects);
  };

  const isSaved = savedProjects.includes(id); // Check if the current project is saved

  return (
    <Card className="w-full md:max-w-[400px]">
      <CardHeader className="p-3">
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
          className="text-xl cursor-pointer hover:underline"
        >
          {title}
        </CardTitle>
        <CardDescription className="line-clamp-1">
          {description}
        </CardDescription>
        <div className="flex items-center justify-between gap-1 text-[11px] text-muted-foreground pt-2">
          <span onClick={() => toggleSave(id)} className="cursor-pointer">
            <Heart size={15} className={isSaved ? "text-red-500" : ""} />
          </span>
          <div className="flex items-center gap-1">
            <Clock size={13} /> {dayjs(date).fromNow()}
          </div>
        </div>
      </CardHeader>
    </Card>
  );
}
