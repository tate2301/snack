import React from 'react';
import { Editor, rootCtx } from '@milkdown/core';
import { nord } from '@milkdown/theme-nord';
import { Milkdown, MilkdownProvider, useEditor } from '@milkdown/react';
import { commonmark } from '@milkdown/preset-commonmark';
import { defaultValueCtx } from '@milkdown/core';

const MilkdownEditor: React.FC<{ value: string }> = (props) => {
	const { get } = useEditor((root) =>
		Editor.make()
			.config(nord)
			.config((ctx) => {
				ctx.set(rootCtx, root);
				ctx.set(defaultValueCtx, props.value);
			})
			.use(commonmark),
	);

	return <Milkdown />;
};

export const MilkdownEditorWrapper: React.FC<{ value: string }> = (props: {
	value?: string;
}) => {
	return (
		<MilkdownProvider>
			<MilkdownEditor value={props.value} />
		</MilkdownProvider>
	);
};

export const EditorWithoutProvider = (props: { value?: string }) => {
	return <MilkdownEditor value={props.value} />;
};

export default MilkdownEditor;
