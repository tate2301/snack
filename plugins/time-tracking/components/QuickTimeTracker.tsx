import { AnimatePresence, motion } from 'framer-motion';
import { TimeTrackerProps } from '../types';
import { TimeServiceActionEnum } from '../hooks/useTimeService';
import { cn } from '../../../src/lib/utils';
import SFSymbol from '../../../src/assets/icons/SFSymbol';
import { buttonVariants } from '../index';
import { PlayIcon } from '@heroicons/react/24/solid';
import { useTimeServiceActions } from '../context';
import { iconColors } from '../../../src/styles/constants';

export default function QuickTimeTracker(props: TimeTrackerProps) {
	const { taskQueue, totalToday } = useTimeServiceActions();
	const ticker = totalToday;
	return (
		<AnimatePresence
			mode={'wait'}
			initial={false}>
			<motion.div
				initial={{
					opacity: 0.8,
					scale: 0.9,
				}}
				animate={{
					scale: 1,
					opacity: 1,
				}}
				transition={{
					type: 'tween',
					ease: 'easeIn',
					duration: 0.05,
				}}
				key={
					props.timeServiceState.nextEvents.includes(
						TimeServiceActionEnum.START,
					)
						? 'startTimer'
						: 'timerControls'
				}
				style={{
					background: iconColors.primary,
				}}
				className={cn(
					'p-1 flex items-center rounded-xl !text-white space-x-3 bg-surface-6 backdrop-blur text-surface-12',
					props.isRunning && 'shadow bg-surface-12',
				)}>
				{props.timeServiceState.nextEvents.includes(
					TimeServiceActionEnum.PAUSE,
				) && (
					<motion.button
						variants={buttonVariants}
						initial="hidden"
						animate="visible"
						exit="exit"
						onClick={props.pauseTimer}
						transition={{ duration: 0.05 }}
						className={
							'flex space-x-4 items-center justify-center hover:bg-white/30 rounded-lg'
						}>
						<SFSymbol
							name={'cup.and.saucer.fill'}
							color={'white'}
							className={'w-6 h-6'}
						/>
					</motion.button>
				)}
				{props.timeServiceState.nextEvents.includes(
					TimeServiceActionEnum.CONTINUE,
				) && (
					<AnimatePresence>
						<motion.button
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							exit={{ opacity: 0 }}
							onClick={props.continueTimer}
							className={
								'flex space-x-4 items-center justify-center hover:bg-white/30 rounded-lg text-white pr-2'
							}>
							<PlayIcon className={'w-6 h-6'} />
							End break
						</motion.button>
					</AnimatePresence>
				)}
				{!props.timeServiceState.nextEvents.includes(
					TimeServiceActionEnum.CONTINUE,
				) && (
					<>
						{props.timeServiceState.nextEvents.includes(
							TimeServiceActionEnum.START,
						) && (
							<motion.button
								variants={buttonVariants}
								initial="hidden"
								animate="visible"
								exit="exit"
								onClick={props.startTimer}
								transition={{ duration: 0.3 }}
								className={
									'flex space-x-4 items-center justify-center hover:bg-white/30 rounded-lg'
								}>
								<SFSymbol
									name={'play.fill'}
									color={'#ffffff'}
									className={'w-6 h-6'}
								/>
							</motion.button>
						)}
						<p
							className={cn(
								'w-fit rounded-lg font-semibold font-mono text-lg pr-2',
							)}>
							{String(Math.floor(ticker / 3600000)).padStart(2, '0')}:
							{String(Math.floor((ticker % 3600000) / 60000)).padStart(2, '0')}:
							{String(Math.floor((ticker % 60000) / 1000)).padStart(2, '0')}
						</p>

						{props.isRunning && (
							<motion.button
								initial={{ opacity: 0 }}
								animate={{ opacity: 1 }}
								exit={{ opacity: 0 }}
								onClick={props.resetTimer}
								transition={{ duration: 0.3 }}
								className={
									'flex space-x-4 items-center justify-center bg-white rounded-lg shadow pr-4 text-surface-12'
								}>
								<SFSymbol
									name={'checklist'}
									color={'#121212'}
									className={'w-6 h-6'}
								/>
								{taskQueue.tasks.length}
							</motion.button>
						)}
					</>
				)}
				{props.timeServiceState.nextEvents.includes(
					TimeServiceActionEnum.STOP,
				) && (
					<motion.button
						variants={buttonVariants}
						initial="hidden"
						animate="visible"
						exit="exit"
						onClick={props.resetTimer}
						transition={{ duration: 0.05 }}
						className={
							'flex space-x-4 items-center justify-center hover:bg-white/30 rounded-lg'
						}>
						<SFSymbol
							name={'clock.badge.checkmark.fill'}
							color={'white'}
							className={'w-6 h-6'}
						/>
					</motion.button>
				)}
			</motion.div>
		</AnimatePresence>
	);
}
