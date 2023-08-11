import { ReactNode } from 'react';
import useToggle from '../../hooks/useToggle';
import clsx from 'clsx';
import { useAnimate } from 'framer-motion';

export default function TaskListItem({
	icon,
	title,
}: {
	icon?: ReactNode;
	title: string;
}) {
	const [isChecked, toggle] = useToggle(false);
	let [ref, animate] = useAnimate();

	const onCheck = (e) => {
		toggle();
		animate('input', {
			scale: [1, 1.15, 1],
			opacity: [1, 0.5, 1],
		});
		animate('p', {
			opacity: isChecked ? [0.7, 1] : [1, 0.7, 1],
			textDecorationLine: !isChecked ? 'line-through' : 'none',
		});
	};

	return (
		<div className="flex items-start justify-between p-4 transition-all bg-white rounded-xl">
			<div
				ref={ref}
				className="flex items-center gap-2">
				<input
					className="rounded-xl"
					type="checkbox"
					onChange={onCheck}
					checked={isChecked}
				/>
				<p
					onClick={onCheck}
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
