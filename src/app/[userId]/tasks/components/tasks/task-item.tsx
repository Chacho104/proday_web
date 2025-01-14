// Component to render a single task item with actions to complete, edit, and delete the item

"use client";

import { MouseEventHandler, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

import { BsClipboardPlus, BsThreeDotsVertical } from "react-icons/bs";
import { HiOutlineTrash } from "react-icons/hi";
import { FaCheckCircle } from "react-icons/fa";
import {
  FaChevronDown,
  FaChevronUp,
  FaListCheck,
  FaRegCircle,
} from "react-icons/fa6";

import { useModal } from "@/app/providers/modalProvider";
import { Task } from "@/app/lib/type-definitions";
import TaskBadge from "./task-badge";
import MenuItem from "@/app/components/ui-elements/general/menu-item";

import SubTaskList from "../sub-tasks/sub-task-list";

interface TaskItemProps {
  task: Task;
  userId: string;
}

const TaskItem = ({ task, userId }: TaskItemProps) => {
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

  const handleOpenModal: MouseEventHandler<SVGElement> = (event) => {
    event.preventDefault();
    event.stopPropagation();
    openModal(modalData); // Pass the data when opening the modal
  };

  // const onComplete: MouseEventHandler<SVGElement> = async (event) => {
  //   event.preventDefault();
  //   event.stopPropagation();
  //   try {
  //     await axios.put(`${process.env.NEXT_PUBLIC_TASK_API_URL}/${task.id}`, {
  //       title: task.title,
  //       color: task.color,
  //       completed: true,
  //     });
  //     router.refresh();
  //     toast.success("Task status updated to completed.");
  //   } catch (error) {
  //     toast.error("Could not update task status. Try again!.");
  //   } finally {
  //   }
  // };

  // const onInComplete: MouseEventHandler<SVGElement> = async (event) => {
  //   event.preventDefault();
  //   event.stopPropagation();
  //   try {
  //     await axios.put(`${process.env.NEXT_PUBLIC_TASK_API_URL}/${task.id}`, {
  //       title: task.title,
  //       color: task.color,
  //       completed: false,
  //     });
  //     router.refresh();
  //     toast.success("Task status updated to incomplete.");
  //   } catch (error) {
  //     toast.error("Could not update task status. Try again!.");
  //   } finally {
  //   }
  // };

  return (
    <li className="relative">
      <Link
        className={`w-full rounded-md bg-text-field-bg p-4 flex items-center justify-start cursor-pointer gap-x-2 hover:shadow-2xl transition ${
          task.completed ? "hover:cursor-not-allowed" : ""
        }`}
        href={task.completed ? "/" : `/${userId}/tasks/${task.id}`}
      >
        {!task.completed &&
          task.subTasks.length === 0 &&
          task.taskItems.length === 0 && (
            <FaRegCircle
              size={18}
              className="text-black cursor-pointer hover:scale-110 min-w-6"
              onClick={() => {}}
            />
          )}
        {!task.completed &&
          (task.subTasks.length > 0 || task.taskItems.length > 0) && (
            <>
              {openSubTaskMenu ? (
                <FaChevronUp size={18} onClick={toggleSubTaskMenuItems} />
              ) : (
                <FaChevronDown size={18} onClick={toggleSubTaskMenuItems} />
              )}
            </>
          )}
        {task.completed && (
          <FaCheckCircle
            size={18}
            className="text-complete-task cursor-pointer hover:scale-110 min-w-6"
            onClick={() => {}}
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
              <TaskBadge label={task.type} className="bg-task-badge-four" />
              <TaskBadge label="Due at 2 p.m" className="bg-task-badge-one" />
              <TaskBadge label={task.urgency} className="bg-task-badge-two" />
              <TaskBadge
                label={task.importance}
                className="bg-task-badge_three"
              />
            </>
          )}
        </div>
        <div className="ml-auto" onClick={toggleTaskMenuItems}>
          <BsThreeDotsVertical size={18} />
        </div>
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
              onClick={() => {}} // Push to page to add a sub-task to the task
              label="Add sub-task"
              icon={BsClipboardPlus}
            />
            <MenuItem
              onClick={() => {}} // Push to page to add a checklist item to this task
              label="Add checklist"
              icon={FaListCheck}
            />
            <MenuItem
              onClick={() => {}}
              label="Delete Task"
              icon={HiOutlineTrash}
            />
          </div>
        </div>
      )}
      {openSubTaskMenu && (
        <SubTaskList
          subTasks={task.subTasks}
          taskItems={task.taskItems}
          userId={userId}
        />
      )}
    </li>
  );
};

export default TaskItem;
