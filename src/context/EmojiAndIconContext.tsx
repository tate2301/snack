import { ReactNode, createContext, useState } from 'react';
import TodoIcon from '../assets/icons/TodoIcon';
import InProgressIcon from '../assets/icons/InProgressIcon';
import { CheckCircleIcon, XCircleIcon } from '@heroicons/react/24/solid';
import { SnackTaskStatus } from '../redux/tasks/types';

export const SnackIcons = {
	[SnackTaskStatus.Todo]: <TodoIcon className="w-5 h-5" />,
	[SnackTaskStatus.InProgress]: <InProgressIcon className="w-5 h-5" />,
	[SnackTaskStatus.Blocked]: <XCircleIcon className="w-5 h-5" />,
	[SnackTaskStatus.Complete]: <CheckCircleIcon className="w-5 h-5" />,
};

export const EmojiAndIconContext = createContext({
	icons: SnackIcons,
});

const EmojiAndIconContextProvider = ({ children }: { children: ReactNode }) => {
	const [icons, setIcons] = useState(SnackIcons);
	return (
		<EmojiAndIconContext.Provider value={{ icons: SnackIcons }}>
			{children}
		</EmojiAndIconContext.Provider>
	);
};

export default EmojiAndIconContextProvider;
