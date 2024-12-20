import getTask from "@/actions/getTask";
import TaskForm from "./components/taskForm";

const SingleTaskPage = async ({ params }: { params: { taskId: string } }) => {
  const { taskId } = await params;
  const selectedTask = await getTask(taskId);
  return <TaskForm initialData={selectedTask} />;
};

export default SingleTaskPage;
