// Component to render a single task item with actions to complete, edit, and delete the item

"use client";

import { useRouter } from "next/navigation";
import { FaRegCircle, FaCheckCircle } from "react-icons/fa";
import { HiOutlineTrash } from "react-icons/hi";
import { MouseEventHandler } from "react";
import Link from "next/link";
import { useModal } from "@/app/providers/modalProvider";
import { Task } from "@/app/lib/type-definitions";
import TaskBadge from "./task-badge";

interface TaskItemProps {
  task: Task;
  userId: string;
}

const TaskItem = ({ task, userId }: TaskItemProps) => {
  const router = useRouter();

  const { openModal } = useModal();

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
    <li>
      <Link
        className={`w-full rounded-md bg-task-card-bg p-4 flex items-center justify-start cursor-pointer gap-x-4 hover:shadow-2xl transition ${
          task.completed ? "hover:cursor-not-allowed" : ""
        }`}
        href={task.completed ? "/" : `/${userId}/tasks/${task.id}`}
      >
        {!task.completed && (
          <FaRegCircle
            size={18}
            className="text-warm-yellow cursor-pointer hover:scale-110 min-w-6"
            onClick={() => {}}
          />
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
            className={`font-normal text-sm ${
              task.completed ? "line-through text-text-gray" : "text-white"
            }`}
          >
            {task.title}
          </p>
          {/* Badges */}
          {!task.completed && (
            <>
              <TaskBadge label="Work" className="bg-task-badge-four" />
              <TaskBadge label="Due at 2 p.m" className="bg-task-badge-one" />
              <TaskBadge label="Urgent" className="bg-task-badge-two" />
              <TaskBadge label="Important" className="bg-task-badge_three" />
            </>
          )}
        </div>
        <HiOutlineTrash
          size={20}
          className="text-delete-btn hover:scale-110 cursor-pointer min-w-6 ml-auto"
          onClick={handleOpenModal}
        />
      </Link>
    </li>
  );
};

export default TaskItem;
