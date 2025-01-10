"use client";
import { useModal } from "@/app/providers/modalProvider";
import axios from "axios";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const Modal = () => {
  const router = useRouter();
  const { isModalOpen, closeModal, modalData } = useModal();

  if (!isModalOpen || !modalData) return null;

  const handleDelete = async () => {
    if (modalData.taskId) {
      try {
        // Send the DELETE API request to delete the task by ID
        await axios.delete(
          `${process.env.NEXT_PUBLIC_TASK_API_URL}/${modalData.taskId}`
        );
        toast.success("Task delete successfully!");
        router.refresh();
        closeModal(); // Close the modal after deleting the task
      } catch (error) {
        console.error("Failed to delete task", error);
        toast.error("Could not delete task. Try again!.");
      }
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-modal-bg p-6 rounded-lg shadow-lg">
        <h1 className="text-xl font-bold">Are you sure?</h1>
        <p className="mt-4">This action will delete the selected task.</p>
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
