import TimerIcon from '../../../assets/icons/Timer';
import { PauseIcon, PlayIcon } from '@heroicons/react/24/solid';
import { StopIcon } from '@heroicons/react/20/solid';
import { FaceFrownIcon } from '@heroicons/react/24/outline';
import { AnimatePresence, motion } from 'framer-motion';
import ArrowsExpand from '../../../assets/icons/ArrowsExpand';
import { iconColors } from '../../../styles/constants';
import SFSymbol from '../../../assets/icons/SFSymbol';

type TimerButtonProps = {
	onClick: () => void;
	disabled?: boolean;
};
export const StartTimer = (props: TimerButtonProps) => (
	<motion.button
		initial={{ opacity: 0 }}
		animate={{ opacity: 1 }}
		exit={{ opacity: 0 }}
		onClick={props.onClick}
		className="rounded-full p-2 flex-1 flex space-x-2 text-surface-12 bg-surface-3 text-normal justify-center transition-all">
		<SFSymbol
			name={'play.fill'}
			color={'black'}
			className={'w-6 h-6 text-warning'}
		/>
		Track time
	</motion.button>
);

export const StopTimer = (props: TimerButtonProps) => (
	<motion.button
		initial={{ opacity: 0 }}
		animate={{ opacity: 1 }}
		exit={{ opacity: 0 }}
		onClick={props.onClick}
		className="p-2 rounded-full bg-danger-10 text-danger-1 hover:bg-danger-11 hover:text-danger-1 transition-all">
		<SFSymbol
			name={'stop.fill'}
			color={'white'}
			className={'w-6 h-6 text-warning'}
		/>
	</motion.button>
);

export const PauseTimer = (props: TimerButtonProps) => (
	<motion.button
		initial={{ opacity: 0 }}
		animate={{ opacity: 1 }}
		exit={{ opacity: 0 }}
		onClick={props.onClick}
		className="rounded-full p-2 text-surface-12 flex flex-1 space-x-2 bg-surface-1 text-normal justify-center transition-all">
		<SFSymbol
			name={'pause.fill'}
			color={'black'}
			className={'w-6 h-6 text-warning'}
		/>{' '}
		Pause
	</motion.button>
);

export const ContinueTimer = (props: TimerButtonProps) => (
	<motion.button
		initial={{ opacity: 0 }}
		animate={{ opacity: 1 }}
		exit={{ opacity: 0 }}
		onClick={props.onClick}
		className="rounded-full p-2 flex space-x-2 flex-1 bg-surface-1 text-surface-12 text-normal justify-center transition-all">
		<PlayIcon className={'w-6 h-6'} />
		Continue
	</motion.button>
);
