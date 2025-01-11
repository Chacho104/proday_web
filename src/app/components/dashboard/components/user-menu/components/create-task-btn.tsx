// Button to create tasks
// Onclick should be able to open the create a task modal where the user can create a task

import { FaPlus } from "react-icons/fa6";

const CreateTaskButton = () => {
  return (
    <button
      type="button"
      className="flex items-center justify-between bg-warm-yellow rounded-md gap-x-2 py-2 px-4 hover:scale-105 hover:opacity-80 transition"
    >
      <FaPlus />
      <span className="text-sm">New Task</span>
    </button>
  );
};

export default CreateTaskButton;
