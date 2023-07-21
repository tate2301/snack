"use client";

import CreateItemMenu from "../components/CreateItemMenu";
import { Footer } from "../components/Footer";
import {
  BriefcaseIcon,
  CalendarDaysIcon,
  ChevronRightIcon,
  ClockIcon,
  PlayIcon,
  PlusIcon,
  Square3Stack3DIcon,
  UserCircleIcon,
} from "@heroicons/react/20/solid";

export default function Page() {
  return (
    <main className="h-full w-full flex flex-col justify-between">
      <div className="flex-1 overflow-y-auto">
        <div className="w-full bg-zinc-50 border-b border-zinc-200">
          <div className="p-4 flex justify-between items-center">
            <div>
              <p className="text-xl font-semibold text-zinc-800 lowercase">
                {new Date().toLocaleTimeString("en-US", {
                  hour12: true,
                  timeStyle: "short",
                })}
              </p>
              <p className="text-sm text-zinc-600">
                {new Date().toDateString()}
              </p>
            </div>
            <img
              src="https://www.typescriptdev.xyz/assets/avatar.jpg"
              alt="Next.js Logo"
              className="h-8 w-8 mr-4 rounded-full"
            />
          </div>
        </div>
        <div className="p-4">
          <div className="flex justify-between items-baseline">
            <p className="text-sm text-zinc-600">Projects</p>
            <button className="text-sm text-blue-600 font-semibold">
              See All
            </button>
          </div>
          <div className="flex flex-col mt-4 rounded-xl ">
            <HomeCard
              title="Next.js"
              description="The React Framework for Production"
              href="https://nextjs.org"
              icon="https://ui-avatars.com/api/?name=John+Doe"
            />
            <HomeCard
              title="Tailwind CSS"
              description="Rapidly build modern websites without ever leaving your HTML."
              href="https://tailwindcss.com"
              icon="https://ui-avatars.com/api/?name=Tailwind+CSS"
            />
            <HomeCard
              title="TypeScript"
              description="TypeScript extends JavaScript by adding types."
              href="https://www.typescriptlang.org"
              icon="https://ui-avatars.com/api/?name=Javascript+CSS"
            />
          </div>
        </div>
      </div>
      <div className="p-4">
        <CreateItemMenu />
      </div>
    </main>
  );
}

const HomeCard = ({ title, description, href, icon }) => {
  return (
    <div className="group items-center flex justify-between  gap-4">
      <p className="p-1 bg-orange-600 text-white rounded-lg">
        <Square3Stack3DIcon className="w-4 h-4" />
      </p>
      <div className="flex items-center py-2 gap-4 w-full justify-between border-b">
        <p>{title}</p>
        <ChevronRightIcon className="w-5 h-5 text-zinc-600 group-hover:text-blue-600" />
      </div>
    </div>
  );
};
