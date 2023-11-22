import React from 'react';

import { Command } from 'cmdk';
import useDisclosure from '../../hooks/useDisclosure';
import { useEffect } from 'react';

const CommandBar = () => {
	const { isOpen, onToggle } = useDisclosure();

	useEffect(() => {
		// TODO: Add event listener for keyboard shortcut
		const handleKeyDown = (event: KeyboardEvent) => {
			if (event.key === 'k') {
				onToggle();
				event.preventDefault();
			}
		};

		window.addEventListener('keydown', handleKeyDown);
	}, []);

	return (
		<Command.Dialog
			className="fixed top-0 left-0 z-50 flex items-center justify-center w-screen h-screen p-8 bg-zinc-900 bg-opacity-10"
			open={isOpen}
			onOpenChange={onToggle}>
			<div className="m-auto w-[32rem] rounded-xl shadow-xl bg-white overflow-hidden">
				<Command.Input
					className="w-full p-4 outline-none ring-0"
					placeholder="Search for anything in your workspace"
				/>

				<Command.List className="flex flex-col gap-4">
					<Command.Empty className="p-4">No results found.</Command.Empty>

					<Command.Group
						heading={
							<p className="text-surface-10 font-medium text-sm px-2 mb-1">
								Actions
							</p>
						}
						className="border-t border-b p-2 border-surface-2">
						<Command.Item className="p-2 hover:bg-surface-4 hover:text-surface-12 rounded-lg">
							Start today's work
						</Command.Item>
						<Command.Item className="p-2 hover:bg-surface-4 hover:text-surface-12 rounded-lg">
							Create new task
						</Command.Item>
						<Command.Item className="p-2 hover:bg-surface-4 hover:text-surface-12 rounded-lg">
							Add a project
						</Command.Item>
						<Command.Separator />
						<Command.Item className="p-2 hover:bg-surface-4 hover:text-surface-12 rounded-lg">
							Start timer
						</Command.Item>
					</Command.Group>

					<Command.Group className="p-2">
						<Command.Item className="p-2 hover:bg-surface-4 hover:text-surface-12 rounded-lg">
							Minimize app
						</Command.Item>
					</Command.Group>
				</Command.List>
			</div>
		</Command.Dialog>
	);
};

export default CommandBar;
