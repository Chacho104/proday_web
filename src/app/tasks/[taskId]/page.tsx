import { getTaskDetails } from "@/app/actions/tasks";
import TaskForm from "./components/task-form";

const SingleTaskPage = async ({
  params,
}: {
  params: Promise<{ taskId: string }>;
}) => {
  const { taskId } = await params;

  let initialData;

  // Only send a request for initial data if the taskId is an actual id
  if (taskId !== "new") {
    initialData = await getTaskDetails(taskId);
  }

  return <TaskForm initialData={initialData} />;
};

export default SingleTaskPage;
