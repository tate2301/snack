import { add, startOfDay, startOfToday } from 'date-fns';
import { CalendarView } from '../types';
import CalendarEventCard from './EventCard';

export type CalendarEventsProps = {
	view: CalendarView;
};

const CalendarEvents = (props: CalendarEventsProps) => {
	return (
		<ol
			className="grid h-full grid-cols-1 col-start-1 col-end-2 row-start-1 divide-y sm:grid-cols-7 sm:pr-8"
			style={{
				gridTemplateRows: '4rem repeat(288, minmax(0.6666666667rem, 1fr)) auto',
			}}>
			<CalendarEventCard
				color={'red'}
				description=""
				title="Finish up 22 June Movie"
				location=""
				startTime={add(startOfToday(), { days: 1, hours: 0, minutes: 0 })}
				endTime={add(startOfToday(), { days: 1, hours: 15, minutes: 0 })}
			/>
		</ol>
	);
};

export default CalendarEvents;
