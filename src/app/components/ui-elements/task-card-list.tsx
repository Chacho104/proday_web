"use client";
import { Task } from "@/app/lib/type-definitions";
import TaskCardItem from "./task-card-item";

interface TaskCardListProps {
  tasks: Task[];
}
const TaskCardList: React.FC<TaskCardListProps> = ({ tasks }) => {
  return (
    <div className="space-y-4">
      {tasks.map((task) => (
        <TaskCardItem key={task.id} task={task} />
      ))}
    </div>
  );
};

export default TaskCardList;
