import { ReactNode } from 'react';
import useToggle from '../../hooks/useToggle';
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
		<div className="flex items-start justify-between p-4 transition-all bg-white rounded-lg">
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
