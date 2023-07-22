import {
  ChevronRightIcon,
  ClockIcon,
  ExclamationCircleIcon,
  InformationCircleIcon,
  ListBulletIcon,
  PlayIcon,
  RectangleStackIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import { motion } from "framer-motion";
import { AnimatePresence } from "framer-motion";
import { useState } from "react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { timeDifference } from "../../lib/time";
import Subtask from "./Subtask";

export default function TaskItem({ id }) {
  const [isShowing, setIsShowing] = useState(false);
  const toggle = () => setIsShowing(!isShowing);

  const [isExpanded, setIsExpanded] = useState(false);
  const expand = () => setIsExpanded(!isExpanded);
  return (
    <div className="py-2 rounded-xl group flex gap-4 items-start w-full">
      <input className="rounded-xl mt-1" type="checkbox" />

      <AnimatePresence>
        <div className="w-full">
          <div className="w-full flex border-b pb-2 justify-between items-start gap-4">
            <div className="flex flex-col flex-1">
              <div className="flex justify-between items-start">
                <p className="flex gap-2 font-bold">
                  <span className="text-red-500">!!!</span>
                  <span contentEditable>
                    {" "}
                    Configure Domain Name for the idea factory company
                  </span>
                </p>
                <div className="flex-shrink-0 flex gap-4 items-center">
                  <button
                    onClick={expand}
                    className="flex items-center gap-2 transition-all duration-200"
                  >
                    3{" "}
                    {isExpanded ? (
                      <ChevronDownIcon className="w-4 h-4" />
                    ) : (
                      <ChevronRightIcon className="w-4 h-4" />
                    )}
                  </button>
                  <Link href={`/task/${id}`} className="items-start flex">
                    <button className="transition-all duration-200">
                      <InformationCircleIcon className="w-5 h-5" />
                    </button>
                  </Link>
                </div>
              </div>

              <p
                contentEditable
                className={`text-sm text-zinc-400 mt-2 ${
                  isExpanded ? "line-clamp-6" : "line-clamp-2"
                }`}
              >
                Its crucial to get this done as soon as possible, we rely on it
                to get more funding. Which we can agree we critically need
              </p>
              <p className="text-sm text-zinc-600 mt-1 font-bold">
                <span className="mr-2">28/7/2023 12:00 PM</span>
                <span className="">Due in 2 days</span>
              </p>
              <button className="text-sm mt-1 font-bold">
                <span className="flex items-center gap-2 text-orange-500">
                  <ClockIcon className="w-4 h-4" />
                  {timeDifference(
                    new Date("2023-07-21T12:00:00.000Z"),
                    new Date()
                  )}{" "}
                  before
                </span>
              </button>
            </div>
          </div>
          <motion.div layout>
            {isExpanded && (
              <motion.div
                exit={{ height: 0, opacity: 0 }}
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                className="mt-2 flex gap-4"
              >
                <button
                  onClick={toggle}
                  className="text-sm font-bold flex gap-2 items-center  text-zinc-500 rounded-lg bg-zinc-100 py-1 px-2"
                >
                  <ListBulletIcon className="w-4 h-4" />3 Tasks
                </button>
                <button className="text-sm flex font-bold gap-2 items-center  text-zinc-500 rounded-lg bg-zinc-100 py-1 px-2">
                  <RectangleStackIcon className="w-4 h-4" />
                  Personal Website
                </button>
              </motion.div>
            )}
          </motion.div>
          <motion.div layout>
            {isShowing && isExpanded && (
              <motion.div
                exit={{ height: 0, opacity: 0 }}
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                className="mt-2 flex flex-col"
              >
                <Subtask />

                <Subtask />

                <Subtask />

                <Subtask />

                <Subtask />

                <Subtask />
              </motion.div>
            )}
          </motion.div>
        </div>
      </AnimatePresence>
    </div>
  );
}
