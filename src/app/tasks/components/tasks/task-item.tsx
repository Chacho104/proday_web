// Component to render a single task item with actions to complete, edit, and delete the item

"use client";

import { MouseEventHandler, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import toast from "react-hot-toast";

import { BsClipboardPlus, BsThreeDotsVertical } from "react-icons/bs";
import { HiOutlineTrash } from "react-icons/hi";
import {
  FaChevronDown,
  FaChevronUp,
  FaRegSquare,
  FaSquareCheck,
} from "react-icons/fa6";

import { useModal } from "@/app/providers/modalProvider";
import { Task } from "@/app/lib/type-definitions";
import TaskBadge from "./task-badge";
import MenuItem from "@/app/components/ui-elements/general/menu-item";

import SubTaskList from "../sub-tasks/sub-task-list";
import { toggleTaskCompletion } from "@/app/actions/tasks";

interface TaskItemProps {
  task: Task;
}

const TaskItem = ({ task }: TaskItemProps) => {
  const router = useRouter();

  const { openModal } = useModal();

  const [openTaskMenu, setOpenTaskMenu] = useState<boolean>(false);
  const [openSubTaskMenu, setOpenSubTaskMenu] = useState<boolean>(false);

  const toggleTaskMenuItems: MouseEventHandler<HTMLDivElement> = (event) => {
    event.preventDefault();
    event.stopPropagation();
    setOpenTaskMenu((value) => !value);
  };

  const toggleSubTaskMenuItems: MouseEventHandler<SVGElement> = (event) => {
    event.preventDefault();
    event.stopPropagation();
    setOpenSubTaskMenu((value) => !value);
  };

  const modalData = {
    taskId: task.id,
  };

  // onClick event handler: triggers the action that sets task completion status to true
  const onComplete: MouseEventHandler<SVGElement> = async (event) => {
    event.preventDefault();
    event.stopPropagation();
    const response: string = await toggleTaskCompletion(
      task.id,
      task.title,
      task.type,
      task.urgency,
      task.importance,
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

    const response: string = await toggleTaskCompletion(
      task.id,
      task.title,
      task.type,
      task.urgency,
      task.importance,
      false
    );

    if (response.includes("Success")) {
      toast.success(response);
      router.refresh();
    } else {
      toast.error(response);
    }
  };

  return (
    <li className="relative">
      <Link
        className={`w-full rounded-md bg-text-field-bg p-4 flex items-center justify-start cursor-pointer gap-x-2 hover:shadow-2xl transition ${
          task.completed ? "pointer-events-none cursor-not-allowed" : ""
        }`}
        href={`/tasks/${task.id}`}
      >
        {!task.completed && task.subTasks.length === 0 && (
          <FaRegSquare
            size={18}
            className="text-black cursor-pointer hover:scale-110 min-w-6"
            onClick={onComplete}
          />
        )}
        {task.subTasks.length > 0 && (
          <div className="pointer-events-auto cursor-pointer">
            {openSubTaskMenu ? (
              <FaChevronUp size={18} onClick={toggleSubTaskMenuItems} />
            ) : (
              <FaChevronDown size={18} onClick={toggleSubTaskMenuItems} />
            )}
          </div>
        )}
        {task.completed && task.subTasks.length === 0 && (
          <FaSquareCheck
            size={18}
            className="text-completed-task cursor-pointer hover:scale-110 min-w-6 pointer-events-auto"
            onClick={onInComplete}
          />
        )}
        <div className="flex items-center justify-start gap-x-4 flex-wrap gap-y-2">
          <p
            className={`font-normal text-base ${
              task.completed ? "line-through text-text-gray" : "text-black"
            }`}
          >
            {task.title}
          </p>
          {/* Badges */}
          {!task.completed && (
            <>
              <TaskBadge label={task.type} className="bg-type-badge" />
              <TaskBadge
                label={task.importance}
                className="bg-importance-badge"
              />
              <TaskBadge label={task.urgency} className="bg-urgency-badge" />
              {task.dueDate && (
                <TaskBadge label={task.dueDate} className="bg-deadline-badge" />
              )}
            </>
          )}
          {task.completed && (
            <TaskBadge label="Completed" className="bg-type-badge text-white" />
          )}
        </div>
        {!task.completed && (
          <div className="ml-auto" onClick={toggleTaskMenuItems}>
            <BsThreeDotsVertical size={18} />
          </div>
        )}
      </Link>
      {openTaskMenu && (
        <div
          onMouseLeave={toggleTaskMenuItems}
          className="absolute right-0 w-[228px] z-[3000] overflow-hidden bg-cards-background text-sm shadow-lg rounded-md"
        >
          <div
            onClick={toggleTaskMenuItems}
            className="flex cursor-pointer flex-col py-1"
          >
            <MenuItem
              onClick={() => router.push(`/tasks/${task.id}/sub-tasks/new`)} // Push to page to add a sub-task to the task
              label="Add sub-task"
              icon={BsClipboardPlus}
            />
            <MenuItem
              onClick={() => openModal(modalData)}
              label="Delete Task"
              icon={HiOutlineTrash}
            />
          </div>
        </div>
      )}
      {openSubTaskMenu && <SubTaskList subTasks={task.subTasks} />}
    </li>
  );
};

export default TaskItem;
