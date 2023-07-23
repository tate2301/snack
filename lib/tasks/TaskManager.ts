import { TrackerTask, TrackerTaskType } from './types';
import { GeneralTask } from './index';
import { generateUUID } from '../functions';

export class TaskManager {
	tasks: TrackerTask[];

	constructor() {
		this.tasks = [];
	}

	static createTask(type: TrackerTaskType): TrackerTask {
		const id = generateUUID();

		return new GeneralTask(
			id,
			true,
			false,
			"",
			1,
			"",
			null,
			[],
			[],
			[],
			null,
			null,
			"",
		)
	}

	addTask(task: TrackerTask): void {
		if (!task) {
			throw new Error("Invalid task");
		}

		this.tasks.push(task);
	}

	removeTask(taskId: string): void {
		if (!taskId) {
			throw new Error("Invalid task ID");
		}

		const index = this.tasks.findIndex((task) => task.id === taskId);
		if (index === -1) {
			throw new Error("Task not found");
		}

		this.tasks.splice(index, 1);
	}

	updateTask(taskId: string, updatedTask: TrackerTask): void {
		if (!taskId) {
			throw new Error("Invalid task ID");
		}

		if (!updatedTask) {
			throw new Error("Invalid updated task");
		}

		const index = this.tasks.findIndex((task) => task.id === taskId);
		if (index === -1) {
			throw new Error("Task not found");
		}

		this.tasks[index] = updatedTask;
	}

	getAllTasks(): TrackerTask[] {
		return [...this.tasks];
	}

	getTasksByTag(tag: string): TrackerTask[] {
		if (!tag) {
			throw new Error("Invalid tag");
		}

		return this.tasks.filter((task) => task.tags.includes(tag));
	}

	getOverdueTasks(): TrackerTask[] {
		const today = new Date();
		return this.tasks.filter((task) => task.dueDate < today && !task.isShowing);
	}

	getTasksByPriority(priority: number): TrackerTask[] {
		if (priority < 1 || priority > 5) {
			throw new Error("Invalid priority");
		}

		return this.tasks.filter((task) => task.priority === priority);
	}

	getTasksByAssignedPerson(personId: string): TrackerTask[] {
		if (!personId) {
			throw new Error("Invalid person ID");
		}

		return this.tasks.filter((task) =>
			task.assignedPeople.find((person) => person.id === personId)
		);
	}

	getTasksByProject(project: string): TrackerTask[] {
		if (!project) {
			throw new Error("Invalid project");
		}

		return this.tasks.filter((task) => task.project === project);
	}

	getTasksByKeyword(keyword: string): TrackerTask[] {
		if (!keyword) {
			throw new Error("Invalid keyword");
		}

		const lowerKeyword = keyword.toLowerCase();
		return this.tasks.filter(
			(task) =>
				task.title.toLowerCase().includes(lowerKeyword) ||
				task.description.toLowerCase().includes(lowerKeyword)
		);
	}
}
