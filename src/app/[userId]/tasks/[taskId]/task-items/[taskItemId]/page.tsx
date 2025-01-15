// Single task item page for a task item under a task

import { getTaskItemDetails } from "@/app/lib/dal";
import TaskItemForm from "./components/task-item-form";

const SingleTaskItemPage = async ({
  params,
}: {
  params: Promise<{ taskId: string; taskItemId: string }>;
}) => {
  const { taskId, taskItemId } = await params;

  let initialData;

  // Only send a request for initial data if the taskItemId is an actual id
  if (taskItemId !== "new") {
    initialData = await getTaskItemDetails(taskId, taskItemId);
  }

  return <TaskItemForm initialData={initialData} parentId={taskId} />;
};

export default SingleTaskItemPage;
