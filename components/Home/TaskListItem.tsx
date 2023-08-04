import { ReactNode } from 'react';
import useToggle from '../../lib/hooks/useToggle';
import clsx from 'clsx';

export default function TaskListItem({
	icon,
	title,
}: {
	icon?: ReactNode;
	title: string;
}) {
	const [isChecked, toggle] = useToggle(false);

	return (
		<div className="flex items-start justify-between py-2 pl-4 pr-2 transition-all rounded-lg hover:bg-zinc-50">
			<div className="flex items-center gap-4">
				<input
					className="mt-1 rounded-xl"
					type="checkbox"
					onChange={toggle}
					checked={isChecked}
				/>
				<p
					className={clsx(
						isChecked ? 'line-through text-zinc-400' : 'text-zinc-900',
					)}>
					{title}
				</p>
			</div>
			<button className="p-1 text-zinc-400">{icon}</button>
		</div>
	);
}
