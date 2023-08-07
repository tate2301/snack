import { VideoCameraIcon } from '@heroicons/react/20/solid';
import CalendarIcon from '../../icons/CalendarIcon';

export default function Calendars() {
	return (
		<div>
			<div className="p-4 bg-stone-100 gap-4 flex flex-col">
				<p className="font-semibold text-zinc-900 uppercase">Calendars</p>
				<div className="p-4 rounded-xl bg-white shadow flex flex-col gap-2">
					<p className="font-semibold text-zinc-500 uppercase mb-2">
						Google Calendar
					</p>

					<div className=" flex justify-between items-center ">
						<div className="flex items-center gap-2">
							<CalendarIcon className="w-5 h-5" />
							<p>ICT 1.2</p>
						</div>
						<input
							className="accent-green-600"
							type="checkbox"
						/>
					</div>
					<div className=" flex justify-between items-center ">
						<div className="flex items-center gap-2">
							<CalendarIcon className="w-5 h-5" />
							<p>tatendachris@gmail.com</p>
						</div>
						<input
							className="accent-green-600"
							type="checkbox"
						/>
					</div>
				</div>
				<div className="p-4 rounded-xl bg-white shadow flex flex-col gap-2">
					<p className="font-semibold text-zinc-500 uppercase mb-2">Todoist</p>

					<div className=" flex justify-between items-center ">
						<div className="flex items-center gap-2">
							<CalendarIcon className="w-5 h-5" />
							<p>Data structures and algorithms</p>
						</div>
						<input
							className="accent-green-600"
							type="checkbox"
						/>
					</div>
					<div className=" flex justify-between items-center ">
						<div className="flex items-center gap-2">
							<CalendarIcon className="w-5 h-5" />
							<p>Personal</p>
						</div>
						<input
							className="accent-green-600"
							type="checkbox"
						/>
					</div>
					<div className=" flex justify-between items-center ">
						<div className="flex items-center gap-2">
							<CalendarIcon className="w-5 h-5" />
							<p>Daily life speedrun</p>
						</div>
						<input
							className="accent-green-600"
							type="checkbox"
						/>
					</div>
				</div>
			</div>
			<div className="p-4 flex flex-col gap-4">
				<div>
					<div className="flex justify-between items-baseline">
						<p className="uppercase text-zinc-900">Sunday</p>
						<p className="text-sm text-zinc-400">Aug 16, 2023</p>
					</div>
				</div>
				<div>
					<div className="flex justify-between items-baseline">
						<p className="uppercase text-zinc-900">Monday</p>
						<p className="text-sm text-zinc-400">Aug 17, 2023</p>
					</div>
					<div className="flex flex-col gap-2 mt-2">
						<div className="py-2 px-4 rounded-xl border border-zinc-100">
							<p className="uppercase inline-flex gap-4 items-center">
								<span>11:00 - 12:00</span>
								<VideoCameraIcon className="w-4 h-4 text-zinc-400" />
							</p>
							<p>Meeting with Tatenda</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
