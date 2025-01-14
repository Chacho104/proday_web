import { TaskItem as TaskItemType } from "@/app/lib/type-definitions";
import TaskItem from "./task-item";

interface TaskItemListProps {
  taskItems: TaskItemType[];
  userId: string;
}

const TaskItemList = ({ taskItems, userId }: TaskItemListProps) => {
  return (
    <ul className="mt-3 ml-4 space-y-3">
      {taskItems.map((item) => (
        <TaskItem key={item.id} taskItem={item} userId={userId} />
      ))}
    </ul>
  );
};

export default TaskItemList;
