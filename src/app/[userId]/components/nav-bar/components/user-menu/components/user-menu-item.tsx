// Simple component to be used in rendering user menu items

"use client";

import { IconType } from "react-icons";

interface UserMenuItemProps {
  onClick?: () => void;
  icon: IconType;
  label: string;
}

const UserMenuItem = ({ onClick, label, icon: Icon }: UserMenuItemProps) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className="px-4 py-3 flex items-center gap-x-2 text-white hover:text-warm-yellow hover:scale-105 transition"
    >
      <Icon size={18} />
      {label}
    </button>
  );
};
export default UserMenuItem;
