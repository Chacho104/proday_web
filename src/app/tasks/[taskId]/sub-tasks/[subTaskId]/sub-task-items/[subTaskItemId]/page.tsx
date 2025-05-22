// Single item page for an item under a sub-task

import { getTaskItemDetails } from "@/app/actions/sub-task-items";
import SubTaskItemForm from "./components/sub-task-item-form";

const SingleSubTaskItemPage = async ({
  params,
}: {
  params: Promise<{
    subTaskId: string;
    subTaskItemId: string;
  }>;
}) => {
  const { subTaskId, subTaskItemId } = await params;

  let initialData;

  // Only send a request for initial data if the taskItemId is an actual id
  if (subTaskItemId !== "new") {
    initialData = await getTaskItemDetails(subTaskId, subTaskItemId);
  }
  return <SubTaskItemForm initialData={initialData} subTaskId={subTaskId} />;
};

export default SingleSubTaskItemPage;
