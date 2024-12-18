import TaskForm from "./components/taskForm";

const SingleTaskPage = async ({ params }: { params: { taskId: string } }) => {
  // Fetch task based on passed in id and pass it down to the form
  return <TaskForm />;
};

export default SingleTaskPage;
