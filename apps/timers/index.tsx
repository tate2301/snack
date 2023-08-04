import { PlayIcon } from '@heroicons/react/24/solid';
import TaskListSection from '../../components/Home/TaskListSection';
import { QueueListIcon } from '@heroicons/react/24/solid';
import { ArrowPathIcon, PlusIcon } from '@heroicons/react/24/outline';
import TimerIcon from '../../icons/Timer';
import FocusPeriod from '../../components/focus/Focus';
import TaskListItem from '../../components/Home/TaskListItem';

export default function Timers() {
	return (
		<div>
			<div className="bg-stone-100 pb-2">
				<div className="flex p-4 justify-between items-center mb-4 border-b">
					<p className=" uppercase font-semibold">Focus Timer</p>
					<div className="flex gap-4 items-center">
						<button className="px-2 py-1 rounded-lg bg-white shadow flex items-center gap-2 uppercase">
							<QueueListIcon className="w-5 h-5" />
							New list
						</button>
						<button className="px-2 py-1 rounded-lg bg-white shadow flex items-center gap-2 uppercase">
							<TimerIcon className="w-5 h-5" />
							New timer
						</button>
					</div>
				</div>
				<div className="p-4 m-4 rounded-xl bg-white shadow divide-y">
					<div className="flex justify-between items-start mb-4">
						<div className="p-2">
							<p className="font-semibold text-lg text-zinc-900">Personal</p>
							<div className="flex gap-4 mt-2">
								<p className="text-zinc-500 inline-flex items-center gap-2 bg-zinc-100 rounded px-2 py-1 uppercase select-none">
									<QueueListIcon className="w-5 h-5" />
									6/14 tasks
								</p>
								<p className="text-zinc-500 inline-flex items-center gap-2 bg-zinc-100 rounded px-2 py-1 uppercase select-none">
									<TimerIcon className="w-5 h-5" />
									21:23:07
								</p>
							</div>
						</div>
					</div>
					<FocusPeriod />
					<div className="mt-4 pt-2">
						<TaskListSection title={'Tasks'} />
					</div>
				</div>
			</div>
			<div className="flex-1 py-2">
				<TaskListSection title={'Work'} />
				<TaskListSection title={'Personal'} />
			</div>
		</div>
	);
}
