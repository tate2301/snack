import Dropdown from '../../../../../components/ui/dropdown-menu';

type ContextMenu = {
	isOpen: boolean;
	onClose: () => void;
};

export default function ContextMenu(props: ContextMenu) {
	return (
		<Dropdown
			open={props.isOpen}
			onOpenChange={(open) => props.onClose()}>
			<Dropdown.Content>
				<Dropdown.Item>
					<Dropdown.Item>Copy</Dropdown.Item>
				</Dropdown.Item>
			</Dropdown.Content>
		</Dropdown>
	);
}
