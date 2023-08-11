export type DNDItemProps = {
	attributes: any;
	listeners: any;
	setNodeRef: any;
	transform: any;
	style: any;
	isDragging: boolean;
};

export type InboxPresenterItemProps = {
	onExpand: () => void;
} & DNDItemProps;

export type InboxItemProps = { id: string } & InboxPresenterItemProps;
