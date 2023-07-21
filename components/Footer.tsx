import React from "react";

export function Footer({}) {
  return (
    <div className="border-t p-4 flex-shrink-0 flex justify-between items-center">
      <div className="flex items-center">
        <img
          src="https://www.typescriptdev.xyz/assets/avatar.jpg"
          alt="Next.js Logo"
          className="h-8 w-8 mr-4 rounded-full"
        />
        <div>
          <p>Tatenda Chinyamakobvu</p>
          <p className="text-sm text-zinc-500">typescriptdev@gmail.com</p>
        </div>
      </div>
      <button className="px-4 py-2 rounded-xl  text-red-500 bg-red-50">
        Sign Out
      </button>
    </div>
  );
}
