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

const formSchema = z.object({
  title: z.string().min(5).max(255),
  description: z.string().min(5).max(255),
});

type FormValues = z.infer<typeof formSchema>;

interface Props {
  onClose: () => void;
  id: string;
}

export function FormProject({ onClose, id }: Props) {
  const [isLoading, setIsLoading] = React.useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
    },
  });

  React.useEffect(() => {
    const fetchProject = async () => {
      try {
        const response = await api.get(`/projects/${id}`);
        form.setValue("title", response.data.data.title);
        form.setValue("description", response.data.data.description);
      } catch (error) {
        console.error("Error fetching project:", error);
      }
    };
    fetchProject();
  }, [id, form]);

  const onSubmit = async (data: FormValues) => {
    try {
      setIsLoading(true);
      await api.put(`/projects/${id}`, data);
      toast.success("Project edited successfully");
      onClose();
    } catch (error) {
      toast.error(`Failed to edit project: ${error}`);
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
                <Input
                  defaultValue={form.getValues("title")}
                  placeholder="Enter your project name "
                  {...field}
                />
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
                <Input
                  defaultValue={form.getValues("description")}
                  placeholder="Enter your project description"
                  {...field}
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
