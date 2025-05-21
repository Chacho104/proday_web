"use client";

import { createContext, useContext, useState, ReactNode } from "react";

interface ModalData {
  taskId?: string;
  subTaskId?: string;
  subTaskItemId?: string;
}

// Context value type
interface ModalContextType {
  isModalOpen: boolean;
  openModal: (data: ModalData) => void;
  closeModal: () => void;
  modalData: ModalData | null;
}

// Create the context
const ModalContext = createContext<ModalContextType | undefined>(undefined);

// Provider component
export const ModalProvider = ({ children }: { children: ReactNode }) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [modalData, setModalData] = useState<ModalData | null>(null);

  const openModal = (data: ModalData) => {
    setModalData(data);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setModalData(null);
    setIsModalOpen(false);
  };

  return (
    <ModalContext.Provider
      value={{ isModalOpen, openModal, closeModal, modalData }}
    >
      {children}
    </ModalContext.Provider>
  );
};

// Custom hook for using modal context
export const useModal = (): ModalContextType => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error("useModal must be used within a ModalProvider");
  }
  return context;
};
