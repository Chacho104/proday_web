// Component to render a single sub-task item with actions to complete, edit, and delete the sub-task

"use client";

import { MouseEventHandler, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import toast from "react-hot-toast";

import { useModal } from "@/app/providers/modalProvider";

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
import TaskBadge from "../tasks/task-badge";

interface SubTaskItemProps {
  subTask: SubTask;
}

const SubTaskItem = ({ subTask }: SubTaskItemProps) => {
  const router = useRouter();
  const [openSubTaskMenu, setOpenSubTaskMenu] = useState<boolean>(false);
  const [openSubTaskItems, setOpenSubTaskItems] = useState<boolean>(false);

  const { openModal } = useModal();

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

    const response: string = await toggleSubTaskCompletion(
      subTask.taskId,
      subTask.id,
      subTask.title,
      true
    );

    if (response.includes("Success")) {
      toast.success(response);
      router.refresh();
    } else {
      toast.error(response);
    }
  };

  // onClick event handler: triggers the action that sets task completion status to false
  const onInComplete: MouseEventHandler<SVGElement> = async (event) => {
    event.preventDefault();
    event.stopPropagation();
    const response: string = await toggleSubTaskCompletion(
      subTask.taskId,
      subTask.id,
      subTask.title,
      false
    );

    if (response.includes("Success")) {
      toast.success(response);
      router.refresh();
    } else {
      toast.error(response);
    }
  };

  const modalData = {
    taskId: subTask.taskId,
    subTaskId: subTask.id,
  };

  return (
    <li className="relative">
      <Link
        href={`/tasks/${subTask.taskId}/sub-tasks/${subTask.id}`}
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
        {subTask.completed && (
          <TaskBadge label="Completed" className="bg-type-badge text-white" />
        )}
        {!subTask.completed && (
          <div className="ml-auto" onClick={toggleSubTaskMenuItems}>
            <BsThreeDotsVertical size={18} />
          </div>
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
                  `/tasks/${subTask.taskId}/sub-tasks/${subTask.id}/sub-task-items/new`
                )
              } // Push to page to add a checklist item to this task
              label="Add sub-task items"
              icon={FaListCheck}
            />
            <MenuItem
              onClick={() => openModal(modalData)}
              label="Delete sub-task"
              icon={HiOutlineTrash}
            />
          </div>
        </div>
      )}
      {openSubTaskItems && (
        <TaskItemList
          subTaskItems={subTask.subTaskItems}
          taskId={subTask.taskId}
        />
      )}
    </li>
  );
};

export default SubTaskItem;
