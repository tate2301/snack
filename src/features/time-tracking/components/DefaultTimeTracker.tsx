import { TimeTrackerProps } from '../types';
import { TimeServiceActionEnum } from '../hooks/useTimeService';
import { AnimatePresence, motion } from 'framer-motion';
import {
	ContinueTimer,
	PauseTimer,
	StartTimer,
	StopTimer,
} from './TimerButtons';
import { cn } from '../../../lib/utils';
import SFSymbol from '../../../assets/icons/SFSymbol';
import { buttonVariants } from '../index';

export default function DefaultTimeTracker(props: TimeTrackerProps) {
	return (
		<AnimatePresence
			mode={'wait'}
			initial={false}>
			<motion.div
				layout={'size'}
				key={
					props.timeServiceState.nextEvents.includes(
						TimeServiceActionEnum.START,
					)
						? 'startTimer'
						: 'timerControls'
				}
				className={cn(
					'p-4 rounded-3xl bg-gradient-to-b from-primary-12 to-surface-12 backdrop-blur text-white shadow-xl',
					props.isRunning && 'shadow text-white',
				)}>
				<div className={'flex justify-between items-center font-medium'}>
					<div>
						<p className={'text-white title-3'}>Time tracker</p>
					</div>
					<div className={'p-2 bg-blue-100/5 text-white rounded-full shadow'}>
						<SFSymbol
							name={'gear'}
							color={'white'}
							className={'w-5 h-5 text-warning'}
						/>
					</div>
				</div>
				<div className={'mt-4'}>
					<div className={'flex items-center text-sm uppercase space-x-4'}>
						<p
							className={cn(
								'w-fit py-0.5 rounded-lg text-surface-1 font-semibold font-mono',
							)}>
							{String(Math.floor(props.ticker / 3600000)).padStart(2, '0')}:
							{String(Math.floor((props.ticker % 3600000) / 60000)).padStart(
								2,
								'0',
							)}
						</p>
						<progress
							value={(props.ticker / 28800000) * 100}
							className={
								'w-full rounded-full bg-blue-500 text-white shadow-lg mix-blend-luminosity'
							}
							max={100}
						/>
						<p
							className={
								'text-surface-8 text-md uppercase font-mono font-semibold'
							}>
							08hrs
						</p>
					</div>
				</div>

				<AnimatePresence initial={false}>
					{props.timeServiceState.nextEvents.includes(
						TimeServiceActionEnum.START,
					) && (
						<motion.div
							key="timerControls"
							variants={buttonVariants}
							initial="hidden"
							animate="visible"
							exit="exit"
							transition={{ duration: 0.3 }}
							className={'flex space-x-4 mt-2 items-center justify-center'}>
							<StartTimer onClick={props.startTimer} />
						</motion.div>
					)}
					{!props.timeServiceState.nextEvents.includes(
						TimeServiceActionEnum.START,
					) && (
						<motion.div
							key="timerControls"
							variants={buttonVariants}
							initial="hidden"
							animate="visible"
							exit="exit"
							transition={{ duration: 0.3 }}
							className={'flex space-x-4 mt-4 items-center justify-center'}>
							{props.timeServiceState.nextEvents.includes(
								TimeServiceActionEnum.PAUSE,
							) && <PauseTimer onClick={props.pauseTimer} />}

							{props.timeServiceState.nextEvents.includes(
								TimeServiceActionEnum.CONTINUE,
							) && <ContinueTimer onClick={props.continueTimer} />}

							{props.timeServiceState.nextEvents.includes(
								TimeServiceActionEnum.STOP,
							) && <StopTimer onClick={props.resetTimer} />}
						</motion.div>
					)}
				</AnimatePresence>
			</motion.div>
		</AnimatePresence>
	);
}
