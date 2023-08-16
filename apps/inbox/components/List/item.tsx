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
import clsx from 'clsx';

function InboxListItem({}) {
	return <InboxListItemController id={generateUUID()} />;
}

function InboxListItemController({ id }) {
	const { isOpen, onOpen, onClose } = useDisclosure();

	const { attributes, listeners, setNodeRef, transform, isDragging } =
		useDraggable({
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
				{...{ attributes, listeners, setNodeRef, transform, style, isDragging }}
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
			className={clsx(
				'flex gap-4 py-2 pl-2 pr-4 hover:bg-surface-2 rounded-xl group',
				props.isDragging && 'fixed z-20 shadow-xl',
			)}>
			<div className="flex-1">
				<div className="flex items-baseline justify-between">
					<p className="font-semibold">Design Trivia</p>
					<div className="flex flex-shrink-0 gap-2 inset-1">
						<button className="right-0 p-2 bg-white rounded-xl text-zinc-400 group-hover:text-zinc-800 dark:bg-zinc-800 dark:text-zinc-300">
							<ArchiveBoxIcon className={'w-4 h-4'} />
						</button>
						<button
							onClick={props.onExpand}
							className="right-0 p-2 bg-white rounded-xl text-zinc-400 group-hover:text-zinc-800 dark:bg-zinc-800 dark:text-zinc-300">
							<ArrowsExpand className={'w-4 h-4'} />
						</button>
					</div>
				</div>
				<div className="mt-1">
					<p className="text-zinc-600">
						We need to figure out what inbox will look like
					</p>
				</div>

				<div className="flex items-center gap-2 mt-1 text-zinc-500">
					<p className="flex px-2 py-0.5 text-sm font-semibold uppercase bg-white rounded shadow-sm w-fit">
						<ArrowPathIcon className="w-4 h-4 mr-2 text-zinc-400" />
						Repeats yearly
					</p>
					<button className="px-2 text-sm py-0.5 shadow-sm inline-flex gap-2 items-center bg-white rounded uppercase text-zinc-500">
						Gmail <ExternalLink className="w-4 h-4" />
					</button>
				</div>
			</div>
		</li>
	);
}

export default InboxListItem;
