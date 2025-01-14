import { getTaskDetails } from "@/app/lib/dal";
import TaskForm from "./components/task-form";

const SingleTaskPage = async ({
  params,
}: {
  params: Promise<{ taskId: string }>;
}) => {
  const { taskId } = await params;
  const task = await getTaskDetails(taskId);
  return (
    <div>
      <TaskForm initialData={task} />
    </div>
  );
};

export default SingleTaskPage;
