"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import React from "react";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import api from "@/lib/api";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { useParams } from "next/navigation";
import dayjs from "dayjs";
import { Textarea } from "@/components/ui/textarea";

const formSchema = z.object({
  project_id: z.string(),
  title: z.string().min(5).max(255),
  description: z.string().min(5).max(255),
  status: z.enum(["todo", "on progress", "in review", "completed"]),
  tag: z.string().optional(),
  due_date: z.string().optional(),
  user_ids: z.array(z.string()).optional(),
});

type FormValues = z.infer<typeof formSchema>;

enum StatusEnum {
  todo = "todo",
  onProgress = "on progress",
  inReview = "in review",
  completed = "completed",
}

interface FormTaskProps {
  onClose: () => void;
  defaultStatus?: StatusEnum;
}

export function FormTask({ onClose, defaultStatus }: FormTaskProps) {
  const [isLoading, setIsLoading] = React.useState(false);

  const { id: project_id } = useParams<{ id: string }>();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      project_id: project_id,
      title: "",
      description: "",
      status: defaultStatus || StatusEnum.todo,
      tag: "",
      due_date: "",
      user_ids: [],
    },
  });

  const onSubmit = async (data: FormValues) => {
    try {
      setIsLoading(true);
      data.due_date = dayjs(data.due_date).format("YYYY-MM-DD");
      if (data.due_date === "Invalid Date") {
        data.due_date = "";
      }
      await api.post("/tasks", data);
      toast.success("Task created successfully");
      onClose();
    } catch (error) {
      toast.error(`Failed to create Task: ${error}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter your Task name " {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                  rows={3}
                  placeholder="Enter your Task description"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="status"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Status</FormLabel>
              <FormControl>
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a fruit" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Status</SelectLabel>
                      <SelectItem value="todo">To-Do</SelectItem>
                      <SelectItem value="on progress">On Progress</SelectItem>
                      <SelectItem value="in review">In Review</SelectItem>
                      <SelectItem value="completed">Completed</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="tag"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tag</FormLabel>
              <FormControl>
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Tag" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Tag</SelectLabel>
                      <SelectItem value="-">-</SelectItem>
                      <SelectItem value="Priority">Priority</SelectItem>
                      <SelectItem value="Reject">Reject</SelectItem>
                      <SelectItem value="Refactor">Refactor</SelectItem>
                      <SelectItem value="Task">Task</SelectItem>
                      <SelectItem value="Bug">Bug</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="due_date"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Due Date</FormLabel>
              <FormControl>
                <Input
                  type="date"
                  value={field.value || ""}
                  onChange={(e) => field.onChange(e.target.value)}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button disabled={isLoading} type="submit" className="w-full">
          {isLoading && <Loader2 className="animate-spin" />}
          Save
        </Button>
      </form>
    </Form>
  );
}
