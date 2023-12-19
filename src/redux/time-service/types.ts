type TrackedBreak = {
	startTime: Date;
	endTime: Date;
};

type TrackedIdle = {
	startTime: Date;
	endTime: Date;
};

type TrackedTime = {
	startTime: Date;
	endTime: Date;
};

type TrackedTask = {
	id: string;
	startTime: Date;
	endTime: Date;
};

// Represents the total time tracked in a day
type TrackedDay = {
	date: Date;
	totalTime: number; // in milliseconds
};

// Represents the state of the time service in the redux store
interface ReduxTimeServiceState {
	tasks: TrackedTask[];
	breaks: TrackedBreak[];
	idle: TrackedIdle[];
	tracked: TrackedTime[];
	day: TrackedDay;
}
