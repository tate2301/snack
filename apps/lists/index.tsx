import { PlayIcon } from '@heroicons/react/24/solid';
import TaskListSection from '../../components/Home/TaskListSection';
import { QueueListIcon } from '@heroicons/react/24/solid';
import { PlusIcon } from '@heroicons/react/24/outline';
import TimerIcon from '../../icons/Timer';

export default function Lists() {
	return (
		<div>
			<div className="p-4 bg-stone-100">
				<div className="flex justify-between items-center mb-4">
					<p className=" uppercase font-semibold">Lists</p>
					<div className="flex gap-4">
						<button className="p-2 rounded-xl bg-white shadow flex items-center gap-2 uppercase">
							<PlusIcon className="w-5 h-5" />
							New list
						</button>
					</div>
				</div>
				<div className="p-4 rounded-xl bg-white shadow flex justify-between items-start">
					<div className="p-2">
						<p className="font-semibold text-lg text-zinc-900">Work</p>
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
					<button className="p-2 rounded-full bg-orange-600 text-white mt-2">
						<PlayIcon className="w-5 h-5" />
					</button>
				</div>
			</div>
			<div className="flex-1 py-2">
				<TaskListSection title={'Work'} />
				<TaskListSection title={'Personal'} />
			</div>
		</div>
	);
}
