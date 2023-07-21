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

export default function Page() {
  return (
    <main className="h-full w-full flex flex-col justify-between">
      <div className="flex-1 overflow-y-auto">
        <div className="p-4">
          <motion.div layout className="flex flex-col mt-2">
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
