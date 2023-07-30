import { useEffect, useRef, useState } from 'react';
import clsx from 'clsx';
import {
	AdjustmentsHorizontalIcon,
	ArrowPathIcon,
	ArrowsUpDownIcon,
	ChevronDownIcon,
	EnvelopeIcon,
	QueueListIcon,
} from '@heroicons/react/24/outline';
import { PlusIcon } from '@heroicons/react/24/outline';
import TaskItem from '../components/TaskItem';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid';
import {
	ClockIcon,
	CloudIcon,
	Cog6ToothIcon,
	PlayIcon,
} from '@heroicons/react/24/solid';
import WeekView from '../components/calendar/WeekView';
import DayView from '../components/calendar/DayView';
import CalendarPreview from '../components/calendar/CalendarPreview';

export default function CalendarLayout(props) {
	return (
		<div
			className={
				'w-full flex flex-1 flex-grow-0 items-start divide-x h-screen'
			}>
			<div
				className={
					'w-96 overflow-y-auto h-screen bg-white z-10 flex-grow-0 flex gap-1 divide-x'
				}>
				<div className="sticky flex flex-col justify-between flex-shrink-0 h-screen gap-4 p-2 pt-8">
					<div className="flex flex-col gap-4">
						<button className="p-1 text-white bg-blue-600 rounded-lg">
							<QueueListIcon className="w-6 h-6" />
						</button>
						<button className="p-1 rounded hover:bg-zinc-100 text-zinc-400">
							<EnvelopeIcon className="w-6 h-6" />
						</button>
					</div>
					<div className="flex flex-col gap-4">
						<button className="p-1 rounded-lg text-zinc-400 hover:bg-zinc-100">
							<Cog6ToothIcon className="w-6 h-6" />
						</button>
						<button className="p-1 rounded hover:bg-zinc-100 text-zinc-400">
							<CloudIcon className="w-6 h-6" />
						</button>
					</div>
				</div>
				<div className="flex-1 overflow-y-auto">
					<div className="sticky top-0 z-30 flex items-center justify-between h-12 px-4 bg-white bg-inherit">
						<div className="flex gap-2">
							<button className="px-2 py-1 font-semibold rounded hover:bg-zinc-50">
								Pending
							</button>
							<button className="px-2 py-1 rounded hover:bg-zinc-50 text-zinc-400">
								Complete
							</button>
						</div>
						<button className="p-2 rounded-xl hover:bg-zinc-100">
							<PlusIcon className={'w-5 h-5'} />
						</button>
					</div>
					<div className="px-4 py-2">
						<CalendarPreview />
					</div>
					<div className="p-2">
						<button className="inline-flex items-center w-full gap-4 px-4 py-2 font-mono text-sm font-semibold uppercase hover:bg-zinc-50 text-zinc-500">
							<ChevronDownIcon className="w-4 h-4" />
							Today
						</button>
						<div className="flex flex-col gap-1">
							<div className="flex items-center gap-4 px-4 py-1 transition-all rounded-lg hover:bg-zinc-50">
								<input
									className="mt-1 rounded-xl"
									type="checkbox"
								/>
								<p className="text-zinc-600">Build and deploy personal site</p>
							</div>
							<div className="flex items-center gap-4 px-4 py-1 transition-all rounded-lg hover:bg-zinc-50">
								<input
									className="mt-1 rounded-xl"
									type="checkbox"
								/>
								<p className="text-zinc-600">
									Contact the team about the new project
								</p>
							</div>
							<div className="flex items-center gap-4 px-4 py-1 transition-all rounded-lg hover:bg-zinc-50">
								<input
									className="mt-1 rounded-xl"
									type="checkbox"
								/>
								<p className="text-zinc-600">
									Ask for feedback on the new design
								</p>
							</div>
						</div>
					</div>
					<div className="p-2">
						<button className="inline-flex items-center w-full gap-4 px-4 py-2 font-mono text-sm font-semibold uppercase hover:bg-zinc-50 text-zinc-500">
							<ChevronDownIcon className="w-4 h-4" />
							Procrastination List
						</button>
						<div className="flex flex-col gap-1">
							<div className="flex items-start gap-4 py-1 pl-4 pr-2 transition-all rounded-lg hover:bg-zinc-50">
								<input
									className="mt-1 rounded-xl"
									type="checkbox"
								/>
								<p className="text-zinc-600">
									Ask for feedback on the new design
								</p>
								<button className="p-1 text-zinc-400">
									<ClockIcon className="w-4 h-4" />
								</button>
							</div>
							<div className="flex items-start gap-4 py-1 pl-4 pr-2 transition-all rounded-lg hover:bg-zinc-50">
								<input
									className="mt-1 rounded-xl"
									type="checkbox"
								/>
								<p className="text-zinc-600">
									Ask for feedback on the new design
								</p>
								<button className="p-1 text-zinc-400">
									<PlayIcon className="w-4 h-4" />
								</button>
							</div>
							<div className="flex items-start gap-4 py-1 pl-4 pr-2 transition-all rounded-lg hover:bg-zinc-50">
								<input
									className="mt-1 rounded-xl"
									type="checkbox"
								/>
								<p className="text-zinc-600">
									Ask for feedback on the new design
								</p>
								<button className="p-1 text-zinc-400">
									<ArrowPathIcon className="w-4 h-4" />
								</button>
							</div>
						</div>
					</div>
					<div className="p-2">
						<button className="inline-flex items-center w-full gap-4 px-4 py-2 font-mono text-sm font-semibold uppercase hover:bg-zinc-50 text-zinc-500">
							<ChevronDownIcon className="w-4 h-4" />
							Blocked
						</button>
						<div className="flex flex-col gap-1">
							<TaskItem id={2} />
							<TaskItem id={2} />
							<TaskItem id={2} />
							<button className="flex items-center gap-4 px-4 py-1 transition-all rounded-lg hover:bg-zinc-50">
								<PlusIcon className="w-4 h-4" />
								Add a task
							</button>
						</div>
					</div>
				</div>
			</div>
			<div
				className={
					'flex-1 flex flex-col justify-between h-screen bg-zinc-50 border-zinc-200 w-full overflow-clip'
				}>
				<nav className="flex items-center justify-between flex-shrink-0 w-full h-12 p-2 bg-white border-b">
					<p className="p-0.5 px-3 rounded-lg bg-blue-50 text-blue-600 text-sm font-semibold uppercase">
						DEV
					</p>
					<div className="flex">
						<button className="px-2 py-0.5">
							<span className="w-4 h-4 border rounded-full" />
						</button>
						<button className="px-2 py-0.5">
							<span className="w-4 h-4 border rounded-full" />
						</button>
						<button className="px-2 py-0.5">
							<span className="w-4 h-4 border rounded-full" />
						</button>
					</div>
				</nav>

				<div className="bg-white">
					<div className={'p-2 '}>
						<h1 className={'font-semibold text-xl'}>
							{Intl.DateTimeFormat('en-gb', {
								month: 'long',
								year: 'numeric',
							}).format(new Date())}{' '}
						</h1>
					</div>
					<div
						className={'border-b w-full justify-between flex gap-2 py-2 px-2'}>
						<div
							className={
								'w-auto flex-shrink-0 flex gap-1 p-2 rounded-tr-xl rounded-b-none border-b-0'
							}>
							<button
								className={
									'py-0.5 px-2 rounded font-semibold text-sm bg-zinc-100'
								}>
								+
							</button>
							<button
								className={
									'py-0.5 px-2 rounded text-sm font-semibold hover:bg-zinc-100'
								}>
								Activity
							</button>
						</div>
						<div className={'flex gap-4 items-center'}>
							<div className="flex gap-1">
								<button
									className={
										'text-sm bg-white hover:bg-zinc-100 rounded-lg px-3 py-1'
									}>
									<ChevronLeftIcon className="w-4 h-4" />
								</button>
								<button
									className={
										' text-sm bg-white hover:bg-zinc-100 rounded-lg px-3 py-1'
									}>
									Today
								</button>
								<button
									className={
										'text-sm bg-white hover:bg-zinc-100 rounded-lg px-3 py-1'
									}>
									<ChevronRightIcon className="w-4 h-4" />
								</button>
							</div>
							<div className="flex p-1 overflow-hidden bg-zinc-100 rounded-xl group">
								<button
									className={
										'text-sm bg-white drop-shadow rounded-lg  font-bold px-3 py-1'
									}>
									Day
								</button>
								<button className={'text-sm px-3 rounded-lg py-1'}>Week</button>

								<button className={'text-sm px-3 rounded-lg py-1'}>
									Month
								</button>
							</div>
						</div>
					</div>
				</div>

				<WeekView />
			</div>
			<div className={'w-auto overflow-y-auto h-screen bg-white z-10'}>
				<div className="sticky top-0 z-30 flex items-center justify-between h-12 px-4 border-b bg-inherit">
					<div className="flex gap-2">
						<button className="px-2 py-1 font-semibold rounded hover:bg-zinc-50">
							Task details
						</button>
					</div>
					<button className="p-2 rounded-xl hover:bg-zinc-100">
						<PlusIcon className={'w-5 h-5'} />
					</button>
				</div>
				{props.children}
			</div>
		</div>
	);
}

const DaysPreview = () => {
	const [cols, setCols] = useState(5);
	const ref = useRef<null | HTMLDivElement>();

	useEffect(() => {
		const e = ref.current;
		if (e) {
			e.addEventListener('wheel', (event) => {
				e.scrollLeft += event.deltaY;
			});
		}
	}, []);

	return (
		<div
			ref={ref}
			className={clsx('flex-1 flex w-full overflow-x-auto h-full')}>
			<DayView />

			{false &&
				new Array(cols).fill(0).map((_, idx) => (
					<DayPreview
						key={idx}
						day={idx}
					/>
				))}
		</div>
	);
};

const DayPreview = ({ day }) => {
	return (
		<div
			key={day}
			className={'flex items-center flex-col border-r  pt-2 max-h-full'}>
			<div
				className={
					'flex-1 flex flex-col justify-between relative w-full px-1 group'
				}>
				<div></div>
				<ActivityBar active={day === 2} />
			</div>
			<div className={'w-full border-t pt-2 px-2'}>
				<DayTimelinePreview active={day === 2} />
				<div
					className={
						'mt-2 flex uppercase sticky left-4 h-4 items-center gap-1 justify-center text-xs font-semibold text-zinc-400 pb-2'
					}>
					{new Intl.DateTimeFormat('en-gb', {
						weekday: 'short',
					}).format(new Date(2023, 7, day + 1))}
					<p
						className={clsx(
							'ml-0.5',
							day === 2 && 'px-1 py-0.5 bg-purple-600 text-white rounded',
						)}>
						{new Intl.DateTimeFormat('en-gb', {
							day: 'numeric',
						}).format(new Date(2023, 7, day + 1))}
					</p>
				</div>
			</div>
		</div>
	);
};

const DayTimelinePreview = ({ active }) => {
	return (
		<div className={'flex gap-4 w-full overflow-hidden'}>
			{new Array(24).fill(0).map((_, idx) => (
				<p
					className={clsx(
						'text-xs font-semibold w-[32px]',
						active ? 'text-zinc-950' : 'text-zinc-400',
					)}>
					{idx}:00
				</p>
			))}
		</div>
	);
};

const ActivityBar = ({ active }) => {
	const ref = useRef<null | HTMLDivElement>();
	const [count, setCount] = useState(0);

	useEffect(() => {
		const e = ref.current;
		if (e) {
			const width = 32 * 24;
			const elementCount = Math.floor(width / 8);
			setCount(elementCount);
		}
	}, []);

	return (
		<div
			ref={ref}
			className={'mt-1 mb-4 flex gap-1 h-12 items-baseline w-full'}>
			{new Array(count).fill(0).map((_, idx) => (
				<div
					className={clsx(
						'w-2 group-hover:bg-green-500 rounded-full transition-all duration-300',
						active ? 'bg-green-500' : 'bg-green-100',
					)}
					key={idx}
					style={{
						height: `${Math.random() * 100}%`,
					}}
				/>
			))}
		</div>
	);
};
