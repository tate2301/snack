import { BrowserWindow } from 'electron';
import timeTrackerInstance from './index';

let timeTracker;

const initTimeTracker = (window: BrowserWindow) => {
	timeTracker = timeTrackerInstance(window);

	return timeTracker;
};

export default initTimeTracker;
