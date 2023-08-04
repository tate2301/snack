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
			<div className="pb-2 bg-stone-100">
				<div className="flex items-center justify-between p-4 mb-4 border-b">
					<p className="font-semibold uppercase ">Focus Timer</p>
					<div className="flex items-center gap-4">
						<button className="flex items-center gap-2 px-2 py-1 uppercase bg-white rounded-lg shadow">
							<QueueListIcon className="w-5 h-5" />
							New list
						</button>
						<button className="flex items-center gap-2 px-2 py-1 uppercase bg-white rounded-lg shadow">
							<TimerIcon className="w-5 h-5" />
							New timer
						</button>
					</div>
				</div>
				<div className="p-4 m-4 bg-white divide-y shadow rounded-xl">
					<div className="flex items-start justify-between mb-4">
						<div className="p-2">
							<p className="text-lg font-semibold text-zinc-900">Personal</p>
							<div className="flex gap-4 mt-2">
								<p className="inline-flex items-center gap-2 px-2 py-1 uppercase rounded select-none text-zinc-500 bg-zinc-100">
									<QueueListIcon className="w-5 h-5" />
									6/14 tasks
								</p>
								<p className="inline-flex items-center gap-2 px-2 py-1 uppercase rounded select-none text-zinc-500 bg-zinc-100">
									<TimerIcon className="w-5 h-5" />
									21:23:07
								</p>
							</div>
						</div>
					</div>
					<FocusPeriod />
					<div className="pt-2 mt-4">
						<TaskListSection title={'Tasks'} />
					</div>
				</div>
			</div>
			<div className="flex-1 p-2">
				<TaskListSection title={'Work'} />
				<TaskListSection title={'Personal'} />
			</div>
		</div>
	);
}
