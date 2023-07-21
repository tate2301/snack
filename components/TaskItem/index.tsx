import {
  ChevronRightIcon,
  ClockIcon,
  ExclamationCircleIcon,
  ListBulletIcon,
  PlayIcon,
  RectangleStackIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";

export default function TaskItem({ id }) {
  return (
    <div className="py-2 rounded-xl group flex gap-4 items-start w-full">
      <input
        className="rounded-xl w-4 h-4 mt-1 border-blue-500 checked:bg-blue-600 checked:border-transparent"
        type="checkbox"
      />

      <div className="w-full">
        <div className="w-full flex border-b pb-2 justify-between items-start gap-4">
          <div className="flex flex-col flex-1 max-w-sm">
            <p className="flex gap-2">
              <span className="text-red-500 mr-2">!!!</span>
              Configure Domain Name for the idea factory company
            </p>
            <p className="text-sm text-zinc-400 mt-2 line-clamp-2">
              Its crucial to get this done as soon as possible, we rely on it to
              get more funding. Which we can agree we critically need
            </p>
            <p className="text-sm mt-1">
              <span className="mr-2">28/7/2023 12:00 PM</span>
              <span className="text-blue-600">Due in 2 days</span>
            </p>
            <button className="text-sm mt-1">
              <span className="flex items-center gap-2 text-orange-500">
                <ClockIcon className="w-4 h-4" />1 hour before
              </span>
            </button>
          </div>
          <div className="flex-shrink-0 flex gap-4 items-center">
            <Link href={`/task/${id}`} className="items-start flex">
              <button className=" text-blue-600 opacity-0 md:opacity-100 transition-all duration-200">
                <ChevronRightIcon className="w-5 h-5" />
              </button>
            </Link>
          </div>
        </div>
        <div className="mt-2 flex gap-4">
          <button className="text-sm flex gap-2 items-center  text-zinc-500 rounded-lg bg-zinc-100 py-1 px-2">
            <ListBulletIcon className="w-4 h-4" />3 Tasks
          </button>
          <button className="text-sm flex gap-2 items-center  text-zinc-500 rounded-lg bg-zinc-100 py-1 px-2">
            <RectangleStackIcon className="w-4 h-4" />
            Personal Website
          </button>
        </div>
        <div className="mt-2 flex flex-col">
          <div className="flex gap-4 items-center group">
            <input
              type="checkbox"
              className="w-4 h-4 rounded-xl border-blue-500 checked:bg-blue-600 checked:border-transparent"
            />
            <p className="line-clamp-1 py-2 group-checked:text-zinc-400 border-b w-full text-sm">
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
  );
}
