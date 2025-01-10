"use client";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Layers, ListFilter, Search } from "lucide-react";
import * as React from "react";
import ButtonAdd from "./components/create/create";
import Board from "./components/board";
import api from "@/lib/api";
import { useParams } from "next/navigation";
import SelectProject from "./components/selectProject";
import { AvatarGroup } from "./components/avatarGroup";
import { MultiSelect } from "./components/multiSelect";
import { Task, User } from "../types/types";
import { Project } from "@/app/projects/types/types";

export default function TasksDetail() {
  const [dataProject, setDataProject] = React.useState<Project<Task>>();
  const [dataTask, setDataTask] = React.useState<Task[]>();
  const [dataUser, setDataUser] = React.useState<User[]>();
  const [dataProjectList, setDataProjectList] = React.useState<Project[]>();
  const [search, setSearch] = React.useState<string>("");
  const { id } = useParams<{ id: string }>();
  const [selectUserId, setSelectUserId] = React.useState<string[]>([]);

  const getDataTask = async () => {
    try {
      const res = await api.get(
        `/tasks?project_id=${id}&title=${search}&user_id=${selectUserId}`
      );
      if (res.data) {
        const sortedData = res.data.data.sort(
          (a: { createdAt: string }, b: { createdAt: string }) => {
            const dateA = new Date(a.createdAt);
            const dateB = new Date(b.createdAt);
            return dateB.getTime() - dateA.getTime(); // Urutkan dari terbaru ke terlama
          }
        );
        setDataTask(sortedData);
      } else {
        console.error("Unexpected data format:", res.data);
      }
    } catch (error) {
      if (error instanceof Error) {
        console.error("Failed to fetch:", error.message);
      } else {
        console.error("Failed to fetch:", error);
      }
    }
  };

  const getDataProject = async () => {
    try {
      const res = await api.get(`/projects/${id}`);
      if (res.data) {
        setDataProject(res.data.data);
      } else {
        console.error("Unexpected data format:", res.data);
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error("Failed to fetch :", error.message);
      } else {
        console.error("Failed to fetch :", error);
      }
    }
  };

  const getDataProjectList = async () => {
    try {
      const res = await api.get(`/projects`);
      if (res.data) {
        setDataProjectList(res.data.data);
      } else {
        console.error("Unexpected data format:", res.data);
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error("Failed to fetch :", error.message);
      } else {
        console.error("Failed to fetch :", error);
      }
    }
  };

  const getDataUser = async () => {
    try {
      const res = await api.get(`/users`);
      if (res.data) {
        setDataUser(res.data.data);
      } else {
        console.error("Unexpected data format:", res.data);
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error("Failed to fetch :", error.message);
      } else {
        console.error("Failed to fetch :", error);
      }
    }
  };

  React.useEffect(() => {
    getDataTask();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search, selectUserId]);

  React.useEffect(() => {
    getDataProject();
    getDataProjectList();
    getDataUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const avatarIcn: { [key: number]: string } = {
    0: "/images/avatar-02.png",
    1: "/images/avatar-04.png",
    2: "/images/avatar-05.png",
  };

  return (
    <div>
      {/* Filter */}
      <div className="gap-2 mt-10 mb-4 flex justify-between items-center py-4 border-b-2 border-b-gray-200">
        <div className="relative flex-grow">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
            <Search size={20} />
          </span>
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            type="text"
            placeholder="Search"
            className="bg-white pl-10 w-full md:w-[300px]"
          />
        </div>

        <MultiSelect
          trigger={
            <div className="cursor-pointer">
              <AvatarGroup
                avatars={
                  dataUser?.map((user, index) => ({
                    src: index < 3 ? avatarIcn[index] : "",
                    alt: user.name,
                  })) || []
                }
              />
            </div>
          }
          options={
            dataUser?.map((item) => ({
              id: item.id,
              label: item.name,
              email: item.email,
            })) || []
          }
          defaultValue={[]}
          onChange={(id) => setSelectUserId(id)}
        />

        <div className="hidden md:flex gap-2">
          <SelectProject
            items={
              dataProjectList?.map((item) => ({
                value: item.id,
                label: item.title,
                taskCount: item.tasks.length,
              })) || []
            }
          />

          <Button variant={"outline"}>
            <ListFilter />
            Filter
          </Button>
          <ButtonAdd fetchData={getDataTask} />
        </div>
      </div>

      <div className="flex justify-between md:hidden mb-4">
        <div className="flex gap-2">
          <SelectProject
            items={
              dataProjectList?.map((item) => ({
                value: item.id,
                label: item.title,
                taskCount: item.tasks.length,
              })) || []
            }
          />

          <Button variant={"outline"}>
            <ListFilter />
            Filter
          </Button>
        </div>

        <ButtonAdd fetchData={getDataTask} />
      </div>

      <Accordion
        type="single"
        collapsible
        defaultValue="item-1"
        className="w-full mb-4 bg-white px-3 rounded-lg shadow-sm"
      >
        <AccordionItem value="item-1">
          <AccordionTrigger>
            <h1 className="text-lg sm:text-2xl font-bold flex gap-2 items-center">
              <span>
                <Layers size={24} className="text-black" />
              </span>
              {dataProject?.title}
            </h1>
          </AccordionTrigger>
          <AccordionContent>
            <p className="text-sm text-gray-500">{dataProject?.description}</p>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      <div className="overflow-x-auto snap-x snap-mandatory">
        <div className="flex min-w-[1000px] space-x-2 md:space-x-3">
          <Board tasks={dataTask || []} fetchData={getDataTask} />
        </div>
      </div>
    </div>
  );
}
