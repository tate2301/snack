import { Menu, Popover } from '@headlessui/react';
import { PlusIcon } from '@heroicons/react/20/solid';

export default function CreateItemMenu() {
	return (
		<Popover>
			<Popover.Button className={'py-1 text-zinc-900  flex items-center gap-2'}>
				<p className="p-1 bg-zinc-900 text-white rounded-full">
					<PlusIcon className="w-4 h-4" />
				</p>
				New Item
			</Popover.Button>
			<Popover.Panel
				className={
					'p-2 max-w-fit text-left rounded-xl min-w-[180px] bg-white shadow-2xl flex flex-col'
				}>
				<button className="py-2 px-4 text-left rounded-lg  text-zinc-800 hover:bg-zinc-50">
					Task
				</button>
				<button className="py-2 px-4 text-left rounded-lg  text-zinc-800 hover:bg-zinc-50">
					Timed Task
				</button>
			</Popover.Panel>
		</Popover>
	);
}
