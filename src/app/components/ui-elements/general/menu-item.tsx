// General menu item component to be used across the application in various menus
// Simple component to be used in rendering user menu items

"use client";

import { IconType } from "react-icons";

interface MenuItemProps {
  onClick?: () => void;
  icon: IconType;
  label: string;
}

const MenuItem = ({ onClick, label, icon: Icon }: MenuItemProps) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className="px-4 py-3 flex items-center gap-x-2 text-white hover:text-warm-yellow transition"
    >
      <Icon size={16} />
      {label}
    </button>
  );
};
export default MenuItem;
