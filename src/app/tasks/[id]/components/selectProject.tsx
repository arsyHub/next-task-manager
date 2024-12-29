import React, { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react"; // Import ikon pencarian
import { useRouter } from "next/navigation";

interface Props {
  items: { value: string; label: string; taskCount?: string | number }[];
}

export default function SelectProject({ items = [] }: Props) {
  const [searchQuery, setSearchQuery] = useState("");

  const route = useRouter();

  const filteredItems = items.filter((item) =>
    item.label.toLowerCase().includes(searchQuery.toLowerCase())
  ); // Filter data berdasarkan teks pencarian

  const handleItemSelected = (id: string) => {
    route.push(`/tasks/${id}`);
  };
  return (
    <Select onValueChange={(value) => handleItemSelected(value)}>
      <SelectTrigger className="w-[180px] bg-white">
        <SelectValue placeholder="Select project" />
      </SelectTrigger>
      <SelectContent>
        <div className="p-2">
          {/* Input pencarian dengan ikon */}
          <div className="relative">
            <Search
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500"
              size={16}
            />
            <Input
              placeholder="Search project..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onMouseDown={(e) => e.stopPropagation()} // Tambahkan ini
              className="pl-10" // Tambahkan padding kiri untuk memberi ruang pada ikon
            />
          </div>
        </div>
        {filteredItems.length > 0 ? (
          filteredItems.map((item, index) => (
            <SelectItem key={index} value={item.value}>
              <span className="mr-2 text-sm text-gray-500">
                {item.taskCount}
              </span>
              {item.label.toUpperCase()}
            </SelectItem>
          ))
        ) : (
          <div className="p-2 text-sm text-gray-500">No project found</div>
        )}
      </SelectContent>
    </Select>
  );
}
