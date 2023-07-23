import { AbstractTask } from './Task';
import { Person, Priority, Timer, TrackerTask, TrackerTaskType } from './types';

export interface TrackerTaskBuilder {
	buildReminderTask(): void;
	buildNoteTask(): void;
	buildEventTask(): void;
}

export class GeneralTask extends AbstractTask {
	id: string;
	isShowing: boolean;
	isExpanded: boolean;
	title: string;
	priority: Priority;
	description: string;
	dueDate: Date;
	tasks: TrackerTask[];
	assignedPeople: Person[];
	tags: string[];
	timer: Timer | null;
	project: string;
	type: TrackerTaskType;
	website?: string;


	constructor(
		id: string,
		isShowing: boolean,
		isExpanded: boolean,
		title: string,
		priority: Priority,
		description: string,
		dueDate: Date,
		tasks: TrackerTask[],
		assignedPeople: Person[],
		tags: string[],
		timer: Timer | null,
		project: string,
		website?: string,
		parentTask?: TrackerTask | null
	) {
		super(
			id,
			isShowing,
			isExpanded,
			title,
			priority,
			description,
			dueDate,
			tasks,
			assignedPeople,
			tags,
			timer,
			project,
			website,
			parentTask
		);
		this.type = "general";
	}

	markComplete(): void {
		this.isShowing = false;
	}

	markIncomplete(): void {
		this.isShowing = true;
	}

	addSubtask(subtask: TrackerTask): void {
		this.tasks.push(subtask);
	}

	removeSubtask(subtaskId: string): void {
		// Implementation for removing a subtask from the general task
	}

	updateSubtask(subtaskId: string, updatedSubtask: TrackerTask): void {
		// Implementation for updating a subtask in the general task
	}

	assignPerson(person: Person): void {
		// Implementation for assigning a person to the general task
	}

	unassignPerson(personId: string): void {
		// Implementation for unassigning a person from the general task
	}

	addTag(tag: string): void {
		// Implementation for adding a tag to the general task
	}

	removeTag(tag: string): void {
		// Implementation for removing a tag from the general task
	}

	startTimer(): void {
		// Implementation for starting the timer for the general task
	}

	stopTimer(): void {
		// Implementation for stopping the timer for the general task
	}
}
