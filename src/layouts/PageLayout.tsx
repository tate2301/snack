import React from 'react';

import { ReactNode } from 'react';
import CreateTask from '../components/create/CreateTask';

const PageLayout = (props: {
	children: ReactNode;
	name: string;
	description?: string;
	icon: ReactNode;
}) => {
	return (
		<main className="h-full pb-16 px-2">
			<div id="createTask" />

			{props.children}
		</main>
	);
};

export default PageLayout;
