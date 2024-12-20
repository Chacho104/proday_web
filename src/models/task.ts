// Definition of types
export interface Task {
  id: string;
  title: string;
  color: string;
  completed: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface TaskData {
  tasks: Task[];
  total: number;
  completed: number;
}
