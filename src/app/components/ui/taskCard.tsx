"use client";
import { Task } from "@/models/task";
import TaskCardItem from "./taskCardItem";

interface TaskCardProps {
  tasks: Task[];
}
const TaskCard: React.FC<TaskCardProps> = ({ tasks }) => {
  return (
    <div className="space-y-4">
      {tasks.map((task) => (
        <TaskCardItem key={task.id} task={task} />
      ))}
    </div>
  );
};

export default TaskCard;
