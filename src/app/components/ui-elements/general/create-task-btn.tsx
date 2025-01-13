// Button to create tasks
// Onclick should be able to open the create a task modal where the user can create a task

import { cn } from "@/app/lib/util";
import { FaPlus } from "react-icons/fa6";

interface CreateTaskButtonProps {
  className?: string;
  label: string;
}

const CreateTaskButton = ({ className, label }: CreateTaskButtonProps) => {
  return (
    <button
      type="button"
      className={cn(
        "flex items-center justify-center bg-warm-yellow rounded-md gap-x-1 py-2 px-4 hover:scale-105 hover:opacity-80 transition",
        className
      )}
    >
      <FaPlus size={14} />
      <span className="text-sm">{label}</span>
    </button>
  );
};

export default CreateTaskButton;
