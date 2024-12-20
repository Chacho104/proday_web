"use client";
import { useRouter } from "next/navigation";
import { Task } from "@/models/task";
import { FaRegCircle, FaCheckCircle } from "react-icons/fa";
import { HiOutlineTrash } from "react-icons/hi";
import axios from "axios";
import toast from "react-hot-toast";
import { MouseEventHandler } from "react";
import Link from "next/link";
import { title } from "process";
import { useModal } from "@/providers/modalProvider";

interface TaskCardItemProps {
  task: Task;
}

const TaskCardItem: React.FC<TaskCardItemProps> = ({ task }) => {
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

  const onComplete: MouseEventHandler<SVGElement> = async (event) => {
    event.preventDefault();
    event.stopPropagation();
    try {
      await axios.put(`${process.env.NEXT_PUBLIC_TASK_API_URL}/${task.id}`, {
        title: task.title,
        color: task.color,
        completed: true,
      });
      router.refresh();
      toast.success("Task status updated to completed.");
    } catch (error) {
      toast.error("Could not update task status. Try again!.");
    } finally {
    }
  };

  const onInComplete: MouseEventHandler<SVGElement> = async (event) => {
    event.preventDefault();
    event.stopPropagation();
    try {
      await axios.put(`${process.env.NEXT_PUBLIC_TASK_API_URL}/${task.id}`, {
        title: task.title,
        color: task.color,
        completed: false,
      });
      router.refresh();
      toast.success("Task status updated to incomplete.");
    } catch (error) {
      toast.error("Could not update task status. Try again!.");
    } finally {
    }
  };

  return (
    <Link
      className={`w-[90%] lg:w-[736px] border-[1px] border-badge-gray rounded-lg bg-task-card-bg p-4 flex items-center justify-between cursor-pointer gap-x-2 hover:shadow-2xl ${
        task.completed ? "hover:cursor-not-allowed" : ""
      }`}
      href={task.completed ? "/" : `/tasks/${task.id}`}
    >
      {!task.completed && (
        <FaRegCircle
          size={18}
          className="text-light-blue cursor-pointer hover:text-dark-blue min-w-6"
          onClick={onComplete}
        />
      )}
      {task.completed && (
        <FaCheckCircle
          size={18}
          className="text-lavender-blue cursor-pointer hover:opacity-50 min-w-6"
          onClick={onInComplete}
        />
      )}
      <p
        className={`font-normal text-sm ${
          task.completed ? "line-through" : ""
        } text-text-gray`}
        style={!task.completed ? { color: task.color } : undefined} // Apply color dynamically only if not task is not completed
      >
        {task.title}
      </p>
      <HiOutlineTrash
        size={20}
        className="text-text-gray hover:bg-badge-gray cursor-pointer hover:border rounded-lg hover:border-transparent hover:text-red-500 min-w-6"
        onClick={handleOpenModal}
      />
    </Link>
  );
};

export default TaskCardItem;
