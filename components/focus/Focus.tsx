import { useCallback, useEffect, useRef, useState } from 'react';
import useToggle from '../../lib/hooks/useToggle';
import {
	ArrowPathIcon,
	ClockIcon,
	EllipsisHorizontalIcon,
	PauseIcon,
	PlayIcon,
} from '@heroicons/react/24/solid';
import { renderTimeCounter } from '../../lib/time';
import clsx from 'clsx';
import { motion } from 'framer-motion';

const FocusPeriod = () => {
	const ref = useRef<null | HTMLDivElement>();
	const [count, setCount] = useState(0);
	const [initialTime, setInitialTime] = useState(60 * 30); // 15 minutes [in seconds
	const [remainingTime, setRemainingTime] = useState(initialTime);
	const [isRunning, toggle] = useToggle(false);

	useEffect(() => {
		if (isRunning) {
			const interval = setInterval(() => {
				setRemainingTime((prev) => prev - 1);
			}, 1000);

			return () => clearInterval(interval);
		}
	}, [isRunning]);

	useEffect(() => {
		if (remainingTime === 0 && isRunning) {
			setRemainingTime(initialTime);
			return toggle();
		}
	}, [remainingTime, isRunning]);

	useEffect(() => {
		const e = ref.current;
		if (e) {
			const rectWidth = e.getBoundingClientRect();
			const width = rectWidth.width;
			const elementCount = Math.floor(width / 8);
			setCount(elementCount);
		}
	}, []);

	const percentageTimePassed = (initialTime - remainingTime) / initialTime;
	const activeElementCount = Math.floor(percentageTimePassed * count);

	const restart = useCallback(
		() => setRemainingTime(initialTime),
		[initialTime],
	);

	return (
		<div
			className={clsx(
				'border  rounded-xl py-4 px-4 flex flex-col',
				isRunning ? 'bg-white border-blue-300' : 'bg-zinc-50 border-zinc-100',
			)}>
			<div className={'flex gap-2 items-center text-blue-600'}>
				<ClockIcon className={'w-5 h-5'} />
				<p className={'font-semibold text-sm'}>Focus Period</p>
			</div>
			<div className={'mt-2'}>
				<div className={'flex items-center py-2 w-full rounded-xl'}>
					<p className={'text-3xl font-semibold uppercase'}>
						{remainingTime > 0 ? renderTimeCounter(remainingTime) : '00:00:00'}
					</p>
				</div>
				<div
					ref={ref}
					className={'mt-1 mb-4 flex gap-1 items-baseline'}>
					{new Array(count).fill(0).map((_, idx) => (
						<div
							className={clsx(
								'w-2 h-8 rounded-full transition-all duration-300',
								idx < activeElementCount ? ' bg-blue-600' : 'bg-zinc-200',
							)}
							key={idx}
						/>
					))}
				</div>
				<div className={'flex gap-2'}>
					{!isRunning && (
						<motion.button
							initial={{
								opacity: 0,
							}}
							animate={{
								opacity: 1,
							}}
							exit={{
								opacity: 0,
							}}
							onClick={toggle}
							className={
								'py-2 px-4 rounded-xl text-sm flex gap-2 bg-purple-600 text-white'
							}>
							<PlayIcon className={'w-5 h-5'} />
							{remainingTime === initialTime ? 'Start' : 'Continue'}
						</motion.button>
					)}
					{isRunning && (
						<motion.button
							initial={{
								opacity: 0,
							}}
							animate={{
								opacity: 1,
							}}
							exit={{
								opacity: 0,
							}}
							onClick={toggle}
							className={
								'py-2 px-4 rounded-xl text-sm flex gap-2 bg-red-600 text-white'
							}>
							<PauseIcon className={'w-5 h-5'} />
							Pause
						</motion.button>
					)}
					{!isRunning && remainingTime !== initialTime && (
						<motion.button
							initial={{
								opacity: 0,
							}}
							animate={{
								opacity: 1,
							}}
							exit={{
								opacity: 0,
							}}
							onClick={restart}
							className={
								'py-2 px-4 rounded-xl text-sm flex gap-2 bg-white border'
							}>
							<ArrowPathIcon className={'w-5 h-5'} />
							Restart
						</motion.button>
					)}
					<button className={'p-2 rounded-full bg-white border'}>
						<EllipsisHorizontalIcon className={'w-5 h-5'} />
					</button>
				</div>
			</div>
		</div>
	);
};

export default FocusPeriod;
