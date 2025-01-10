export interface Project<T = object> {
  id: string;
  title: string;
  description: string;
  tasks: Array<T>;
  createdAt: string;
}
