"use client";

import { useRouter } from "next/navigation";
import { FaRegCircle, FaRegCheckCircle } from "react-icons/fa";
import { HiOutlineTrash } from "react-icons/hi";

// To receive props (task details) and render them to the screen
const TaskCard = () => {
  const router = useRouter();
  return (
    <div
      className="w-[90%] lg:w-[736px] border-[1px] border-badge-gray rounded-lg bg-task-card-bg p-4 flex items-center justify-between cursor-pointer gap-x-2"
      onClick={() => router.push("/tasks/taskId")}
    >
      <FaRegCircle
        size={18}
        className="text-light-blue cursor-pointer hover:text-dark-blue min-w-6"
      />
      <p className="font-normal text-sm text-button-text">
        Integer urna interdum massa libero auctor neque turpis turpis semper.
        Duis vel sed fames integer.
      </p>
      <HiOutlineTrash
        size={22}
        className="text-text-gray hover:bg-badge-gray cursor-pointer hover:border rounded-lg hover:border-transparent hover:text-red-500 min-w-6"
      />
    </div>
  );
};

export default TaskCard;
