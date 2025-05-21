// Component to render list of sub-tasks and task items if available under a task

"use client";

import { SubTask } from "@/app/lib/type-definitions";
import SubTaskItem from "./sub-task-item";

interface SubTaskListProps {
  subTasks: SubTask[];
}

const SubTaskList = ({ subTasks }: SubTaskListProps) => {
  return (
    <ul className="mt-3 ml-4 space-y-3">
      {subTasks.map((subTask) => (
        <SubTaskItem key={subTask.id} subTask={subTask} />
      ))}
    </ul>
  );
};

export default SubTaskList;
