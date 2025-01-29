export interface Task {
  id: string;
  title: string;
  description: string;
  createdAt: string;
}

export type Column = {
  id: string;
  title: string;
  tasks: Task[];
}

export type Columns = {
  [key: string]: Column;
}