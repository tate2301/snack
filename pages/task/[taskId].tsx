import { ArrowLeftIcon, PauseIcon, PlayIcon } from '@heroicons/react/20/solid';
import {
	BoltIcon,
	ClockIcon,
	ExclamationCircleIcon,
	PlusIcon,
	ViewfinderCircleIcon,
} from '@heroicons/react/24/outline';
import { useRouter } from 'next/router';

export default function Task() {
	return (
		<main className="h-full w-full flex flex-col justify-between overflow-y-auto">
			<div>
				<div className="px-4 py-2">
					<BackButton />
				</div>
				<TaskHeader />
			</div>
			<div className="flex flex-col gap-4 flex-1 mt-4">
				<div className="py-4 grid grid-cols-2 gap-8">
					<div className="bg-zinc-50 p-4 rounded-xl">
						<div>
							<div className="flex gap-4 items-center">
								<button className="flex gap-4 items-center text-white bg-purple-600 p-2 rounded-full opacity-0 md:opacity-100 transition-all duration-200">
									<PlayIcon className="w-4 h-4" />
								</button>
							</div>
							<p className="text-xl font-semibold mt-2">00:00:00</p>
						</div>
						<p className="text-sm text-zinc-500 mt-4">00:00:00 total</p>
					</div>
					<div className="items-center flex w-full justify-center gap-8"></div>
				</div>
				<div className="p-4 rounded-xl bg-zinc-50">
					<div className="flex justify-between items-baseline text-sm">
						<p>Subtasks Queue</p>
					</div>
					<div className="mt-2 flex flex-col gap-2">
						<div className="items-start flex gap-4">
							<div className="w-4 h-4 mt-3 p-0.5 border-2 border-blue-600 rounded">
								<div className="animate-pulse h-full rounded w-full bg-blue-600" />
							</div>
							<div className="flex-1 items-start py-2 flex justify-between border-b">
								<p className="text-sm">Fix the issue with loading fonts</p>
								<div className="flex flex-shrink-0 gap-4 items-center">
									<p className="text-sm">00:20:00</p>
									<button className="p-1 text-red-600">
										<PauseIcon className="w-4 h-4" />
									</button>
								</div>
							</div>
						</div>
						<div className="items-start flex gap-4">
							<input
								type="checkbox"
								className="w-4 h-4 mt-3"
							/>
							<div className="flex-1 items-start py-2 flex justify-between border-b">
								<p className="text-sm">
									Join discovery call with Chris and take feedback
								</p>
								<div className="flex flex-shrink-0 gap-4 items-center">
									<p className="text-sm text-zinc-500">00:00:00</p>
									<button className="p-1 text-zinc-500">
										<PlayIcon className="w-4 h-4" />
									</button>
								</div>
							</div>
						</div>
					</div>
					<button className="flex text-blue-600 text-sm items-center gap-2 mt-2">
						<span className="p-2 rounded-full">
							<PlusIcon className="w-4 h-4" />
						</span>
						Add Subtask
					</button>
				</div>
			</div>
		</main>
	);
}

function TaskHeader({}) {
	return (
		<div className="p-4 border-b">
			<div className="flex gap-4 items-start">
				<input
					type="checkbox"
					className="w-4 h-4 rounded-xl mt-1"
				/>
				<div className="w-full flex pb-2 justify-between items-start gap-8">
					<div className="flex flex-col flex-1 max-w-sm">
						<p className="flex gap-2 font-semibold">
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
							<span className="flex items-center gap-2 text-blue-500">
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
			className="py-1"
			onClick={router.back}>
			<ArrowLeftIcon className="w-5 h-5" />
		</button>
	);
}
