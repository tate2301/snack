import { ReactNode } from 'react';

const PageLayout = (props: {
	children: ReactNode;
	name?: string;
	description?: string;
	icon?: ReactNode;
}) => {
	return (
		<main className="h-full overflow-y-auto">
			<div id="createTask" />

			{props.children}
		</main>
	);
};

export default PageLayout;
