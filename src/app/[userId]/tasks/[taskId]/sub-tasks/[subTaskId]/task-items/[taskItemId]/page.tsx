// Single item page for an item under a sub-task

import { getTaskItemDetails } from "@/app/lib/dal";
import SubTaskItemForm from "./components/sub-task-item-form";

const SingleSubTaskItemPage = async ({
  params,
}: {
  params: Promise<{ taskId: string; subTaskId: string; taskItemId: string }>;
}) => {
  const { taskId, subTaskId, taskItemId } = await params;

  let initialData;

  // Only send a request for initial data if the taskItemId is an actual id
  if (taskItemId !== "new") {
    initialData = await getTaskItemDetails(subTaskId, taskItemId);
  }
  return <SubTaskItemForm initialData={initialData} parentId={subTaskId} />;
};

export default SingleSubTaskItemPage;
