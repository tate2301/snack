// EventLog.ts

type TimeEvent = {
	timestamp: number; // Unix timestamp in milliseconds
	type: 'tracked_time' | 'break' | 'idle_time' | 'custom'; // Type of event
	data: any; // Additional data specific to the event type
};

type TrackedTimeEvent = {
	startTime: number; // Start time (Unix timestamp in milliseconds)
	endTime?: number; // End time  (Unix timestamp in milliseconds)
};

type BreakEvent = {
	startTime: number; // Start time of the break (Unix timestamp in milliseconds)
	endTime?: number; // End time of the break (Unix timestamp in milliseconds)
	reason?: string; // Reason for the break
};

type IdleTimeEvent = {
	startTime: number; // Start time of idle time (Unix timestamp in milliseconds)
	endTime?: number; // End time of idle time (Unix timestamp in milliseconds)
};

// Custom event type can be defined based on specific application requirements

export type { TimeEvent, TrackedTimeEvent, BreakEvent, IdleTimeEvent };
