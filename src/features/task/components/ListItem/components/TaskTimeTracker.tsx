import { useEffect, useMemo } from 'react';
import SFSymbol from '../../../../../assets/icons/SFSymbol';
import { useTimeServiceActions } from '../../../../../plugins/integrations/time-tracking/context';
import { cn } from '../../../../../lib/utils';
import { iconColors } from '../../../../../styles/constants';

export default function TaskTimeTracker(props: {
	id: string;
	expanded?: boolean;
}) {
	const { taskQueue, isRunning, sessionManager } = useTimeServiceActions();

	const isTracking = useMemo(() => {
		return taskQueue.taskBeingCurrentlyTracked === props.id && isRunning;
	}, [taskQueue.taskBeingCurrentlyTracked]);

	const totalTime = useMemo(
		() => (isTracking ? taskQueue.getTimeTrackedForTask(props.id) : 0),
		[props.id, sessionManager.sessionTicker],
	);

	const onStartTrackingTask = () => {
		taskQueue.addTaskToQueue(props.id);
	};

	const onStopTrackingTask = () => {
		taskQueue.stopTrackingTask();
	};

	const onToggle = () => {
		if (isTracking) {
			onStopTrackingTask();
			return;
		}

		onStartTrackingTask();
	};

	return (
		<button
			onClick={onToggle}
			style={{
				background: isTracking ? iconColors.primary : 'transparent',
			}}
			className={cn(
				'rounded-xl group p-0 items-center transition-opacity ease-in text-base',
				isTracking && 'text-white py-1.5 px-3',
				!isTracking && !props.expanded && 'group-hover:opacity-100 opacity-0',
				props.expanded && !isTracking && '!bg-alternateSurface px-3 py-1.5',
			)}>
			<span>
				<SFSymbol
					name={
						isTracking ? 'stop.fill' : isRunning ? 'bolt.fill' : 'play.fill'
					}
					color={!isTracking ? '#808080' : '#ffffff'}
				/>
			</span>
			{isTracking && (
				<span>
					{String(Math.floor(totalTime / 3600000)).padStart(2, '0')}:
					{String(Math.floor((totalTime % 3600000) / 60000)).padStart(2, '0')}:
					{String(Math.floor((totalTime % 60000) / 1000)).padStart(2, '0')}
				</span>
			)}
			{!isTracking && props.expanded && <span>00:00:00</span>}
		</button>
	);
}
