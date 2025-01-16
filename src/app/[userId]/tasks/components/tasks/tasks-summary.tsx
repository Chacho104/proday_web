// Component that tracks completed vs. non-completed tasks

import Card from "@/app/components/ui-elements/general/card";
import { IconType } from "react-icons";

interface TasksSummaryProps {
  icon: IconType;
  label: string;
  count: number;
}

const TasksSummary = ({ icon: Icon, label, count }: TasksSummaryProps) => {
  return (
    <Card className="flex items-start justify-start gap-x-4 w-full font-mono">
      <Icon
        size={30}
        className={`border h-10 sm:h-14 w-10 sm:w-14 p-2 border-border-color rounded-md ${
          label === "Completed" ? "text-completed-task" : "text-warm-yellow"
        }`}
      />
      <div>
        <h3 className="text-white">
          {count === 1 ? `${count} Task` : `${count} Tasks`}
        </h3>
        <p
          className={
            label === "Completed"
              ? "text-completed-task text-sm"
              : "text-warm-yellow text-sm"
          }
        >
          {label}
        </p>
      </div>
    </Card>
  );
};

export default TasksSummary;
