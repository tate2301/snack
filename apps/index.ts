import Inbox from './inbox';
import Timers from './timers';
import Calendars from './calendars';
import Settings from './settings';
import Contacts from './contacts';
import { Tab } from '../components/nav/types';
import Lists from './lists';

type Apps = {
	[key in Tab]: React.FC;
};

export const Apps: Apps = {
	inbox: Inbox,
	timers: Timers,
	calendar: Calendars,
	settings: Settings,
	contacts: Contacts,
};
