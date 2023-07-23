export type Priority = 1 | 2 | 3;

export type EventDetails =
	| OnlineMeetingDetails
	| LocationEventDetails
	| BirthdayEventDetails;

export type TrackerTaskType = "general" | "reminder" | "note" | "event";
// @ts-nocheck

export interface TrackerTask {
	id: string;
	isShowing: boolean;
	isExpanded: boolean;
	title: string;
	priority: number;
	description: string;
	dueDate: Date;
	tasks: TrackerTask[];
	assignedPeople: Person[];
	tags: string[];
	timer: Timer | null;
	project?: string;
	website?: string;
	parentTask?: TrackerTask | null;

	markComplete(): void;
	markIncomplete(): void;
	addSubtask(subtask: TrackerTask): void;
	removeSubtask(subtaskId: string): void;
	updateSubtask(subtaskId: string, updatedSubtask: TrackerTask): void;
	assignPerson(person: Person): void;
	unassignPerson(personId: string): void;
	addTag(tag: string): void;
	removeTag(tag: string): void;
	startTimer(): void;
	stopTimer(): void;
}

export interface Comment {
	id: string;
	author: Person;
	content: string;
	timestamp: Date;
}

export interface Person {
	id: string;
	name: string;
	contactPerson: string;
	email: string;
	phone: string;
	url: string;
	profilePicture: string;
	notes: string;
	location: string;
}

export interface Timer {
	startTime: Date;
	endTime: Date | null;
	duration: number;
	isActive?: boolean;
}

export interface OnlineMeetingDetails {
	meetingLink: string;
	invitees: string[];
}

export interface LocationEventDetails {
	address: string;
	attendees: string[];
}

export interface BirthdayEventDetails {
	date: Date;
	celebrant: string;
}
