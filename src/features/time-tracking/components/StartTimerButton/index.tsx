import TimerIcon from '../../../../assets/icons/Timer';
import { TimerButtonProps } from '../../types';

export default function StartTimerButton(props: TimerButtonProps) {
	return (
		<>
			<button className="p-2 rounded-lg hover:bg-surface-4 hover:text-surface-12 flex space-x-2 text-sm">
				<TimerIcon className={'w-5 h-5'} />
				Start timer
			</button>
		</>
	);
}
