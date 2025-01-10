export enum StatusEnum {
  todo = "todo",
  onProgress = "on progress",
  inReview = "in review",
  completed = "completed",
}

export interface User {
  id: string;
  name: string;
  email: string;
}

export interface Task {
  id: string;
  title: string;
  description: string;
  status: StatusEnum;
  tag: string;
  due_date: string;
  users: User[] | null;
}
