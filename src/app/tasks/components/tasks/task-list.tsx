// Component to render a list of tasks

"use client";

import { useRouter } from "next/navigation";

import { Task } from "@/app/lib/type-definitions";
import Card from "../../../components/ui-elements/general/card";
import CreateTaskButton from "@/app/components/ui-elements/general/create-task-btn";
import TaskItem from "./task-item";

interface TaskListProps {
  tasks: Task[];
}
const TaskList = ({ tasks }: TaskListProps) => {
  const router = useRouter();
  return (
    <Card>
      <div className="flex w-full items-center justify-between">
        <h2 className="text-white text-lg py-2 font-mono">Today&#39;s Tasks</h2>
        <CreateTaskButton
          label="Task"
          onClick={() => router.push(`/tasks/new`)}
        />
      </div>
      <div className="pb-4 pt-2 sm:pt-0">
        <p className="text-sm text-warm-yellow font-mono">
          Complete your to-do list for the day!
        </p>
      </div>
      <ul className="space-y-4">
        {tasks.map((task) => (
          <TaskItem key={task.id} task={task} />
        ))}
      </ul>
    </Card>
  );
};

export default TaskList;
