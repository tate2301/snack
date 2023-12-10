import { MachineState, TimeServiceState } from './hooks/useTimeService';

export type TimerButtonProps = {
	taskId: string;
	sessionId?: string;
	variant?: 'compact' | 'default';
};

export type TimeTrackerProps = {
	timeServiceState: MachineState;
	ticker: number;
	isRunning?: boolean;
	startTimer: () => void;
	pauseTimer: () => void;
	continueTimer: () => void;
	resetTimer: () => void;
};
