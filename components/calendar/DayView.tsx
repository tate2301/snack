/* This example requires Tailwind CSS v2.0+ */
import { Fragment, useEffect, useRef } from 'react';
import {
	ChevronDownIcon,
	ChevronLeftIcon,
	ChevronRightIcon,
} from '@heroicons/react/24/solid';
import { Menu, Transition } from '@headlessui/react';
import { EllipsisHorizontalIcon } from '@heroicons/react/24/outline';
import HorizontalLines from './canvas/HorizontalLines';

const days = [
	{ date: '2021-12-27' },
	{ date: '2021-12-28' },
	{ date: '2021-12-29' },
	{ date: '2021-12-30' },
	{ date: '2021-12-31' },
	{ date: '2022-01-01', isCurrentMonth: true },
	{ date: '2022-01-02', isCurrentMonth: true },
	{ date: '2022-01-03', isCurrentMonth: true },
	{ date: '2022-01-04', isCurrentMonth: true },
	{ date: '2022-01-05', isCurrentMonth: true },
	{ date: '2022-01-06', isCurrentMonth: true },
	{ date: '2022-01-07', isCurrentMonth: true },
	{ date: '2022-01-08', isCurrentMonth: true },
	{ date: '2022-01-09', isCurrentMonth: true },
	{ date: '2022-01-10', isCurrentMonth: true },
	{ date: '2022-01-11', isCurrentMonth: true },
	{ date: '2022-01-12', isCurrentMonth: true, isToday: true },
	{ date: '2022-01-13', isCurrentMonth: true },
	{ date: '2022-01-14', isCurrentMonth: true },
	{ date: '2022-01-15', isCurrentMonth: true },
	{ date: '2022-01-16', isCurrentMonth: true },
	{ date: '2022-01-17', isCurrentMonth: true },
	{ date: '2022-01-18', isCurrentMonth: true },
	{ date: '2022-01-19', isCurrentMonth: true },
	{ date: '2022-01-20', isCurrentMonth: true },
	{ date: '2022-01-21', isCurrentMonth: true },
	{ date: '2022-01-22', isCurrentMonth: true, isSelected: true },
	{ date: '2022-01-23', isCurrentMonth: true },
	{ date: '2022-01-24', isCurrentMonth: true },
	{ date: '2022-01-25', isCurrentMonth: true },
	{ date: '2022-01-26', isCurrentMonth: true },
	{ date: '2022-01-27', isCurrentMonth: true },
	{ date: '2022-01-28', isCurrentMonth: true },
	{ date: '2022-01-29', isCurrentMonth: true },
	{ date: '2022-01-30', isCurrentMonth: true },
	{ date: '2022-01-31', isCurrentMonth: true },
	{ date: '2022-02-01' },
	{ date: '2022-02-02' },
	{ date: '2022-02-03' },
	{ date: '2022-02-04' },
	{ date: '2022-02-05' },
	{ date: '2022-02-06' },
];

function classNames(...classes) {
	return classes.filter(Boolean).join(' ');
}

export default function DayView() {
	const container = useRef(null);
	const containerNav = useRef(null);
	const containerOffset = useRef(null);

	useEffect(() => {
		// Set the container scroll position based on the current time.
		const currentMinute = new Date().getHours() * 60;
		container.current.scrollTop =
			((container.current.scrollHeight -
				containerNav.current.offsetHeight -
				containerOffset.current.offsetHeight) *
				currentMinute) /
			1440;
	}, []);

	return (
		<div className="flex flex-col w-full h-full">
			<div className="flex flex-auto overflow-hidden bg-white">
				<div
					ref={container}
					className="flex flex-col flex-auto overflow-auto">
					<div
						ref={containerNav}
						className="sticky top-0 z-10 grid flex-none grid-cols-7 text-xs text-gray-500 bg-white shadow ring-1 ring-black ring-opacity-5 md:hidden">
						<button
							type="button"
							className="flex flex-col items-center pt-3 pb-1.5">
							<span>W</span>
							{/* Default: "text-gray-900", Selected: "bg-gray-900 text-white", Today (Not Selected): "text-indigo-600", Today (Selected): "bg-indigo-600 text-white" */}
							<span className="flex items-center justify-center w-8 h-8 mt-3 text-base font-semibold text-gray-900 rounded-full">
								19
							</span>
						</button>
						<button
							type="button"
							className="flex flex-col items-center pt-3 pb-1.5">
							<span>T</span>
							<span className="flex items-center justify-center w-8 h-8 mt-3 text-base font-semibold text-indigo-600 rounded-full">
								20
							</span>
						</button>
						<button
							type="button"
							className="flex flex-col items-center pt-3 pb-1.5">
							<span>F</span>
							<span className="flex items-center justify-center w-8 h-8 mt-3 text-base font-semibold text-gray-900 rounded-full">
								21
							</span>
						</button>
						<button
							type="button"
							className="flex flex-col items-center pt-3 pb-1.5">
							<span>S</span>
							<span className="flex items-center justify-center w-8 h-8 mt-3 text-base font-semibold text-white bg-gray-900 rounded-full">
								22
							</span>
						</button>
						<button
							type="button"
							className="flex flex-col items-center pt-3 pb-1.5">
							<span>S</span>
							<span className="flex items-center justify-center w-8 h-8 mt-3 text-base font-semibold text-gray-900 rounded-full">
								23
							</span>
						</button>
						<button
							type="button"
							className="flex flex-col items-center pt-3 pb-1.5">
							<span>M</span>
							<span className="flex items-center justify-center w-8 h-8 mt-3 text-base font-semibold text-gray-900 rounded-full">
								24
							</span>
						</button>
						<button
							type="button"
							className="flex flex-col items-center pt-3 pb-1.5">
							<span>T</span>
							<span className="flex items-center justify-center w-8 h-8 mt-3 text-base font-semibold text-gray-900 rounded-full">
								25
							</span>
						</button>
					</div>
					<div className="flex flex-auto w-full">
						<div className="flex-none bg-white w-14 ring-1 ring-gray-100" />
						<div className="grid flex-auto grid-cols-1 grid-rows-1">
							{/* Horizontal lines */}
							<HorizontalLines containerOffset={containerOffset} />
							{/* Events */}
							<ol
								className="grid grid-cols-1 col-start-1 col-end-2 row-start-1"
								style={{
									gridTemplateRows: '1.75rem repeat(288, minmax(0, 1fr)) auto',
								}}>
								<li
									className="relative flex mt-px"
									style={{ gridRow: '74 / span 12' }}>
									<a
										href="#"
										className="absolute flex flex-col p-2 overflow-y-auto text-xs leading-5 rounded-lg group inset-1 bg-blue-50 hover:bg-blue-100">
										<p className="order-1 font-semibold text-blue-700">
											Breakfast
										</p>
										<p className="text-blue-500 group-hover:text-blue-700">
											<time dateTime="2022-01-22T06:00">6:00 AM</time>
										</p>
									</a>
								</li>
								<li
									className="relative flex mt-px"
									style={{ gridRow: '92 / span 30' }}>
									<a
										href="#"
										className="absolute flex flex-col p-2 overflow-y-auto text-xs leading-5 rounded-lg group inset-1 bg-pink-50 hover:bg-pink-100">
										<p className="order-1 font-semibold text-pink-700">
											Flight to Paris
										</p>
										<p className="order-1 text-pink-500 group-hover:text-pink-700">
											John F. Kennedy International Airport
										</p>
										<p className="text-pink-500 group-hover:text-pink-700">
											<time dateTime="2022-01-22T07:30">7:30 AM</time>
										</p>
									</a>
								</li>
								<li
									className="relative flex mt-px"
									style={{ gridRow: '134 / span 18' }}>
									<a
										href="#"
										className="absolute flex flex-col p-2 overflow-y-auto text-xs leading-5 rounded-lg group inset-1 bg-indigo-50 hover:bg-indigo-100">
										<p className="order-1 font-semibold text-indigo-700">
											Sightseeing
										</p>
										<p className="order-1 text-indigo-500 group-hover:text-indigo-700">
											Eiffel Tower
										</p>
										<p className="text-indigo-500 group-hover:text-indigo-700">
											<time dateTime="2022-01-22T11:00">11:00 AM</time>
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
