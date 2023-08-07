import { CalendarView } from '../types';

export type CalendarEventsProps = {
	view: CalendarView;
};

const CalendarEvents = (props: CalendarEventsProps) => {
	return (
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
					className="absolute flex flex-col p-2 overflow-y-auto text-xs leading-5 rounded-lg group inset-1 bg-zinc-50 hover:bg-zinc-100">
					<p className="order-1 font-semibold text-zinc-700">Breakfast</p>
					<p className="text-zinc-700 group-hover:text-zinc-700">
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
					<p className="order-1 font-semibold text-pink-700">Flight to Paris</p>
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
	);
};

export default CalendarEvents;
