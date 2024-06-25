"use client";

import logoIcon from "/public/icons/logo.svg";
import Image from "next/image";
import { useState } from "react";
import Modal from "../UI/Modal";

const Navbar = () => {
  const [isAccountOpen, setIsAccountOpen] = useState(false);
  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center">
          <span className="flex align-middle gap-2 text-white text-xl font-semibold ml-2">
            <Image src={logoIcon} alt="logo" width={30} height={30} />
            StreamAll
          </span>
        </div>
        <div className="relative">
          <span
            onClick={() => setIsAccountOpen((prev) => !prev)}
            className="text-white cursor-pointer"
          >
            Account
          </span>
        </div>
      </div>

      {isAccountOpen && (
        <div className="absolute right-4 mt-4 w-48 bg-white rounded-md shadow-lg py-2 z-20">
          <div className="p-2 border-b-2">Profile</div>
          <div className="p-2">LogOut</div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
