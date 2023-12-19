import { TimerButtonProps } from './types';
import ClientTimer from './ClientTimer';
import { TimeServiceActionEnum, useTimeService } from './hooks/useTimeService';
import { memo, useContext } from 'react';
import TimeServiceContext from './context';
import DefaultTimeTracker from './components/DefaultTimeTracker';
import { Simulate } from 'react-dom/test-utils';
import reset = Simulate.reset;
import QuickTimeTracker from './components/QuickTimeTracker';

export const buttonVariants = {
	hidden: { opacity: 0, x: -10, height: 0 },
	visible: { opacity: 1, x: 0, height: 'auto' },
	exit: { opacity: 0, x: 10, height: 0 },
};

function TimeTracker(props: TimerButtonProps) {
	const {
		time: ticker,
		start,
		stop,
		pause,
		continueTimer,
		isActive,
		timeServiceState,
	} = useContext(TimeServiceContext);

	// TODO: Get notification from main process when we enter the idle part and pause the UI
	if (props.variant === 'compact')
		return (
			<QuickTimeTracker
				timeServiceState={timeServiceState}
				ticker={ticker}
				startTimer={start}
				pauseTimer={pause}
				continueTimer={continueTimer}
				resetTimer={stop}
				isRunning={isActive}
			/>
		);

	return (
		<>
			<DefaultTimeTracker
				timeServiceState={timeServiceState}
				ticker={ticker}
				startTimer={start}
				pauseTimer={pause}
				continueTimer={continueTimer}
				resetTimer={stop}
				isRunning={isActive}
			/>
		</>
	);
}

export default memo(TimeTracker);
