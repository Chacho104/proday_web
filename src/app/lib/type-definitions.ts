// Definition of types
export interface Task {
  id: string;
  title: string;
  urgency: string;
  importance: string;
  type: string;
  dueDate?: string;
  completed: boolean;
  createdAt: string;
  updatedAt: string;
  subTasks: SubTask[];
}

export interface SubTask {
  id: string;
  taskId: string;
  title: string;
  completed: boolean;
  createdAt: string;
  updatedAt: string;
  subTaskItems: SubTaskItem[];
}

export interface SubTaskItem {
  id: string;
  subTaskId: string;
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
