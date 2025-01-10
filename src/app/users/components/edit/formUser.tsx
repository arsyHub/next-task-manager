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
  name: z.string().min(5),
  email: z.string().min(5),
});

type FormValues = z.infer<typeof formSchema>;

interface Props {
  onClose: () => void;
  id: string;
}

export function FormUser({ onClose, id }: Props) {
  const [isLoading, setIsLoading] = React.useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
    },
  });

  React.useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await api.get(`/users/${id}`);
        form.setValue("name", response.data.data.name);
        form.setValue("email", response.data.data.email);
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };
    fetchUser();
  }, [id, form]);

  const onSubmit = async (data: FormValues) => {
    try {
      setIsLoading(true);
      await api.put(`/users/${id}`, data);
      toast.success("User edited successfully");
      onClose();
    } catch (error) {
      toast.error(`Failed to edit User: ${error}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input
                  defaultValue={form.getValues("name")}
                  placeholder="Enter name "
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  defaultValue={form.getValues("email")}
                  placeholder="Enter email"
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
