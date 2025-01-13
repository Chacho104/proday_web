// A component to render different badges on task items
// Accepts a label and a className prop to further customize appearance

import { cn } from "@/app/lib/util";

interface TaskBadgeProps {
  label: string;
  className?: string;
}

const TaskBadge = ({ label, className }: TaskBadgeProps) => {
  return (
    <div className={cn("text-[10px] text-white py-1 px-2 rounded-full", className)}>
      <span>{label}</span>
    </div>
  );
};

export default TaskBadge;
