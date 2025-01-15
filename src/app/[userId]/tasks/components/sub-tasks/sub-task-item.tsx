// Component to render a single sub-task item with actions to complete, edit, and delete the sub-task

"use client";

import { MouseEventHandler, useState } from "react";
import Link from "next/link";

import { BsThreeDotsVertical } from "react-icons/bs";
import { FaCheckCircle } from "react-icons/fa";
import {
  FaChevronDown,
  FaChevronUp,
  FaListCheck,
  FaRegCircle,
} from "react-icons/fa6";
import { HiOutlineTrash } from "react-icons/hi2";

import { SubTask } from "@/app/lib/type-definitions";
import MenuItem from "@/app/components/ui-elements/general/menu-item";
import TaskItemList from "../task-items/task-item-list";
import { useRouter } from "next/navigation";

interface SubTaskItemProps {
  subTask: SubTask;
  userId: string;
}

const SubTaskItem = ({ subTask, userId }: SubTaskItemProps) => {
  const router = useRouter();
  const [openSubTaskMenu, setOpenSubTaskMenu] = useState<boolean>(false);
  const [openSubTaskItems, setOpenSubTaskItems] = useState<boolean>(false);

  const toggleSubTaskMenuItems: MouseEventHandler<HTMLDivElement> = (event) => {
    event.preventDefault();
    event.stopPropagation();
    setOpenSubTaskMenu((value) => !value);
  };

  const toggleSubTaskItems: MouseEventHandler<SVGElement> = (event) => {
    event.preventDefault();
    event.stopPropagation();
    setOpenSubTaskItems((value) => !value);
  };
  return (
    <li className="relative">
      <Link
        href={`/${userId}/tasks/${subTask.taskId}/sub-tasks/${subTask.id}`}
        className={`w-full rounded-md bg-text-field-bg p-3 flex items-center justify-start cursor-pointer gap-x-2 hover:shadow-2xl transition ${
          subTask.completed ? "hover:cursor-not-allowed" : ""
        }`}
      >
        {!subTask.completed && subTask.taskItems.length === 0 && (
          <FaRegCircle
            size={18}
            className="text-black cursor-pointer hover:scale-110 min-w-6"
            onClick={() => {}}
          />
        )}
        {!subTask.completed && subTask.taskItems.length > 0 && (
          <>
            {openSubTaskItems ? (
              <FaChevronUp size={18} onClick={toggleSubTaskItems} />
            ) : (
              <FaChevronDown size={18} onClick={toggleSubTaskItems} />
            )}
          </>
        )}
        {subTask.completed && (
          <FaCheckCircle
            size={18}
            className="text-complete-task cursor-pointer hover:scale-110 min-w-6"
            onClick={() => {}}
          />
        )}
        <p
          className={`font-normal text-sm ${
            subTask.completed ? "line-through text-text-gray" : "text-black"
          }`}
        >
          {subTask.title}
        </p>
        <div className="ml-auto" onClick={toggleSubTaskMenuItems}>
          <BsThreeDotsVertical size={18} />
        </div>
      </Link>
      {openSubTaskMenu && (
        <div
          onMouseLeave={toggleSubTaskMenuItems}
          className="absolute right-0 w-[228px] z-[3000] overflow-hidden bg-cards-background text-sm shadow-lg rounded-md"
        >
          <div
            onClick={toggleSubTaskMenuItems}
            className="flex cursor-pointer flex-col py-1"
          >
            <MenuItem
              onClick={() =>
                router.push(
                  `/${userId}/tasks/${subTask.taskId}/sub-tasks/${subTask.id}/task-items/new`
                )
              } // Push to page to add a checklist item to this task
              label="Add checklist items"
              icon={FaListCheck}
            />
            <MenuItem
              onClick={() => {}}
              label="Delete sub-task"
              icon={HiOutlineTrash}
            />
          </div>
        </div>
      )}
      {openSubTaskItems && (
        <TaskItemList
          taskItems={subTask.taskItems}
          userId={userId}
          taskId={subTask.taskId}
        />
      )}
    </li>
  );
};

export default SubTaskItem;
