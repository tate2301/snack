import { SnackList } from '../../redux/lists/types';
import { SnackTask } from '../../redux/tasks/types';

/** Takes a list of tasks and separates them into an array of objects, separated by date or week or month */
export const groupTasksByPeriod = (
	tasks: Array<SnackTask>,
	period: 'day' | 'week' | 'month' = 'day',
): {
	[key: string]: Array<SnackTask>;
} => {
	const groupedTasks = tasks.reduce((grouped, task) => {
		const date = new Date(task.deadline ?? task.createdAt);
		let key;

		switch (period) {
			case 'day':
				key = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
				break;
			case 'week':
				key = `${date.getFullYear()}-${date.getMonth() + 1}-W${Math.ceil(
					date.getDate() / 7,
				)}`;
				break;
			case 'month':
				key = `${date.getFullYear()}-${date.getMonth() + 1}`;
				break;
		}

		if (!grouped[key]) {
			grouped[key] = [];
		}

		grouped[key].push(task);

		return grouped;
	}, {});

	let sortedKeys = Object.keys(groupedTasks).sort(
		(a, b) => new Date(b).getTime() - new Date(a).getTime(),
	);

	if (period === 'day') {
		const date = new Date();

		const index = sortedKeys.indexOf(
			`${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`,
		);
		sortedKeys.splice(index, 1);
		sortedKeys.unshift(
			`${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`,
		);
	}

	const sortedGroupedTasks = {};
	sortedKeys.forEach((key) => {
		sortedGroupedTasks[key] = groupedTasks[key];
	});
	return sortedGroupedTasks;
};

/** Takes a list of tasks and separates them into an array of objects, separated by status */
export const groupTasksByStatus = (tasks: Array<SnackTask>) => {
	const groupedTasks = tasks.reduce((grouped, task) => {
		if (!grouped[task.status]) {
			grouped[task.status] = [];
		}

		grouped[task.status].push(task);

		return grouped;
	}, {});

	return {
		'In Progress': groupedTasks['In Progress'] || [],
		Todo: groupedTasks['Todo'] || [],
		Complete: groupedTasks['Complete'] || [],
		Blocked: groupedTasks['Blocked'] || [],
	};
};

export const groupTasksByProject = (
	tasks: Array<SnackTask>,
	projects: Array<SnackList>,
) => {
	const tasksWithProjects = tasks.map((task) => {
		let project = projects.find((project) => project.tasks.includes(task.id));
		if (!project)
			project = projects.find((project) => project.id === 'default');

		return {
			...task,
			project: project.name,
		};
	});

	// group tasks by project
	const groupedTasks = tasksWithProjects.reduce((grouped, task) => {
		if (!grouped[task.project]) {
			grouped[task.project] = [];
		}

		grouped[task.project].push(task);

		return grouped;
	}, {});

	return groupedTasks;
};
