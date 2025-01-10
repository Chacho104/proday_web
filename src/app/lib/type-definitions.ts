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

export interface User {
  userId: string;
  email: string;
}

export type SessionPayload = {
  authToken: string;
  expiresAt: Date;
};
