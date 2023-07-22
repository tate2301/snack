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
import { useState } from "react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { timeDifference } from "../../lib/time";

export default function TaskItem({ id }) {
  const [isShowing, setIsShowing] = useState(false);
  const toggle = () => setIsShowing(!isShowing);

  const [isExpanded, setIsExpanded] = useState(false);
  const expand = () => setIsExpanded(!isExpanded);
  return (
    <div className="py-2 rounded-xl group flex gap-4 items-start w-full">
      <input
        className="rounded-xl w-4 h-4 mt-1 border-blue-500 checked:bg-blue-600 checked:border-transparent"
        type="checkbox"
      />

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
              Its crucial to get this done as soon as possible, we rely on it to
              get more funding. Which we can agree we critically need
            </p>
            <p className="text-sm mt-1 font-bold">
              <span className="mr-2">28/7/2023 12:00 PM</span>
              <span className="text-blue-600">Due in 2 days</span>
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
            <div className="mt-2 flex gap-4">
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
            </div>
          )}
        </motion.div>
        <motion.div layout>
          {isShowing && isExpanded && (
            <div className="mt-2 flex flex-col">
              <div className="flex gap-4 items-center group">
                <input
                  type="checkbox"
                  className="w-4 h-4 rounded-xl border-blue-500 checked:bg-blue-600 checked:border-transparent"
                />
                <p className="line-clamp-1 py-2 group-checked:text-zinc-400 text-zinc-600 border-b w-full text-sm">
                  Update nameservers for domain
                </p>
              </div>
              <div className="flex gap-4 items-center">
                <input
                  type="checkbox"
                  className="w-4 h-4 rounded-xl border-blue-500 checked:bg-blue-600 checked:border-transparent"
                />
                <p className="line-clamp-1 py-2 border-b w-full text-sm text-zinc-600">
                  Go to the bank and get a new card
                </p>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
