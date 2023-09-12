import { ArrowLeftIcon, PauseIcon, PlayIcon } from '@heroicons/react/20/solid';
import {
	CameraIcon,
	ChevronLeftIcon,
	ClockIcon,
	PlusIcon,
	StarIcon,
} from '@heroicons/react/24/outline';
import CalendarLayout from '../../layouts/CalendarLayout';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import { selectTaskById } from '../../redux/tasks';
import PageHeader from '../../components/nav/PageHeader';
import TrashIcon from '../../icons/TrashIcon';
import SelectList from '../../components/create/SelectList';
import {
	addTaskToList,
	removeTaskFromList,
	selectListByTaskId,
} from '../../redux/lists';
import { useCallback } from 'react';

export default function TaskPage() {
	const { id } = useParams();
	const dispatch = useAppDispatch();

	const task = useAppSelector(selectTaskById(id));
	const list = useAppSelector(selectListByTaskId(id));

	const onListChanged = useCallback(
		(listId) => {
			dispatch(removeTaskFromList({ listId: list.id, taskId: id }));
			dispatch(addTaskToList({ listId, taskId: id }));
		},
		[list, id],
	);

	return (
		<CalendarLayout>
			<PageHeader>
				<div className="w-full flex justify-between">
					<div className="flex gap-4 items-center">
						<BackButton />
						<h1 className="font-semibold text-zinc-900">{task.title}</h1>
					</div>
					<div className="flex gap-2">
						<button className="p-2 h-full flex items-center px-2 hover:bg-zinc-900/10 py-1 rounded-lg leading-none">
							Share
						</button>
						<button className="hover:bg-zinc-900/10 flex items-center px-2 py-1 rounded-lg">
							<StarIcon className="w-6 h-6" />
						</button>
						<button className="hover:bg-zinc-900/10 flex items-center px-3 py-2 rounded-lg leading-none">
							<TrashIcon className="w-5 h-5" />
						</button>
					</div>
				</div>
			</PageHeader>
			<main className="flex flex-col justify-between w-full h-full overflow-y-auto max-w-screen-lg">
				<div className="mt-8">
					<div className="flex gap-4 mb-4">
						<button className="px-4 rounded-xl py-1 bg-zinc-900/5">
							<CameraIcon className="w-5 h-5" />
							Cover
						</button>
						<p className="rounded-xl bg-surface-1 border border-zinc-400/40 shadow-sm hover:bg-shadow">
							<SelectList
								onChange={onListChanged}
								defaultListId={list.id}
							/>
						</p>
					</div>
					<h1 className="text-3xl font-semibold text-zinc-900">{task.title}</h1>
				</div>

				<div className="flex flex-col flex-1 gap-4 mt-4">
					<div className="flex items-baseline justify-between font-semibold">
						<p>Subtasks Queue (10)</p>
					</div>
					<div className="flex flex-col gap-2">
						<div className="flex items-center gap-2">
							<input
								type="checkbox"
								className="w-4 h-4"
							/>
							<div className="flex items-start justify-between flex-1">
								<p>Join discovery call with Chris and take feedback</p>
								<div className="flex items-center flex-shrink-0 gap-4">
									<p className="text-zinc-500 uppercase">00:00:00</p>
									<button className="p-1 text-zinc-500">
										<PlayIcon className="w-5 h-5" />
									</button>
								</div>
							</div>
						</div>
					</div>
					<button className="flex items-center gap-2 mt-2 font-semibold bg-zinc-900/5 hover:bg-zinc-900/10 w-fit rounded-xl pr-6 text-zinc-900">
						<span className="p-2 rounded-full">
							<PlusIcon className="w-4 h-4" />
						</span>
						Add Subtask
					</button>
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

export function BackButton() {
	const navigate = useNavigate();

	return (
		<button
			onClick={() => navigate(-1)}
			className="p-1 hover:bg-zinc-900/10 px-2 py-1 rounded-lg">
			<ChevronLeftIcon className="w-5 h-5" />
		</button>
	);
}
