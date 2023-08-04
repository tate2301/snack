import InboxListItem from './item';

export default function InboxList(props) {
	return (
		<div className="px-1 py-2">
			<ul className="list-disc">
				<InboxListItem />
			</ul>
		</div>
	);
}
