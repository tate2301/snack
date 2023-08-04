export type InboxPresenterItemProps = {
	onExpand: () => void;
};

export type InboxItemProps = { id: string } & InboxPresenterItemProps;
