import { Task } from "@/models/task";

const URL = `${process.env.NEXT_PUBLIC_TASK_API_URL}`;

const getTask = async (id: string): Promise<Task> => {
  const res = await fetch(`${URL}/${id}`);

  if (res.status !== 200) {
    throw new Error(`Failed to fetch task: ${res.statusText}`);
  }

  const data = await res.json();

  return data.data; // Extract and return the array
};

export default getTask;
