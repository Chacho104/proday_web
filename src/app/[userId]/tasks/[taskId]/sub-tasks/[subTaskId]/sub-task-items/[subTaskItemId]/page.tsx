// Single item page for an item under a sub-task

import { getTaskItemDetails, verifyUserSession } from "@/app/lib/dal";
import SubTaskItemForm from "./components/sub-task-item-form";

const SingleSubTaskItemPage = async ({
  params,
}: {
  params: Promise<{
    userId: string;
    taskId: string;
    subTaskId: string;
    subTaskItemId: string;
  }>;
}) => {
  const { userId, taskId, subTaskId, subTaskItemId } = await params;

  const authToken = await verifyUserSession();

  let initialData;

  // Only send a request for initial data if the taskItemId is an actual id
  if (subTaskItemId !== "new") {
    initialData = await getTaskItemDetails(subTaskId, subTaskItemId);
  }
  return (
    <SubTaskItemForm
      userId={userId}
      initialData={initialData}
      subTaskId={subTaskId}
      token={authToken}
    />
  );
};

export default SingleSubTaskItemPage;
