// Component to render list of sub-tasks and task items if available under a task

"use client";

import { SubTask, TaskItem as TaskItemType } from "@/app/lib/type-definitions";
import SubTaskItem from "./sub-task-item";
import TaskItemList from "../task-items/task-item-list";

interface SubTaskListProps {
  subTasks: SubTask[];
  userId: string;
  taskItems: TaskItemType[];
}

const SubTaskList = ({ subTasks, taskItems, userId }: SubTaskListProps) => {
  return (
    <ul className="mt-3 ml-4 space-y-3">
      {subTasks.map((subTask) => (
        <SubTaskItem key={subTask.id} subTask={subTask} userId={userId} />
      ))}
      {taskItems.length > 0 && (
        <TaskItemList taskItems={taskItems} userId={userId} />
      )}
    </ul>
  );
};

export default SubTaskList;
