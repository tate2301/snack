import {
	ArchiveBoxIcon,
	ArrowRightIcon,
	ArrowUpRightIcon,
	ArrowUturnRightIcon,
	CalendarDaysIcon,
	CalendarIcon,
	ChevronLeftIcon,
	ChevronRightIcon,
	ExclamationCircleIcon,
	InboxIcon,
	PlusIcon,
	VideoCameraIcon,
} from '@heroicons/react/24/outline';
import TimerIcon from '../../../../icons/Timer';
import ArrowsExpand from '../../../../icons/ArrowsExpand';
import { ArrowPathIcon } from '@heroicons/react/24/solid';
import ExternalLink from '../../../../icons/ExternalLink';
import useDisclosure from '../../../../lib/hooks/useDisclosure';
import Modal from '../../../../components/ui/modal';
import InboxItemModal from '../modals/InboxItemModal';
import { InboxPresenterItemProps } from './types';

function InboxListItem({}) {
	return <InboxListItemController />;
}

function InboxListItemController({}) {
	const { isOpen, onOpen, onClose } = useDisclosure();
	return (
		<>
			<InboxItemModal
				isOpen={isOpen}
				onClose={onClose}>
				<p></p>
			</InboxItemModal>
			<InboxListItemPresenter onExpand={onOpen} />
		</>
	);
}

function InboxListItemPresenter(props: InboxPresenterItemProps) {
	return (
		<li className="flex gap-4 py-2 pl-2 pr-4 cursor-grab hover:bg-zinc-100 rounded-xl group">
			<div className="w-2 h-2 mt-4 bg-orange-600 rounded-full"></div>

			<div className="flex-1">
				<div className="flex items-baseline justify-between">
					<p className="font-semibold">Design Trivia</p>
					<div className="flex flex-shrink-0 gap-2">
						<button className="right-0 p-2 bg-white rounded-lg text-zinc-400 group-hover:text-zinc-800 dark:bg-zinc-800 dark:text-zinc-300">
							<TimerIcon className={'w-4 h-4'} />
						</button>
						<button className="right-0 p-2 bg-white rounded-lg text-zinc-400 group-hover:text-zinc-800 dark:bg-zinc-800 dark:text-zinc-300">
							<ArchiveBoxIcon className={'w-4 h-4'} />
						</button>
						<button
							onClick={props.onExpand}
							className="right-0 p-2 bg-white rounded-lg text-zinc-400 group-hover:text-zinc-800 dark:bg-zinc-800 dark:text-zinc-300">
							<ArrowsExpand className={'w-4 h-4'} />
						</button>
					</div>
				</div>
				<div className="mt-1">
					<p className="text-zinc-600">
						We need to figure out what inbox will look like
					</p>
				</div>
				<div className="mt-1">
					<p className="flex px-2 py-1 mt-2 text-sm font-semibold uppercase bg-white rounded-lg shadow-sm w-fit">
						<ArrowPathIcon className="w-4 h-4 mr-2 text-zinc-400" />
						Repeats yearly
					</p>
				</div>
				<div className="flex items-center gap-2 mt-1 text-zinc-500">
					<button className="text-sm font-bold uppercase px-2 rounded  py-0.5 bg-white shadow-sm text-zinc-500">
						03:30 PM - 04:00 PM
					</button>
					<button className="px-2 text-sm py-0.5 shadow-sm inline-flex gap-2 items-center bg-white rounded uppercase text-zinc-500">
						Google Meet <ExternalLink className="w-4 h-4" />
					</button>
				</div>
				<div className="grid grid-cols-8 gap-2 mt-2">
					<button className="flex justify-center py-2 transition-all rounded-xl hover:bg-white hover:shadow text-zinc-400 hover:text-zinc-800">
						<CalendarDaysIcon className="w-5 h-5" />
					</button>
					<button className="flex justify-center py-2 transition-all rounded-xl hover:bg-white hover:shadow text-zinc-400 hover:text-zinc-800">
						<TimerIcon className="w-5 h-5" />
					</button>
					<button className="flex justify-center py-2 transition-all rounded-xl hover:bg-white hover:shadow text-zinc-400 hover:text-zinc-800">
						<ExclamationCircleIcon className="w-5 h-5" />
					</button>
					<button className="flex justify-center py-2 transition-all rounded-xl hover:bg-white hover:shadow text-zinc-400 hover:text-zinc-800">
						<VideoCameraIcon className="w-5 h-5" />
					</button>
				</div>
			</div>
		</li>
	);
}

export default InboxListItem;
