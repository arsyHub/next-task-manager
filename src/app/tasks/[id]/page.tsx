"use client";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Circle, ListFilter, Plus, Search } from "lucide-react";
import React from "react";
import ButtonAdd from "./components/create/create";

export default function TasksDetail() {
  const [search, setSearch] = React.useState<string>("");

  const getData = () => {
    console.log("Fetching data");
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

        <div className="hidden md:flex gap-2">
          <Select>
            <SelectTrigger className="w-[180px] bg-white">
              <SelectValue placeholder="Select project" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Projects</SelectLabel>
                <SelectItem value="apple">Apple</SelectItem>
                <SelectItem value="banana">Banana</SelectItem>
                <SelectItem value="blueberry">Blueberry</SelectItem>
                <SelectItem value="grapes">Grapes</SelectItem>
                <SelectItem value="pineapple">Pineapple</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>

          <Button variant={"outline"}>
            <ListFilter />
            Filter
          </Button>
          <ButtonAdd fetchData={getData} />
        </div>
      </div>

      <div className="flex justify-between md:hidden mb-4">
        <div className="flex gap-2">
          <Select>
            <SelectTrigger className="w-[180px] bg-white">
              <SelectValue placeholder="Select project" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Projects</SelectLabel>
                <SelectItem value="apple">Apple</SelectItem>
                <SelectItem value="banana">Banana</SelectItem>
                <SelectItem value="blueberry">Blueberry</SelectItem>
                <SelectItem value="grapes">Grapes</SelectItem>
                <SelectItem value="pineapple">Pineapple</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>

          <Button variant={"outline"}>
            <ListFilter />
            Filter
          </Button>
        </div>

        <ButtonAdd fetchData={getData} />
      </div>

      <Accordion
        type="single"
        collapsible
        defaultValue="item-1"
        className="w-full mb-4 bg-white px-3 rounded-lg shadow-sm"
      >
        <AccordionItem value="item-1">
          <AccordionTrigger>
            <h1 className="text-lg sm:text-2xl font-bold">E-Book</h1>
          </AccordionTrigger>
          <AccordionContent>
            <p className="text-sm text-gray-500">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet
              rerum accusantium doloribus possimus.
            </p>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      <div className="overflow-x-auto snap-x snap-mandatory">
        <div className="flex min-w-[1000px] space-x-3 ">
          {Array.from({ length: 4 }).map((_, index) => (
            <div
              key={index}
              className="flex-1 snap-center bg-white p-2 rounded-lg min-w-[290px] border border-gray-300 shadow-md"
            >
              <div className="flex justify-between items-center mb-3 ">
                <div className="flex items-center gap-2">
                  <span>
                    <Circle color="green" size={20} />
                  </span>
                  <h1 className="text-lg">
                    To-Do
                    <span className="ml-2 text-sm text-gray-500">10</span>
                  </h1>
                </div>

                <Button
                  variant="secondary"
                  className="rounded-full"
                  size={"icon"}
                >
                  <Plus />
                </Button>
              </div>

              <div className="overflow-y-auto h-[calc(100vh-150px)] grid grid-cols-1 gap-3 p-2 bg-gray-100 rounded-md pb-14">
                {Array.from({ length: 10 }).map((_, index) => (
                  <Card key={index} className=" rounded-lg">
                    <CardHeader>
                      <CardTitle className="text-md">
                        Task {index + 1}
                      </CardTitle>
                      <CardDescription>Task description</CardDescription>
                    </CardHeader>
                  </Card>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
