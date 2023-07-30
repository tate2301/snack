/* This example requires Tailwind CSS v2.0+ */
import { Fragment, useEffect, useRef, useState } from 'react';
import {
	ChevronDownIcon,
	ChevronLeftIcon,
	ChevronRightIcon,
} from '@heroicons/react/24/solid';
import { Menu, Transition } from '@headlessui/react';
import { EllipsisHorizontalIcon } from '@heroicons/react/24/outline';
import useCalendarDates from '../../lib/hooks/useCalendarDates';
import {
	eachHourOfInterval,
	endOfToday,
	format,
	isEqual,
	startOfToday,
} from 'date-fns';
import clsx from 'clsx';
import useCurrentTime from '../../lib/hooks/useCurrentTime';

function classNames(...classes) {
	return classes.filter(Boolean).join(' ');
}

export default function WeekView() {
	const { week, nextWeek, prevWeek, selectDay, selectedDate } =
		useCalendarDates(startOfToday());
	const currentTime = useCurrentTime();
	const container = useRef(null);
	const containerNav = useRef(null);
	const containerOffset = useRef(null);
	const [timePosition, setTimePosition] = useState(0);

	const timeIntervals = eachHourOfInterval(
		{
			start: startOfToday(),
			end: endOfToday(),
		},
		{
			step: 1,
		},
	);

	const remToPx = (rem) => {
		return (
			rem * parseFloat(getComputedStyle(document.documentElement).fontSize)
		);
	};

	useEffect(() => {
		// Set the container scroll position based on the current time.
		const currentMinute = currentTime.getHours() * 60;
		const blockHeight = remToPx(4);

		container.current.scrollTop =
			(currentMinute / 1380) * 2688 - 2 * blockHeight;
	}, []);

	useEffect(() => {
		const calendarHeight = container.current.scrollHeight;
		const blockHeight = remToPx(4);

		const gridHeight =
			calendarHeight -
			containerNav.current.offsetHeight -
			containerOffset.current.offsetHeight;
		const currentMinute = currentTime.getHours() * 60;
		setTimePosition((currentMinute / 1380) * gridHeight + blockHeight / 2);
	}, [currentTime]);

	return (
		<div className="flex flex-col w-full h-full">
			<div
				ref={container}
				className="flex flex-col flex-auto overflow-auto bg-white">
				<div
					style={{ width: '165%' }}
					className="flex flex-col flex-none max-w-full sm:max-w-none md:max-w-full">
					<div
						ref={containerNav}
						className="sticky top-0 z-30 flex-none bg-white shadow ring-1 ring-black ring-opacity-5 sm:pr-8">
						<div className="grid grid-cols-7 text-sm leading-6 text-gray-500 sm:hidden"></div>

						<div className="hidden grid-cols-7 -mr-px text-sm leading-6 border-r border-gray-100 divide-x divide-gray-100 text-zinc-500 sm:grid">
							<div className="w-16 col-end-1" />
							{week.map((day, weekIdx) => (
								<button
									key={`week-day-${weekIdx}`}
									type="button"
									className="flex flex-col items-center py-2 text-gray-500">
									<span>{format(day, 'EEE')}</span>
									<span
										className={clsx(
											'flex items-start justify-center font-semibold p-1 rounded-lg uppercase',
											isEqual(startOfToday(), day) &&
												'bg-purple-600 text-white px-2',
										)}>
										{format(day, 'dd')}
									</span>
								</button>
							))}
						</div>
					</div>
					<div className="relative flex flex-auto">
						<div
							className="absolute left-0 z-20 w-full gap-2 border-none"
							style={{ top: `${timePosition}px` }}>
							<p className="flex items-center flex-shrink-0 w-full  after:w-auto after:flex-1 after:h-0.5 after:bg-purple-600 text-purple-600">
								<span className="p-1 pr-2 text-xs font-semibold uppercase bg-white rounded">
									{Intl.DateTimeFormat('en-US', {
										hour: 'numeric',
										minute: 'numeric',
									}).format(new Date())}
								</span>
							</p>
						</div>
						<div className="sticky left-0 z-10 flex-none w-16 bg-white ring-1 ring-gray-100" />
						<div className="grid flex-auto grid-cols-1 grid-rows-1">
							{/* Horizontal lines */}
							<div
								className="grid col-start-1 col-end-2 row-start-1 uppercase divide-y divide-gray-100 "
								style={{ gridTemplateRows: 'repeat(48, minmax(4rem, 1fr))' }}>
								<div
									ref={containerOffset}
									className="row-end-1 h-7"></div>

								{timeIntervals.map((time, idx) => (
									<>
										<div key={`time-${idx}`}>
											<div className="sticky left-0 z-20 -mt-2.5 -ml-14 w-16 pr-4 text-right text-xs leading-5 text-gray-400">
												{currentTime.getHours() === time.getHours()
													? currentTime.getMinutes() > 15 &&
													  format(time, 'hh:mm')
													: format(time, 'hh:mm')}
											</div>
										</div>
										<div />
									</>
								))}
							</div>

							{/* Vertical lines */}
							<div className="hidden grid-cols-7 col-start-1 col-end-2 grid-rows-1 row-start-1 divide-x divide-gray-100 sm:grid sm:grid-cols-7">
								<div className="col-start-1 row-span-full" />
								<div className="col-start-2 row-span-full" />
								<div className="col-start-3 row-span-full" />
								<div className="col-start-4 row-span-full" />
								<div className="col-start-5 row-span-full" />
								<div className="col-start-6 row-span-full" />
								<div className="col-start-7 row-span-full" />
								<div className="w-8 col-start-8 row-span-full" />
							</div>

							{/* Events */}
							<ol
								className="grid grid-cols-1 col-start-1 col-end-2 row-start-1 sm:grid-cols-7 sm:pr-8"
								style={{
									gridTemplateRows: '1.75rem repeat(288, minmax(0, 1fr)) auto',
								}}>
								<li
									className="relative flex mt-px sm:col-start-3"
									style={{ gridRow: '74 / span 12' }}>
									<a
										href="#"
										className="absolute flex flex-col p-2 overflow-y-auto text-xs leading-5 rounded-lg group inset-1 bg-purple-50 hover:bg-purple-100">
										<p className="order-1 font-semibold text-purple-700">
											Breakfast
										</p>
										<p className="text-purple-500 group-hover:text-purple-700">
											<time dateTime="2022-01-12T06:00">6:00 AM</time>
										</p>
									</a>
								</li>
								<li
									className="relative flex mt-px sm:col-start-3"
									style={{ gridRow: '92 / span 30' }}>
									<a
										href="#"
										className="absolute flex flex-col p-2 overflow-y-auto text-xs leading-5 rounded-lg group inset-1 bg-pink-50 hover:bg-pink-100">
										<p className="order-1 font-semibold text-pink-700">
											Flight to Paris
										</p>
										<p className="text-pink-500 group-hover:text-pink-700">
											<time dateTime="2022-01-12T07:30">7:30 AM</time>
										</p>
									</a>
								</li>
								<li
									className="relative hidden mt-px sm:col-start-6 sm:flex"
									style={{ gridRow: '122 / span 24' }}>
									<a
										href="#"
										className="absolute flex flex-col p-2 overflow-y-auto text-xs leading-5 bg-gray-100 rounded-lg group inset-1 hover:bg-gray-200">
										<p className="order-1 font-semibold text-gray-700">
											Meeting with design team at Disney
										</p>
										<p className="text-gray-500 group-hover:text-gray-700">
											<time dateTime="2022-01-15T10:00">10:00 AM</time>
										</p>
									</a>
								</li>
							</ol>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
