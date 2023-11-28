export default function CalendarVerticalLines(props: {
	numberOfDaysToDisplay: number;
}) {
	return (
		<div className="hidden grid-cols-7 col-start-1 col-end-2 grid-rows-1 row-start-1 divide-x divide-gray-100 sm:grid sm:grid-cols-7">
			{new Array(props.numberOfDaysToDisplay).fill(0).map((_, idx) => (
				<div
					key={`idx-${idx}`}
					className={`col-start-${idx + 1} row-span-full`}
				/>
			))}
			<div className="w-8 col-start-8 row-span-full" />
		</div>
	);
}
