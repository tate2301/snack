import { format } from 'date-fns';

export default function CalendarHorizontalLines(props: {
	timeIntervals: Date[];
	currentTime: Date;
}) {
	return (
		<div
			className="grid col-start-1 col-end-2 row-start-1 uppercase divide-y divide-gray-100 "
			style={{ gridTemplateRows: 'repeat(48, minmax(4rem, 1fr))' }}>
			<div />
			{props.timeIntervals.map((time, idx) => (
				<>
					<div key={`time-${idx}`}></div>
					<div />
				</>
			))}
		</div>
	);
}
