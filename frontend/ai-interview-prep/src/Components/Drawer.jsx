import React from "react";
import { LuX } from "react-icons/lu";

const Drawer = ({ isOpen, onClose, title, children }) => {
  return (
    <div
      className={`fixed top-[64px] right-0 z-40 h-[calc(100dvh-64px)] transition-transform bg-white w-full md:w-[40vw] shadow-2xl shadow-cyan-800/10 border-l border-gray-200 overflow-y-auto
        ${isOpen ? "translate-x-0" : "translate-x-full"}`}
      tabIndex="-1"
      aria-labelledby="drawer-right-label"
    >
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
        <h5
          id="drawer-right-label"
          className="text-base font-semibold text-black"
        >
          {title}
        </h5>

        <button
          className="text-gray-400 cursor-pointer bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg w-8 h-8 flex items-center justify-center"
          type="button"
          onClick={onClose}
        >
          <LuX className="text-lg" />
        </button>
      </div>

      {/* Body */}
      <div className="px-4 py-6">
        {children}
      </div>
    </div>
  );
};

export default Drawer;
