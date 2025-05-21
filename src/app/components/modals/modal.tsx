"use client";

import { useRouter } from "next/navigation";
import { useModal } from "@/app/providers/modalProvider";
import toast from "react-hot-toast";

import { deleteSubTaskItem } from "@/app/actions/sub-task-items";
import { deleteSubTask } from "@/app/actions/sub-tasks";
import { deleteTask } from "@/app/actions/tasks";

const Modal = () => {
  const router = useRouter();
  const { isModalOpen, closeModal, modalData } = useModal();

  if (!isModalOpen || !modalData) return null;

  const handleDelete = async () => {
    // Ensure exhaustive if statements to delete only what is intended!
    if (modalData.taskId && modalData.subTaskId && !modalData.subTaskItemId) {
      // Send the DELETE API request to delete the sub-task by ID
      const response: string = await deleteSubTask(
        modalData.taskId,
        modalData.subTaskId
      );

      if (response.includes("Success")) {
        toast.success(response);
        router.refresh();
        closeModal(); // Close the modal after deleting the task
      } else {
        toast.error(response);
      }
    }

    if (modalData.subTaskId && modalData.subTaskItemId && !modalData.taskId) {
      // Send the DELETE API request to delete the sub-task item by ID
      const response: string = await deleteSubTaskItem(
        modalData.subTaskId,
        modalData.subTaskItemId
      );

      if (response.includes("Success")) {
        toast.success(response);
        router.refresh();
        closeModal(); // Close the modal after deleting the task
      } else {
        toast.error(response);
      }
    }

    if (modalData.taskId && !modalData.subTaskId && !modalData.subTaskItemId) {
      // Send the DELETE API request to delete the task by ID
      const response: string = await deleteTask(modalData.taskId);

      if (response.includes("Success")) {
        toast.success(response);
        router.refresh();
        closeModal(); // Close the modal after deleting the task
      } else {
        toast.error(response);
      }
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-2">
      <div className="bg-modal-bg p-6 rounded-lg shadow-lg">
        <h1 className="text-xl font-bold">Are you sure?</h1>
        <p className="mt-4">
          You are about to delete the selected item, an action that cannot be
          reversed
        </p>
        <div className="mt-6 flex justify-end gap-x-3">
          <button
            className="px-4 py-1 bg-text-gray text-white rounded-lg hover:opacity-80"
            onClick={closeModal}
          >
            Cancel
          </button>
          <button
            className="px-4 py-1 bg-red-500 text-white rounded-lg hover:opacity-80"
            onClick={handleDelete}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
