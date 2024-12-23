"use client";

import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import React from "react";
import ButtonAdd from "./components/create/create";
import CardProject from "./components/cardProject";
import api from "@/lib/api";

interface Project {
  id: string;
  title: string;
  description: string;
  createdAt: string;
}

export default function Projects() {
  const [data, setData] = React.useState<Project[]>([]);
  const [search, setSearch] = React.useState<string>("");

  const getData = async () => {
    try {
      const response = await api.get(`/projects?title=${search}`);
      if (response.data && Array.isArray(response.data.data)) {
        setData(response.data.data);
      } else {
        console.error("Unexpected data format:", response.data);
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error("Failed to fetch projects:", error.message);
      } else {
        console.error("Failed to fetch projects:", error);
      }
    }
  };

  React.useEffect(() => {
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search]);

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
        <div className="hidden md:block">
          <ButtonAdd fetchData={getData} />
        </div>
      </div>

      <div className="flex justify-end md:hidden mb-4">
        <ButtonAdd fetchData={getData} />
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-3 pb-14">
        {data.map((project: Project) => (
          <CardProject
            key={project.id}
            id={project.id}
            title={project.title}
            description={project.description}
            date={project.createdAt}
            fetchData={getData}
          />
        ))}
      </div>
    </div>
  );
}
