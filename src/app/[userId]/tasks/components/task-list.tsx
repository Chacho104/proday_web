"use client";
import { Task } from "@/app/lib/type-definitions";
import TaskCardItem from "./task-item";
import Card from "../../../components/ui-elements/general/card";
import CreateTaskButton from "@/app/components/ui-elements/general/create-task-btn";

interface TaskListProps {
  tasks: Task[];
  userId: string;
}
const TaskList = ({ tasks, userId }: TaskListProps) => {
  return (
    <Card className="p-4 mt-6">
      <div className="flex w-full items-center justify-between">
        <h2 className="text-white text-lg py-2">Today&#39;s Tasks</h2>
        <CreateTaskButton label="Task" />
      </div>
      <div className="pb-4 pt-2 sm:pt-0">
        <p className="text-sm text-warm-yellow">
          Complete your to-do list for the day!
        </p>
      </div>
      <ul className="space-y-4">
        {tasks.map((task) => (
          <TaskCardItem key={task.id} task={task} userId={userId} />
        ))}
      </ul>
    </Card>
  );
};

export default TaskList;
