import { TimeTrackerProps } from '../types';
import { TimeServiceActionEnum } from '../hooks/useTimeService';
import { AnimatePresence, motion } from 'framer-motion';
import { cn } from '../../../src/lib/utils';
import SFSymbol from '../../../src/assets/icons/SFSymbol';
import { iconColors } from '../../../src/styles/constants';

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
				className={cn('rounded-lg', props.isRunning && 'shadow text-white')}>
				<div className="flex items-center gap-4">
					<button className="bg-alternateSurface flex-1 px-3 py-1.5 rounded-xl">
						<SFSymbol
							name={'bolt.fill'}
							color={iconColors.labelPrimary}
						/>
						Clock in
					</button>
				</div>
			</motion.div>
		</AnimatePresence>
	);
}
