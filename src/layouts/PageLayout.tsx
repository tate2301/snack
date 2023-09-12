import React from "react";

import { ReactNode } from 'react';
import CreateTask from '../components/create/CreateTask';

const PageLayout = (props: {
	children: ReactNode;
	name: string;
	description?: string;
	icon: ReactNode;
}) => {
	return (
		<main className="h-full pb-16">
			<div className="flex items-center justify-between mb-4">
				<div>
					<div className="flex items-center gap-4 mb-1">
						{props.icon}

						<h1 className="text-2xl font-semibold text-surface-12">
							{props.name}
						</h1>
					</div>
					{props.description && (
						<p className="text-xl text-surface-10">{props.description}</p>
					)}
				</div>
				<div className="flex gap-2"></div>
			</div>
			<div className="mb-8">
				<CreateTask />
			</div>

			{props.children}
		</main>
	);
};

export default PageLayout;
