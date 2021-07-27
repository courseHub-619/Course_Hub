import Image from "next/image";
import { FaUserCircle, FaBars } from "react-icons/fa";
import { React, useState } from "react";
import Sidebar from "./sidebar.js";

const Navbar = () => {
  return (
    <div className="flex justify-between bg-gray-100">
      <div className="p-4 text-center">
        <Sidebar />
      </div>
      <div>
        <Image src="/logo.png" width={100} height={60} alt={""} />
      </div>
      <div>
        <div className="p-4">
          <FaUserCircle size={35} color={"#3881AB"} />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
