import { AnimatePresence, motion } from 'framer-motion';
import { TimeTrackerProps } from '../types';
import { TimeServiceActionEnum } from '../hooks/useTimeService';
import { cn } from '../../../lib/utils';
import SFSymbol from '../../../assets/icons/SFSymbol';
import {
	ContinueTimer,
	PauseTimer,
	StartTimer,
	StopTimer,
} from './TimerButtons';
import { buttonVariants } from '../index';

export default function QuickTimeTracker(props: TimeTrackerProps) {
	return (
		<AnimatePresence
			mode={'wait'}
			initial={false}>
			<motion.div
				layout={'size'}
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
					ease: 'easeInOut',
					duration: 0.05,
				}}
				key={
					props.timeServiceState.nextEvents.includes(
						TimeServiceActionEnum.START,
					)
						? 'startTimer'
						: 'timerControls'
				}
				className={cn(
					'p-1 flex items-center rounded-xl space-x-4 bg-surface-6 backdrop-blur text-surface-12',
					props.isRunning && 'shadow text-white bg-surface-12',
				)}>
				{props.timeServiceState.nextEvents.includes(
					TimeServiceActionEnum.PAUSE,
				) && (
					<motion.button
						key="timerControls"
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
							name={'pause.fill'}
							color={'white'}
							className={'w-6 h-6'}
						/>
					</motion.button>
				)}
				{props.timeServiceState.nextEvents.includes(
					TimeServiceActionEnum.CONTINUE,
				) && (
					<motion.button
						key="timerControls"
						variants={buttonVariants}
						initial="hidden"
						animate="visible"
						exit="exit"
						onClick={props.continueTimer}
						transition={{ duration: 0.01 }}
						className={
							'flex space-x-4 items-center justify-center hover:bg-white/30 rounded-lg'
						}>
						<SFSymbol
							name={'play.fill'}
							color={'white'}
							className={'w-6 h-6'}
						/>
					</motion.button>
				)}
				<AnimatePresence initial={false}>
					{props.timeServiceState.nextEvents.includes(
						TimeServiceActionEnum.START,
					) && (
						<motion.button
							key="timerControls"
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
								color={'#121212'}
								className={'w-6 h-6'}
							/>
						</motion.button>
					)}
					<p className={cn('w-fit rounded-lg font-semibold font-mono text-lg')}>
						{String(Math.floor(props.ticker / 3600000)).padStart(2, '0')}:
						{String(Math.floor((props.ticker % 3600000) / 60000)).padStart(
							2,
							'0',
						)}
						:
						{String(Math.floor((props.ticker % 60000) / 1000)).padStart(2, '0')}
					</p>

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
							name={'timer.circle.fill'}
							color={'#121212'}
							className={'w-6 h-6'}
						/>
						0 tasks
					</motion.button>
				</AnimatePresence>
			</motion.div>
		</AnimatePresence>
	);
}
