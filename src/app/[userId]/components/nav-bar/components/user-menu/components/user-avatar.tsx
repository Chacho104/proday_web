// User avatar. Shows user image and name.
// Renders a button that when clicked opens up a menu for user actions

"use client";

import { useState } from "react";
import Image from "next/image";
import UserMenuItem from "./user-menu-item";
import { IoSettingsOutline } from "react-icons/io5";
import { MdOutlineLogout } from "react-icons/md";
import { FaRegUser } from "react-icons/fa6";

const UserAvatar = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const toggleUserMenuItems = () => {
    setIsOpen((value) => !value);
  };
  return (
    <>
      <button
        type="button"
        className="flex items-center justify-center hover:scale-105"
        onClick={toggleUserMenuItems}
        onMouseEnter={toggleUserMenuItems}
      >
        <div className="w-[35px]">
          <Image
            alt="Avatar"
            width={35}
            height={35}
            src="/images/1680527339553.jpeg"
            className="rounded-full"
          />
        </div>
      </button>
      {isOpen && (
        <div
          onMouseLeave={toggleUserMenuItems}
          className="absolute right-2 top-[85px] w-[228px] z-[3000] overflow-hidden bg-cards-background text-sm shadow-lg rounded-md sm:right-4 md:right-6"
        >
          <div
            onClick={toggleUserMenuItems}
            className="flex cursor-pointer flex-col py-1"
          >
            <UserMenuItem label="Username" icon={FaRegUser} />
            {/* Callback function to navigate to user settings page */}
            <UserMenuItem
              onClick={() => {}}
              label="Settings"
              icon={IoSettingsOutline}
            />
            {/* Callback function to logout user */}
            <UserMenuItem
              onClick={() => {}}
              label="Log Out"
              icon={MdOutlineLogout}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default UserAvatar;
