import { ipcRenderer } from 'electron';
import { Dispatch, useEffect, useReducer } from 'react';

export const useTimeService = () => {
	const readLogs = async () => {
		return await ipcRenderer.invoke('request-log');
	};

	return {
		readLogs,
	};
};

type PartialRecord<K extends string | number | symbol, T> = { [P in K]?: T };

export type TimeServiceState = 'IDLE' | 'RUNNING' | 'PAUSED';
export type TimeServiceAction = 'START' | 'PAUSE' | 'CONTINUE' | 'STOP';
export enum TimeServiceActionEnum {
	START = 'START',
	PAUSE = 'PAUSE',
	CONTINUE = 'CONTINUE',
	STOP = 'STOP',
}

export type TimeServiceConfig = {
	initial: TimeServiceState;
	states: {
		[key in TimeServiceState]: {
			on: PartialRecord<TimeServiceAction, TimeServiceState>;
			entry: () => void;
		};
	};
};

export type MachineState = {
	current: TimeServiceState;
	nextEvents: string[];
};

export const useTimeServiceMachine = (
	config: TimeServiceConfig,
): [MachineState, Dispatch<string>] => {
	// 1 Contain state and the nextEvent string
	// 2 Should listen for new events
	// 3 Invoke entry callback

	const initialState: MachineState = {
		current: config.initial,
		nextEvents: Object.keys(config.states[config.initial].on),
	};

	const [machineState, send] = useReducer(
		(state: MachineState, event: string) => {
			const currentNode = config.states[state.current];
			const nextState = currentNode.on[event];

			if (!nextState) return state as MachineState;

			if (nextState) {
				return {
					current: nextState as TimeServiceState,
					nextEvents: Object.keys(config.states[nextState].on) as string[],
				};
			}
		},
		initialState as MachineState,
	);

	useEffect(() => {
		// Execute the entry function if its defined
		config.states[machineState.current]?.entry?.();
	}, [machineState.current]);

	return [machineState, send];
};
