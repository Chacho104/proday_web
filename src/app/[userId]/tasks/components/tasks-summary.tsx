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
    <Card className="flex items-start justify-start p-4 gap-x-4 w-full">
      <Icon
        size={30}
        className="text-warm-yellow border h-10 sm:h-14 w-10 sm:w-14 p-2 border-border-color rounded-md"
      />
      <div className="text-sm">
        <h3 className="text-white">{`${count} Tasks`}</h3>
        <p className="text-text-gray">{label}</p>
      </div>
    </Card>
  );
};

export default TasksSummary;
