// Definition of types
export interface Task {
  id: string;
  title: string;
  urgency: string;
  importance: string;
  type: string;
  dueDate: string;
  completed: boolean;
  createdAt: string;
  updatedAt: string;
  subTasks: SubTask[];
  taskItems: TaskItem[];
}

export interface SubTask {
  id: string;
  title: string;
  completed: boolean;
  createdAt: string;
  updatedAt: string;
  taskItems: TaskItem[];
}

export interface TaskItem {
  id: string;
  title: string;
  completed: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface TaskData {
  tasks: Task[];
  total: number;
  completed: number;
}

export interface User {
  userId: string;
  email: string;
}

export type SessionPayload = {
  authToken: string;
  expiresAt: Date;
};
