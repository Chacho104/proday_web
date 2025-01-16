// Component to render list of sub-tasks and task items if available under a task

"use client";

import { SubTask } from "@/app/lib/type-definitions";
import SubTaskItem from "./sub-task-item";

interface SubTaskListProps {
  token: any;
  subTasks: SubTask[];
  userId: string;
}

const SubTaskList = ({ token, subTasks, userId }: SubTaskListProps) => {
  return (
    <ul className="mt-3 ml-4 space-y-3">
      {subTasks.map((subTask) => (
        <SubTaskItem
          key={subTask.id}
          subTask={subTask}
          userId={userId}
          token={token}
        />
      ))}
    </ul>
  );
};

export default SubTaskList;
