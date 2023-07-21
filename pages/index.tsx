"use client";

import CreateItemMenu from "../components/CreateItemMenu";
import { Footer } from "../components/Footer";
import {
  BriefcaseIcon,
  CalendarDaysIcon,
  ChevronRightIcon,
  ClockIcon,
  ExclamationCircleIcon,
  ListBulletIcon,
  PlayIcon,
  PlusIcon,
  RectangleStackIcon,
  Square3Stack3DIcon,
  UserCircleIcon,
} from "@heroicons/react/24/outline";

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
          <div className="flex flex-col mt-4 gap-2">
            <div className="py-2 rounded-xl flex justify-between items-start">
              <div className="flex gap-4 items-start">
                <input
                  className="rounded-xl w-4 h-4 mt-1 border-blue-500 checked:bg-blue-600 checked:border-transparent"
                  type="checkbox"
                />
                <div className="flex flex-col">
                  <p className="font-semibold">Create a new project</p>
                  <p className="text-sm text-zinc-600">Next.js</p>
                </div>
              </div>
              <div className="flex-shrink-0 flex gap-2 items-center">
                <button className="text-sm font-semibold text-zinc-600">
                  00:00:00
                </button>
                <button className="font-semibold text-blue-600">
                  <ExclamationCircleIcon className="w-6 h-6" />
                </button>
              </div>
            </div>
            <div className="py-2 rounded-xl group flex justify-between items-start">
              <div className="flex gap-4 items-start">
                <input
                  className="rounded-xl w-4 h-4 mt-1 border-blue-500 checked:bg-blue-600 checked:border-transparent"
                  type="checkbox"
                />
                <div className="flex flex-col">
                  <p className="font-semibold">
                    <span className="text-red-500 mr-2">!!!</span>
                    Create a new project
                  </p>
                  <p className="text-sm text-zinc-600">Next.js</p>
                  <p className="text-sm">
                    <span className="mr-2">28/7/2023 12:00 PM</span>
                    <span className="text-blue-600">Due in 2 days</span>
                  </p>
                  <div className="mt-4 flex gap-4">
                    <button className="text-sm flex gap-2 items-center font-semibold text-zinc-600 rounded-lg bg-zinc-100 py-1 px-2">
                      <ListBulletIcon className="w-4 h-4" />3 Tasks
                    </button>
                    <button className="text-sm flex gap-2 items-center font-semibold text-zinc-600 rounded-lg bg-zinc-100 py-1 px-2">
                      <RectangleStackIcon className="w-4 h-4" />
                      Personal Website
                    </button>
                  </div>
                  <div className="mt-4 flex flex-col">
                    <div className="flex gap-4 items-center">
                      <input
                        type="checkbox"
                        className="w-4 h-4 rounded-xl border-blue-500 checked:bg-blue-600 checked:border-transparent"
                      />
                      <p className="line-clamp-1 py-2 border-b w-full text-sm">
                        Update nameservers for domain
                      </p>
                    </div>
                    <div className="flex gap-4 items-center">
                      <input
                        type="checkbox"
                        className="w-4 h-4 rounded-xl border-blue-500 checked:bg-blue-600 checked:border-transparent"
                      />
                      <p className="line-clamp-1 py-2 border-b w-full text-sm">
                        Go to the bank and get a new card
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex-shrink-0 flex gap-2 items-center">
                <button className="font-semibold text-blue-600 hidden group-hover:flex transition-all duration-200">
                  <ExclamationCircleIcon className="w-6 h-6" />
                </button>
              </div>
            </div>
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
