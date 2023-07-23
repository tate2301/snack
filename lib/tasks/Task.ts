import { Person, Priority, Timer, TrackerTask } from './types';

export abstract class AbstractTask implements TrackerTask {
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
	timer: Timer;
	project?: string;
	parentTask?: TrackerTask | null;
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
		this.id = id;
		this.isShowing = isShowing;
		this.isExpanded = isExpanded;
		this.title = title;
		this.priority = priority;
		this.description = description;
		this.dueDate = dueDate;
		this.tasks = tasks;
		this.website = website;
		this.assignedPeople = assignedPeople;
		this.tags = tags;
		this.timer = timer;
		this.project = project;
		this.parentTask = parentTask;
	}

	abstract markComplete(): void;
	abstract markIncomplete(): void;
	abstract addSubtask(subtask: TrackerTask): void;
	abstract removeSubtask(subtaskId: string): void;
	abstract updateSubtask(subtaskId: string, updatedSubtask: TrackerTask): void;
	abstract assignPerson(person: Person): void;
	abstract unassignPerson(personId: string): void;
	abstract addTag(tag: string): void;
	abstract removeTag(tag: string): void;
	abstract startTimer(): void;
	abstract stopTimer(): void;

	getTaskHierarchy(): string {
		let hierarchy = this.title;
		let currentTask = this.parentTask;

		while (currentTask) {
			hierarchy = `${currentTask.title} > ${hierarchy}`;
			currentTask = currentTask.parentTask;
		}

		return hierarchy;
	}
}
