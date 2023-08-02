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
import {
	ChevronLeftIcon,
	ChevronRightIcon,
	XMarkIcon,
} from '@heroicons/react/20/solid';
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
		<div className="flex flex-col h-screen overflow-y-hidden pb-12">
			<nav className="flex items-center justify-between flex-shrink-0 w-full h-12  bg-zinc-950 text-white border-b ">
				<p className=" px-3 rounded-lg text-sm font-semibold uppercase p-2">
					DEV
				</p>
				<div className="flex">
					<button className="p-4 hover:bg-zinc-100">
						<span className="w-4 h-4 border rounded-full" />
					</button>
					<button className="p-4 hover:bg-zinc-100">
						<span className="w-4 h-4 border rounded-full" />
					</button>
					<button className="p-4 hover:bg-zinc-100">
						<span className="w-4 h-4 border rounded-full" />
					</button>
				</div>
			</nav>
			<div
				className={
					'w-full flex flex-1 flex-grow-0 items-start divide-x h-full'
				}>
				<div
					className={
						'w-96 overflow-y-auto h-full bg-white z-10 flex-grow-0 flex gap-1 divide-x'
					}>
					<div className="sticky flex flex-col justify-between flex-shrink-0 h-screen gap-4 p-2 pt-8">
						<div className="flex flex-col gap-4">
							<button className="p-1 text-white bg-purple-600 rounded-lg">
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
					<div className="flex-1 overflow-y-auto flex flex-col justify-between h-full">
						<div></div>
						<div className="p-4">
							<CalendarPreview />
						</div>
					</div>
				</div>
				<div
					className={
						'flex-1 flex flex-col justify-between h-full bg-zinc-50 border-zinc-200 w-full overflow-clip'
					}>
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
							className={
								'border-b w-full justify-between flex gap-2 py-2 px-2'
							}>
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
									<button className={'text-sm px-3 rounded-lg py-1'}>
										Week
									</button>

									<button className={'text-sm px-3 rounded-lg py-1'}>
										Month
									</button>
								</div>
							</div>
						</div>
					</div>

					<WeekView />
				</div>
				<div className={'w-auto overflow-y-auto h-full bg-white z-10'}>
					{props.children}
				</div>
			</div>
		</div>
	);
}
