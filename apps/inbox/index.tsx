import {
	ArchiveBoxIcon,
	ArrowRightIcon,
	ArrowUpRightIcon,
	ArrowUturnRightIcon,
	CalendarDaysIcon,
	CalendarIcon,
	ChevronLeftIcon,
	ChevronRightIcon,
	ExclamationCircleIcon,
	InboxIcon,
	PlusIcon,
	VideoCameraIcon,
} from '@heroicons/react/24/outline';
import TimerIcon from '../../icons/Timer';
import ExternalLink from '../../icons/ExternalLink';
import { ArrowPathIcon } from '@heroicons/react/20/solid';

export default function Inbox() {
	return (
		<div className="divide-y divide-zinc-100">
			<div className="p-4 pb-2 bg-stone-100 divide-y">
				<div className="pb-4">
					<div className="flex items-center justify-between">
						<p className="font-semibold uppercase text-zinc-500">
							Coming up next
						</p>
						<div className="flex gap-4 px-2">
							<button
								type="button"
								className="-m-1.5 flex flex-none items-center justify-center p-1.5 bg-white shadow rounded-lg">
								<span className="sr-only">Previous event</span>
								<ChevronLeftIcon
									className="w-5 h-5"
									aria-hidden="true"
								/>
							</button>
							<button
								type="button"
								className="-m-1.5 flex flex-none items-center justify-center p-1.5 bg-white shadow rounded-lg">
								<span className="sr-only">Next event</span>
								<ChevronRightIcon
									className="w-5 h-5"
									aria-hidden="true"
								/>
							</button>
						</div>
					</div>

					<div className="mt-4 rounded-xl drop-shadow bg-white border-zinc-100 p-2 flex items-center">
						<p className="p-2 bg-zinc-100 rounded-lg">
							<VideoCameraIcon className="w-5 h-5" />
						</p>
						<div className="ml-4 flex-1">
							<p>Meeting with Tatenda</p>
							<p className="font-semibold inline-flex gap-2 items-center">
								10:00 <ArrowRightIcon className="w-4 h-4" /> 11:00
							</p>
						</div>
						<button className="p-2 bg-zinc-100 rounded-lg">
							<ExternalLink className="w-5 h-5" />
						</button>
					</div>
					<div className="flex gap-4 mt-4">
						<button className="inline-flex gap-2 items-center rounded-xl hover:text-red-500 text-zinc-500 font-semibold hover:bg-white hover:shadow-sm transition-all px-2">
							<ArrowUturnRightIcon className="w-4 h-4 hover:text-red-500 stroke-2" />
							Sit this one out
						</button>
						<button className="inline-flex gap-2 items-center rounded-xl hover:text-orange-500 text-zinc-500 font-semibold hover:bg-white hover:shadow-sm transition-all px-2">
							<CalendarIcon className="w-4 h-4 hover:text-orange-500 stroke-2" />
							Update time
						</button>
					</div>
				</div>
				<div className="flex justify-between items-baseline p-2 pt-4">
					<p className="uppercase text-zinc-500">Inbox</p>
					<button className="p-2 py-1 rounded-lg bg-white shadow transition-all flex gap-2 uppercase items-center">
						<PlusIcon className="w-5 h-5" />
						<p>New item</p>
					</button>
				</div>
			</div>
			<div className="px-1 py-2">
				<ul className="list-disc">
					<li className="hover:bg-zinc-100 pr-4 pl-2 py-2 rounded-xl gap-4 transition-all flex">
						<div className="w-2 h-2 mt-4"></div>
						<div>
							<p className="font-semibold">Design Trivia</p>
							<p className="text-zinc-600">
								We need to figure out what inbox will look like
							</p>
							<div className="mt-2 grid grid-cols-8 gap-2">
								<button className="py-2 flex justify-center rounded-xl hover:bg-white hover:shadow text-zinc-400 hover:text-zinc-800 transition-all">
									<CalendarDaysIcon className="w-5 h-5" />
								</button>
								<button className="py-2 flex justify-center rounded-xl hover:bg-white hover:shadow text-zinc-400 hover:text-zinc-800 transition-all">
									<TimerIcon className="w-5 h-5" />
								</button>
								<button className="py-2 flex justify-center rounded-xl hover:bg-white hover:shadow text-zinc-400 hover:text-zinc-800 transition-all">
									<ExclamationCircleIcon className="w-5 h-5" />
								</button>
								<button className="py-2 flex justify-center rounded-xl hover:bg-white hover:shadow text-zinc-400 hover:text-zinc-800 transition-all">
									<VideoCameraIcon className="w-5 h-5" />
								</button>
							</div>
						</div>
					</li>
					<li className="hover:bg-zinc-100 pr-4 pl-2 flex gap-4 py-2 rounded-xl group">
						<div className="w-2 h-2 rounded-full bg-orange-600 mt-4"></div>

						<div className="flex-1">
							<div className="flex justify-between items-baseline">
								<p className="font-semibold">Design Trivia</p>
								<div className="flex flex-shrink-0 gap-2">
									<button className="p-2 rounded-lg bg-white text-zinc-400 group-hover:text-zinc-800 dark:bg-zinc-800 dark:text-zinc-300 right-0">
										<TimerIcon className={'w-4 h-4'} />
									</button>
									<button className="p-2 rounded-lg bg-white text-zinc-400 group-hover:text-zinc-800 dark:bg-zinc-800 dark:text-zinc-300 right-0">
										<ArchiveBoxIcon className={'w-4 h-4'} />
									</button>
									<button className="p-2 rounded-lg bg-white text-zinc-400 group-hover:text-zinc-800 dark:bg-zinc-800 dark:text-zinc-300 right-0">
										<ArrowUpRightIcon className={'w-4 h-4'} />
									</button>
								</div>
							</div>
							<div className="mt-1">
								<p className="text-zinc-600">
									We need to figure out what inbox will look like
								</p>
							</div>
							<div className="mt-1">
								<p className="flex px-2 py-1 mt-2 text-sm font-semibold uppercase rounded-lg w-fit bg-white shadow-sm">
									<ArrowPathIcon className="w-4 h-4 mr-2 text-zinc-400" />
									Repeats yearly
								</p>
							</div>
						</div>
					</li>
					<li className="hover:bg-zinc-100 pr-4 pl-2 flex gap-4 py-2 rounded-xl group">
						<div className="w-2 h-2 rounded-full bg-orange-600 mt-4"></div>

						<div className="flex-1">
							<div className="flex justify-between items-baseline">
								<p className="font-semibold">Meeting with Tatenda</p>
								<div className="flex flex-shrink-0 gap-2">
									<button className="p-2 rounded-lg bg-white text-zinc-400 group-hover:text-zinc-800 dark:bg-zinc-800 dark:text-zinc-300 right-0">
										<TimerIcon className={'w-4 h-4'} />
									</button>
									<button className="p-2 rounded-lg bg-white text-zinc-400 group-hover:text-zinc-800 dark:bg-zinc-800 dark:text-zinc-300 right-0">
										<ArchiveBoxIcon className={'w-4 h-4'} />
									</button>
									<button className="p-2 rounded-lg bg-white text-zinc-400 group-hover:text-zinc-800 dark:bg-zinc-800 dark:text-zinc-300 right-0">
										<ArrowUpRightIcon className={'w-4 h-4'} />
									</button>
								</div>
							</div>
							<p className="text-zinc-600">
								We need to figure out what inbox will look like
							</p>
							<div className="flex mt-1 gap-2 text-zinc-500 items-center">
								<button className="text-sm font-bold uppercase px-2 rounded  py-0.5 bg-white shadow-sm text-zinc-500">
									03:30 PM - 04:00 PM
								</button>
								<button className="px-2 text-sm py-0.5 shadow-sm inline-flex gap-2 items-center bg-white rounded uppercase text-zinc-500">
									Google Meet <ExternalLink className="w-4 h-4" />
								</button>
							</div>
						</div>
					</li>
				</ul>
			</div>
		</div>
	);
}
