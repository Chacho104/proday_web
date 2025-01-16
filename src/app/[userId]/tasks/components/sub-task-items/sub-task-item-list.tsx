"use client";

import { SubTaskItem as SubTaskItemType } from "@/app/lib/type-definitions";
import SubTaskItem from "./sub-task-item";

interface SubTaskItemListProps {
  taskId: string;
  subTaskItems: SubTaskItemType[];
  userId: string;
  token: string;
}

const SubTaskItemList = ({
  taskId,
  subTaskItems,
  userId,
  token,
}: SubTaskItemListProps) => {
  return (
    <ul className="mt-3 ml-4 space-y-3">
      {subTaskItems.map((item) => (
        <SubTaskItem
          key={item.id}
          subTaskItem={item}
          userId={userId}
          taskId={taskId}
          token={token}
        />
      ))}
    </ul>
  );
};

export default SubTaskItemList;
