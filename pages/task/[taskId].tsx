import { ArrowLeftIcon, PauseIcon, PlayIcon } from '@heroicons/react/20/solid';
import {
	BoltIcon,
	ClockIcon,
	ExclamationCircleIcon,
	PlusIcon,
	ViewfinderCircleIcon,
} from '@heroicons/react/24/outline';
import { useRouter } from 'next/router';
import CalendarLayout from '../../layouts/CalendarLayout';

export default function Task() {
	return (
		<CalendarLayout>
			<main className="flex flex-col justify-between w-full h-full overflow-y-auto">
				<div className="px-4 py-2">
					<BackButton />
				</div>
				<TaskHeader />
				<div className="flex flex-col flex-1 gap-4 mt-4">
					<div className="grid grid-cols-2 gap-8 py-4">
						<div className="p-4 bg-zinc-50 rounded-xl">
							<div>
								<div className="flex items-center gap-4">
									<button className="flex items-center gap-4 p-2 text-white transition-all duration-200 rounded-full opacity-0 bg-zinc-900 md:opacity-100">
										<PlayIcon className="w-4 h-4" />
									</button>
								</div>
								<p className="mt-2 text-xl font-medium">00:00:00</p>
							</div>
							<p className="mt-4 text-sm text-zinc-500">00:00:00 total</p>
						</div>
						<div className="flex items-center justify-center w-full gap-8"></div>
					</div>
					<div className="p-4 rounded-xl bg-zinc-50">
						<div className="flex items-baseline justify-between text-sm">
							<p>Subtasks Queue</p>
						</div>
						<div className="flex flex-col gap-2 mt-2">
							<div className="flex items-start gap-4">
								<div className="w-4 h-4 mt-3 p-0.5 border-2 border-zinc-900 rounded">
									<div className="w-full h-full rounded animate-pulse bg-zinc-900" />
								</div>
								<div className="flex items-start justify-between flex-1 py-2 border-b">
									<p className="text-sm">Fix the issue with loading fonts</p>
									<div className="flex items-center flex-shrink-0 gap-4">
										<p className="text-sm">00:20:00</p>
										<button className="p-1 text-red-600">
											<PauseIcon className="w-4 h-4" />
										</button>
									</div>
								</div>
							</div>
							<div className="flex items-start gap-4">
								<input
									type="checkbox"
									className="w-4 h-4 mt-3"
								/>
								<div className="flex items-start justify-between flex-1 py-2 border-b">
									<p className="text-sm">
										Join discovery call with Chris and take feedback
									</p>
									<div className="flex items-center flex-shrink-0 gap-4">
										<p className="text-sm text-zinc-500">00:00:00</p>
										<button className="p-1 text-zinc-500">
											<PlayIcon className="w-4 h-4" />
										</button>
									</div>
								</div>
							</div>
						</div>
						<button className="flex items-center gap-2 mt-2 text-sm text-zinc-900">
							<span className="p-2 rounded-full">
								<PlusIcon className="w-4 h-4" />
							</span>
							Add Subtask
						</button>
					</div>
				</div>
			</main>
		</CalendarLayout>
	);
}

function TaskHeader({}) {
	return (
		<div className="p-4 border-b">
			<div className="flex items-start gap-4">
				<input
					type="checkbox"
					className="w-4 h-4 mt-1 rounded-xl"
				/>
				<div className="flex items-start justify-between w-full gap-8 pb-2">
					<div className="flex flex-col flex-1 max-w-sm">
						<p className="flex gap-2 font-medium">
							<span className="mr-2 text-red-500">!!!</span>
							Configure Domain Name for the idea factory company
						</p>
						<p className="mt-2 text-sm text-zinc-400 line-clamp-2">
							Its crucial to get this done as soon as possible, we rely on it to
							get more funding. Which we can agree we critically need
						</p>
						<p className="mt-1 text-sm">
							<span className="mr-2">28/7/2023 12:00 PM</span>
							<span className="text-zinc-900">Due in 2 days</span>
						</p>
						<button className="mt-1 text-sm">
							<span className="flex items-center gap-2 text-zinc-700">
								<ClockIcon className="w-4 h-4" />1 hour before
							</span>
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}

function BackButton({}) {
	const router = useRouter();
	return (
		<button
			className="flex items-center gap-2 p-2 rounded-xl hover:bg-surface-1"
			onClick={router.back}>
			<ArrowLeftIcon className="w-5 h-5" />
			Back
		</button>
	);
}
