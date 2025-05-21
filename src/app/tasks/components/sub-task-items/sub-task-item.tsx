"use client";

import { MouseEventHandler } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { useModal } from "@/app/providers/modalProvider";

import toast from "react-hot-toast";

import { FaRegSquare, FaSquareCheck } from "react-icons/fa6";
import { HiOutlineTrash } from "react-icons/hi2";

import { SubTaskItem as SubTaskItemType } from "@/app/lib/type-definitions";
import { toggleSubTaskItemCompletion } from "@/app/actions/sub-task-items";

interface SubTaskItemProps {
  taskId: string;
  subTaskItem: SubTaskItemType;
}

const SubTaskItem = ({ taskId, subTaskItem }: SubTaskItemProps) => {
  const router = useRouter();

  const { openModal } = useModal();

  // onClick event handler: triggers the action that sets task completion status to true
  const onComplete: MouseEventHandler<SVGElement> = async (event) => {
    event.preventDefault();
    event.stopPropagation();

    const response: string = await toggleSubTaskItemCompletion(
      subTaskItem.subTaskId,
      subTaskItem.id,
      subTaskItem.title,
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

    const response: string = await toggleSubTaskItemCompletion(
      subTaskItem.subTaskId,
      subTaskItem.id,
      subTaskItem.title,
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
    subTaskId: subTaskItem.subTaskId,
    subTaskItemId: subTaskItem.id,
  };

  return (
    <li className="relative">
      <Link
        href={`/tasks/${taskId}/sub-tasks/${subTaskItem.subTaskId}/sub-task-items/${subTaskItem.id}`}
        className={`w-full rounded-md bg-text-field-bg p-2 flex items-center justify-start cursor-pointer gap-x-2 hover:shadow-2xl transition ${
          subTaskItem.completed ? "pointer-events-none cursor-not-allowed" : ""
        }`}
      >
        {!subTaskItem.completed && (
          <FaRegSquare
            size={18}
            className="text-black cursor-pointer hover:scale-110 min-w-6"
            onClick={onComplete}
          />
        )}
        {subTaskItem.completed && (
          <FaSquareCheck
            size={18}
            className="text-completed-task cursor-pointer pointer-events-auto hover:scale-110 min-w-6"
            onClick={onInComplete}
          />
        )}
        <p
          className={`font-normal text-xs ${
            subTaskItem.completed ? "line-through text-text-gray" : "text-black"
          }`}
        >
          {subTaskItem.title}
        </p>
        {!subTaskItem.completed && (
          <HiOutlineTrash
            size={20}
            className="text-delete-btn hover:scale-110 cursor-pointer min-w-6 ml-auto"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              openModal(modalData);
            }}
          />
        )}
      </Link>
    </li>
  );
};

export default SubTaskItem;
