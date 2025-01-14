"use client";

import Link from "next/link";

import { FaCheckCircle } from "react-icons/fa";
import { FaRegCircle } from "react-icons/fa6";
import { HiOutlineTrash } from "react-icons/hi2";

import { TaskItem as TaskItemType } from "@/app/lib/type-definitions";

interface TaskItemProps {
  taskItem: TaskItemType;
  userId: string;
}

const TaskItem = ({ taskItem, userId }: TaskItemProps) => {
  return (
    <li className="relative">
      <Link
        href={"/"}
        className={`w-full rounded-md bg-text-field-bg p-2 flex items-center justify-start cursor-pointer gap-x-2 hover:shadow-2xl transition ${
          taskItem.completed ? "hover:cursor-not-allowed" : ""
        }`}
      >
        {!taskItem.completed && (
          <FaRegCircle
            size={18}
            className="text-black cursor-pointer hover:scale-110 min-w-6"
            onClick={() => {}}
          />
        )}
        {taskItem.completed && (
          <FaCheckCircle
            size={18}
            className="text-complete-task cursor-pointer hover:scale-110 min-w-6"
            onClick={() => {}}
          />
        )}
        <p
          className={`font-normal text-xs ${
            taskItem.completed ? "line-through text-text-gray" : "text-black"
          }`}
        >
          {taskItem.title}
        </p>
        <HiOutlineTrash
          size={20}
          className="text-delete-btn hover:scale-110 cursor-pointer min-w-6 ml-auto"
          onClick={() => {}}
        />
      </Link>
    </li>
  );
};

export default TaskItem;
