import {
  BriefcaseIcon,
  CalendarDaysIcon,
  ClockIcon,
  PlayIcon,
  UserCircleIcon,
} from "@heroicons/react/20/solid";

export default function NewTaskForm() {
  return (
    <div className="p-4 group">
      <input
        type="text"
        className="w-full border border-zinc-200 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
        placeholder="What are you working on?"
      />
      <div className="flex justify-between items-center mt-2">
        <div className="flex gap-5 items-center">
          <button className="font-semibold">
            <BriefcaseIcon className="w-5 h-5" />
          </button>
          <button className="font-semibold">
            <UserCircleIcon className="w-5 h-5" />
          </button>
          <button className="font-semibold">
            <CalendarDaysIcon className="w-5 h-5" />
          </button>
          <button className="font-semibold">
            <ClockIcon className="w-5 h-5" />
          </button>
        </div>
        <button className="px-2 py-1 text-sm rounded-lg flex gap-2 items-center font-semibold text-white bg-blue-600">
          <PlayIcon className="w-5 h-5" />
          Start Timer
        </button>
      </div>
    </div>
  );
}
