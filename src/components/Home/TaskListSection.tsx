import React from "react";

import {
	ChevronDownIcon,
	ChevronRightIcon,
	PlusIcon,
} from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';
import { TaskSection } from './types';
import useToggle from '../../hooks/useToggle';
import { DndContext } from '@dnd-kit/core';

export default function TaskListSection(props: TaskSection) {
	const [headerIsExpanded, toggleHeaderIsExpanded] = useToggle(true);

	return (
		<div className="mb-2">
			<TaskSectionHeader
				title={props.title}
				isExpanded={headerIsExpanded}
				toggle={toggleHeaderIsExpanded}
			/>
			{headerIsExpanded && (
				<motion.div
					initial={{
						height: 0,
						opacity: 0,
					}}
					animate={{
						height: 'auto',
						opacity: 1,
						marginBottom: '1rem',
					}}
					exit={{
						height: 0,
						opacity: 0,
						marginBottom: 0,
					}}
					transition={{
						duration: 0.1,
					}}
					className="flex flex-col gap-1">
					<DndContext></DndContext>
				</motion.div>
			)}
		</div>
	);
}

export function TaskSectionHeader({
	title,
	isExpanded,
	toggle,
}: {
	title: string;
	isExpanded: boolean;
	toggle: () => void;
}) {
	return (
		<div
			onClick={toggle}
			className="flex w-full justify-between items-center  hover:bg-zinc-200 bg-surface-1 mb-1 shadow rounded-xl pr-2 py-0.5 cursor-pointer">
			<button className="inline-flex items-center flex-1 w-full gap-2 px-4 py-2 font-semibold text-zinc-500">
				{isExpanded ? (
					<ChevronDownIcon className="w-4 h-4" />
				) : (
					<ChevronRightIcon className="w-4 h-4" />
				)}
				<p className="block text-left text-surface-12">
					🔥 {title} <span className="uppercase text-surface-10">(6/14)</span>
				</p>
			</button>
			<button className="p-1 rounded hover:bg-zinc-100 text-zinc-500">
				<PlusIcon className="w-5 h-5" />
			</button>
		</div>
	);
}