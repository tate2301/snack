import { ReactNode, createContext, useState } from 'react';
import useToggle from '../hooks/useToggle';
import CreateTask from '../components/Task/CreateTask';
import Modal from '../components/ui/modal';

export const CommandContext = createContext({
	openCreateTask: (listId: string) => null,
});

const CommandContextProvider = (props: { children: ReactNode }) => {
	const [activeProject, setActiveProject] = useState<string | null>();
	const [isCreateTaskOpen, toggleCreateTask] = useToggle(false);

	const onOpenCreateTask = (projectId: string) => {
		setActiveProject(projectId);
		toggleCreateTask();
	};

	const onCloseCreateTask = () => {
		setActiveProject(null);
		toggleCreateTask();
	};

	return (
		<CommandContext.Provider
			value={{
				openCreateTask: onOpenCreateTask,
			}}>
			<Modal
				isOpen={isCreateTaskOpen}
				onClose={onCloseCreateTask}>
				<CreateTask
					defaultList={activeProject}
					overrideOpenState={true}
					overrideToggle={onCloseCreateTask}
				/>
			</Modal>
			{props.children}
		</CommandContext.Provider>
	);
};

export default CommandContextProvider;
