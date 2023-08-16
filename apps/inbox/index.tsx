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
import ArrowsExpand from '../../icons/ArrowsExpand';
import InboxList from './components/List';

export default function Inbox() {
	return (
		<div>
			<div className="flex items-center justify-between p-2 mb-4">
				<div>
					<p className="text-lg font-bold text-surface-12">All streams</p>
					<p>340 tasks, 10 unsorted</p>
				</div>
				<button className="flex items-center gap-2 p-2 py-1 font-semibold uppercase transition-all rounded-xl shadow bg-surface-1 text-surface-12">
					<PlusIcon className="w-5 h-5" />
					<p>New item</p>
				</button>
			</div>
			<div className="p-4 pb-2 mx-2 mb-4 divide-y bg-stone-200 bg-opacity-80 backdrop-blur rounded-xl">
				<div className="pb-4">
					<div className="flex items-center justify-between">
						<p className="font-semibold uppercase text-zinc-600">
							Coming up next
						</p>
						<div className="flex gap-4 px-2">
							<button
								type="button"
								className="-m-1.5 flex flex-none items-center justify-center p-1.5 bg-white shadow rounded-xl">
								<span className="sr-only">Previous event</span>
								<ChevronLeftIcon
									className="w-5 h-5"
									aria-hidden="true"
								/>
							</button>
							<button
								type="button"
								className="-m-1.5 flex flex-none items-center justify-center p-1.5 bg-white shadow rounded-xl">
								<span className="sr-only">Next event</span>
								<ChevronRightIcon
									className="w-5 h-5"
									aria-hidden="true"
								/>
							</button>
						</div>
					</div>

					<div className="flex items-center p-2 mt-4 bg-white rounded-xl drop-shadow border-zinc-100">
						<p className="p-2 rounded-xl bg-zinc-100">
							<VideoCameraIcon className="w-5 h-5" />
						</p>
						<div className="flex-1 ml-4">
							<p>Meeting with Tatenda</p>
							<p className="inline-flex items-center gap-2 font-semibold">
								10:00 <ArrowRightIcon className="w-4 h-4" /> 11:00
							</p>
						</div>
						<button className="p-2 rounded-xl bg-zinc-100">
							<ExternalLink className="w-5 h-5" />
						</button>
					</div>
					<div className="flex gap-4 mt-4">
						<button className="inline-flex items-center gap-2 px-2 font-semibold transition-all rounded-xl hover:text-red-500 text-zinc-500 hover:bg-white hover:shadow-sm">
							<ArrowUturnRightIcon className="w-4 h-4 stroke-2 hover:text-red-500" />
							Sit this one out
						</button>
						<button className="inline-flex items-center gap-2 px-2 font-semibold transition-all rounded-xl hover:text-orange-500 text-zinc-500 hover:bg-white hover:shadow-sm">
							<CalendarIcon className="w-4 h-4 stroke-2 hover:text-orange-500" />
							Update time
						</button>
					</div>
				</div>
			</div>

			<InboxList />
		</div>
	);
}
