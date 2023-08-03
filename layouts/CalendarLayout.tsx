import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/solid';
import WeekView from '../components/calendar/WeekView';
import NavigationSidebar from '../components/nav/SidebarNavigation';

export default function CalendarLayout(props) {
	return (
		<div className="flex flex-col h-full overflow-y-hidden ">
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
					'w-full flex flex-1 flex-grow-0 items-start divide-x h-[calc(100vh-3rem)]'
				}>
				<NavigationSidebar />
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
