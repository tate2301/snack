import { useMemo, useState } from 'react';
import { useAppSelector } from '../../../redux/store';
import { selectTaskById } from '../../../redux/tasks';

export const useExpandTaskView = () => {
	const [idOfTaskBeingShown, setIdOfTaskBeingShown] = useState<string | null>(
		null,
	);
	const taskBeingShownInExpandedView = useAppSelector(
		selectTaskById(idOfTaskBeingShown),
	);
	const onShowExpandedTaskView = (id: string) => setIdOfTaskBeingShown(id);
	const onHideExpandedTaskView = () => setIdOfTaskBeingShown(null);

	return {
		taskBeingShownInExpandedView,
		onShowExpandedTaskView,
		onHideExpandedTaskView,
		idOfTaskBeingShown,
	};
};
