import { TaskItem as TaskItemType } from "@/app/lib/type-definitions";
import TaskItem from "./task-item";

interface TaskItemListProps {
  taskId: string;
  taskItems: TaskItemType[];
  userId: string;
}

const TaskItemList = ({ taskId, taskItems, userId }: TaskItemListProps) => {
  return (
    <ul className="mt-3 ml-4 space-y-3">
      {taskItems.map((item) => (
        <TaskItem
          key={item.id}
          taskItem={item}
          userId={userId}
          taskId={taskId}
        />
      ))}
    </ul>
  );
};

export default TaskItemList;
