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
import TaskItem from "../components/TaskItem";
import { motion } from "framer-motion";
import { ChevronUpIcon } from "@heroicons/react/20/solid";

export default function Page() {
  return (
    <main className="h-full w-full flex flex-col justify-between">
      <div className="flex-1 overflow-y-auto max-w-full">
        <div className="flex gap-2 items-center p-4">
          <div className="p-4 py-2 flex items-center border flex-col gap-1 rounded-xl text-centers">
            <p className="text-xl font-bold">20</p>
            <p className="text-sm">Tue</p>
          </div>
          <div className="p-4 py-2 shadow flex items-center flex-col gap-1 rounded-xl text-center bg-zinc-950 text-white">
            <p className="text-xl font-bold">21</p>
            <p className="text-sm">Wed</p>
          </div>
          <div className="p-4 py-2 flex items-center border flex-col gap-1 rounded-xl text-centers">
            <p className="text-xl font-bold">22</p>
            <p className="text-sm">Thu</p>
          </div>
          <div className="p-4 py-2 flex items-center border flex-col gap-1 rounded-xl text-centers">
            <p className="text-xl font-bold">23</p>
            <p className="text-sm">Fri</p>
          </div>
          <div className="px-4 flex flex-col justify-between h-full gap-1">
            <button className="p-2 rounded bg-zinc-100">
              <CalendarDaysIcon className="w-4 h-4" />
            </button>
            <button className="p-2 rounded bg-zinc-100">
              <ChevronRightIcon className="w-4 h-4" />
            </button>
          </div>
        </div>
        <div className="p-4">
          <button className="flex gap-4 items-center text-blue-600 font-bold">
            <PlusIcon className="w-4 h-4" />
            <p>Add a Funky Task</p>
          </button>
        </div>
        <div className="p-4">
          <motion.div layout className="flex flex-col">
            <TaskItem id={1} />
            <TaskItem id={2} />
            <TaskItem id={3} />
          </motion.div>
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
        <ChevronRightIcon className="w-5 h-5 text-zinc-500 group-hover:text-blue-600" />
      </div>
    </div>
  );
};
