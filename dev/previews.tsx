import React from 'react';
import { ComponentPreview, Previews } from '@react-buddy/ide-toolbox';
import { PaletteTree } from './palette';
import Page from '../pages';
import App from '../pages/_app';
import Task from '../pages/task/[taskId]';

const ComponentPreviews = () => {
	return (
		<Previews palette={<PaletteTree />}>
			<ComponentPreview path='/Page'>
				<Page />
			</ComponentPreview>
			<ComponentPreview path='/App'>
				<App />
			</ComponentPreview>
			<ComponentPreview path='/Task'>
				<Task />
			</ComponentPreview>
		</Previews>
	);
};

export default ComponentPreviews;