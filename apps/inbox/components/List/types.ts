export type DNDItemProps = {
	attributes: any;
	listeners: any;
	setNodeRef: any;
	transform: any;
	style: any;
};

export type InboxPresenterItemProps = {
	onExpand: () => void;
} & DNDItemProps;

export type InboxItemProps = { id: string } & InboxPresenterItemProps;
