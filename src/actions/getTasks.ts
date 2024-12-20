import { TaskData } from "@/models/task";
import qs from "query-string";

const URL = `${process.env.NEXT_PUBLIC_TASK_API_URL}`;

interface Query {
  page: number;
  pageSize: number;
}

const getTasks = async (query: Query): Promise<TaskData> => {
  const url = qs.stringifyUrl({
    url: URL,
    query: {
      page: query.page,
      pageSize: query.pageSize,
    },
  });
  const res = await fetch(url);

  if (res.status !== 200) {
    throw new Error(`Failed to fetch tasks: ${res.statusText}`);
  }

  return res.json();
};

export default getTasks;
