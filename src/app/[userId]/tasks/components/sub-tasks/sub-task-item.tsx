// Component to render a single sub-task item with actions to complete, edit, and delete the sub-task

"use client";

import { MouseEventHandler, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import toast from "react-hot-toast";

import { BsThreeDotsVertical } from "react-icons/bs";
import {
  FaChevronDown,
  FaChevronUp,
  FaListCheck,
  FaRegSquare,
  FaSquareCheck,
} from "react-icons/fa6";
import { HiOutlineTrash } from "react-icons/hi2";

import { SubTask } from "@/app/lib/type-definitions";
import MenuItem from "@/app/components/ui-elements/general/menu-item";
import TaskItemList from "../sub-task-items/sub-task-item-list";
import { toggleSubTaskCompletion } from "@/app/actions/sub-tasks";

interface SubTaskItemProps {
  token: any;
  subTask: SubTask;
  userId: string;
}

const SubTaskItem = ({ token, subTask, userId }: SubTaskItemProps) => {
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

  // onClick event handler: triggers the action that sets task completion status to true
  const onComplete: MouseEventHandler<SVGElement> = async (event) => {
    event.preventDefault();
    event.stopPropagation();
    try {
      const response = await toggleSubTaskCompletion(
        token,
        subTask.taskId,
        subTask.id,
        subTask.title,
        true
      );
      router.refresh();
      toast.success(`${response}`);
    } catch (error) {
      toast.error("Could not update sub-task status. Try again!.");
    } finally {
    }
  };

  // onClick event handler: triggers the action that sets task completion status to false
  const onInComplete: MouseEventHandler<SVGElement> = async (event) => {
    event.preventDefault();
    event.stopPropagation();
    try {
      const response = await toggleSubTaskCompletion(
        token,
        subTask.taskId,
        subTask.id,
        subTask.title,
        false
      );
      router.refresh();
      toast.success(`${response}`);
    } catch (error) {
      toast.error("Could not update sub-task status. Try again!.");
    } finally {
    }
  };

  return (
    <li className="relative">
      <Link
        href={`/${userId}/tasks/${subTask.taskId}/sub-tasks/${subTask.id}`}
        className={`w-full rounded-md bg-text-field-bg p-3 flex items-center justify-start cursor-pointer gap-x-2 hover:shadow-2xl transition ${
          subTask.completed ? "pointer-events-none cursor-not-allowed" : ""
        }`}
      >
        {!subTask.completed && subTask.subTaskItems.length === 0 && (
          <FaRegSquare
            size={18}
            className="text-black cursor-pointer hover:scale-110 min-w-6"
            onClick={onComplete}
          />
        )}
        {subTask.subTaskItems.length > 0 && (
          <div className="pointer-events-auto cursor-pointer">
            {openSubTaskItems ? (
              <FaChevronUp size={18} onClick={toggleSubTaskItems} />
            ) : (
              <FaChevronDown size={18} onClick={toggleSubTaskItems} />
            )}
          </div>
        )}
        {subTask.completed && subTask.subTaskItems.length === 0 && (
          <FaSquareCheck
            size={18}
            className="text-completed-task cursor-pointer pointer-events-auto hover:scale-110 min-w-6"
            onClick={onInComplete}
          />
        )}
        <p
          className={`font-normal text-sm ${
            subTask.completed ? "line-through text-text-gray" : "text-black"
          }`}
        >
          {subTask.title}
        </p>
        {!subTask.completed && (
          <div className="ml-auto" onClick={toggleSubTaskMenuItems}>
            <BsThreeDotsVertical size={18} />
          </div>
        )}
        {subTask.completed && (
          <HiOutlineTrash
            size={20}
            className="text-delete-btn hover:scale-110 cursor-pointer min-w-6 ml-auto"
            onClick={() => {}}
          />
        )}
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
                  `/${userId}/tasks/${subTask.taskId}/sub-tasks/${subTask.id}/sub-task-items/new`
                )
              } // Push to page to add a checklist item to this task
              label="Add sub-task items"
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
          subTaskItems={subTask.subTaskItems}
          userId={userId}
          taskId={subTask.taskId}
          token={token}
        />
      )}
    </li>
  );
};

export default SubTaskItem;
