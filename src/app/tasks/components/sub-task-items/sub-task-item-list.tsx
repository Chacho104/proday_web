"use client";

import { SubTaskItem as SubTaskItemType } from "@/app/lib/type-definitions";
import SubTaskItem from "./sub-task-item";

interface SubTaskItemListProps {
  taskId: string;
  subTaskItems: SubTaskItemType[];
}

const SubTaskItemList = ({ taskId, subTaskItems }: SubTaskItemListProps) => {
  return (
    <ul className="mt-3 ml-4 space-y-3">
      {subTaskItems.map((item) => (
        <SubTaskItem key={item.id} subTaskItem={item} taskId={taskId} />
      ))}
    </ul>
  );
};

export default SubTaskItemList;
