// Single sub-task page for creating or updating a sub-task
// Extract task id from the params
// Use task id to either get initial data (a subTask whose parent id is same as task id) or
// Create a new subTask with the task id as parent id

import { getSubTaskDetails } from "@/app/lib/dal";
import SubTaskForm from "./components/sub-task-form";

const SingleSubTaskPage = async ({
  params,
}: {
  params: Promise<{ taskId: string; subTaskId: string }>;
}) => {
  const { taskId, subTaskId } = await params;

  let initialData;

  // Only send a request for initial data if the subTaskId is an actual id
  if (subTaskId !== "new") {
    initialData = await getSubTaskDetails(taskId, subTaskId);
  }

  return <SubTaskForm taskId={taskId} initialData={initialData} />;
};

export default SingleSubTaskPage;
