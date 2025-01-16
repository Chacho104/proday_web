import { getTaskDetails, verifyUserSession } from "@/app/lib/dal";
import TaskForm from "./components/task-form";

const SingleTaskPage = async ({
  params,
}: {
  params: Promise<{ userId: string; taskId: string }>;
}) => {
  // Get authToken from user session to be used to send create/update requests to API
  const authToken = await verifyUserSession();

  const { userId, taskId } = await params;

  let initialData;

  // Only send a request for initial data if the taskId is an actual id
  if (taskId !== "new") {
    initialData = await getTaskDetails(taskId);
  }

  return (
    <TaskForm userId={userId} initialData={initialData} token={authToken} />
  );
};

export default SingleTaskPage;
