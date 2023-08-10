import { ArchiveBoxIcon } from '@heroicons/react/24/outline';
import TimerIcon from '../../../../icons/Timer';
import ArrowsExpand from '../../../../icons/ArrowsExpand';
import {
	ArrowPathIcon,
	CheckCircleIcon,
	CheckIcon,
	ExclamationTriangleIcon,
} from '@heroicons/react/20/solid';
import ExternalLink from '../../../../icons/ExternalLink';
import useDisclosure from '../../../../hooks/useDisclosure';
import InboxItemModal from '../modals/InboxItemModal';
import { InboxPresenterItemProps } from './types';
import {
	KeyboardSensor,
	PointerSensor,
	useDraggable,
	useSensor,
	useSensors,
} from '@dnd-kit/core';

import { generateUUID } from '../../../../lib/functions';

function InboxListItem({}) {
	return <InboxListItemController id={generateUUID()} />;
}

function InboxListItemController({ id }) {
	const { isOpen, onOpen, onClose } = useDisclosure();

	const { attributes, listeners, setNodeRef, transform } = useDraggable({
		id: 'draggable',
	});
	const style = transform
		? {
				transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
		  }
		: undefined;

	return (
		<>
			<InboxItemModal
				isOpen={isOpen}
				onClose={onClose}>
				<p></p>
			</InboxItemModal>
			<InboxListItemPresenter
				{...{ attributes, listeners, setNodeRef, transform, style }}
				onExpand={onOpen}
			/>
		</>
	);
}

function InboxListItemPresenter(props: InboxPresenterItemProps) {
	return (
		<li
			ref={props.setNodeRef}
			style={props.style}
			{...props.listeners}
			{...props.attributes}
			className="flex gap-4 py-2 pl-2 pr-4 hover:bg-zinc-200 rounded-xl group">
			<p className="mt-2 ml-1">
				<button className="p-1 text-white bg-red-600 rounded-lg">
					<ExclamationTriangleIcon className="w-5 h-5 " />
				</button>
			</p>

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
			</div>
		</li>
	);
}

export default InboxListItem;
