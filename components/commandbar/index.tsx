import { Command } from 'cmdk';
import useDisclosure from '../../hooks/useDisclosure';
import { useEffect } from 'react';

const CommandBar = () => {
	const { isOpen, onToggle } = useDisclosure();

	useEffect(() => {
		// TODO: Add event listener for keyboard shortcut
		const handleKeyDown = (event: KeyboardEvent) => {
			event.preventDefault();
			if (event.key === 'k') {
				onToggle();
			}
		};

		window.addEventListener('keydown', handleKeyDown);
	}, []);

	return (
		<Command.Dialog
			className="fixed top-0 left-0 z-50 flex items-center justify-center w-screen h-screen p-8 bg-zinc-900 bg-opacity-20"
			open={isOpen}
			onOpenChange={onToggle}>
			<div className="m-auto w-[32rem] rounded-xl shadow-xl bg-white p-8">
				<Command.Input />

				<Command.List>
					<Command.Empty>No results found.</Command.Empty>

					<Command.Group heading="Fruits">
						<Command.Item>Apple</Command.Item>
						<Command.Item>Orange</Command.Item>
						<Command.Separator />
						<Command.Item>Pear</Command.Item>
						<Command.Item>Blueberry</Command.Item>
					</Command.Group>

					<Command.Item>Fish</Command.Item>
				</Command.List>
			</div>
		</Command.Dialog>
	);
};

export default CommandBar;
