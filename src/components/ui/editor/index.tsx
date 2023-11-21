import React, { useCallback, useEffect, useState } from 'react';
import { Editor, rootCtx } from '@milkdown/core';
import { nord } from '@milkdown/theme-nord';
import { Milkdown, MilkdownProvider, useEditor } from '@milkdown/react';
import { commonmark } from '@milkdown/preset-commonmark';
import { defaultValueCtx } from '@milkdown/core';
import { block } from '@milkdown/plugin-block';
import { BlockView } from './BlockView';
import { usePluginViewFactory } from '@prosemirror-adapter/react';
import { ProsemirrorAdapterProvider } from '@prosemirror-adapter/react';
import { listener, listenerCtx } from '@milkdown/plugin-listener';

const MilkdownEditor: React.FC<{
	value: string;
	onChange: (value: string) => void;
}> = (props) => {
	const pluginViewFactory = usePluginViewFactory();
	const [defaultValue, setDefaultValue] = useState(props.value);

	useEffect(() => {
		setDefaultValue(props.value);
	}, [props.value]);

	const getEditor = useCallback(
		(root) =>
			Editor.make()
				.config((ctx) => {
					ctx.set(rootCtx, root);
					ctx.set(defaultValueCtx, defaultValue);

					ctx
						.get(listenerCtx)
						.markdownUpdated((ctx, markdown, prevMarkdown) => {
							props.onChange(markdown);
						});

					// ctx.set(block.key, {
					// 	view: pluginViewFactory({
					// 		component: BlockView,
					// 	}),
					// });
				})
				.use(listener)
				// .use(block)
				.use(commonmark),
		[defaultValue],
	);

	const { get } = useEditor(getEditor);

	console.log({ props: props.value, defaultValue });

	return <Milkdown />;
};

export const MilkdownEditorWrapper: React.FC<{
	value: string;
	onChange: (value: string) => void;
}> = (props) => {
	return (
		<MilkdownProvider>
			<ProsemirrorAdapterProvider>
				<MilkdownEditor
					value={props.value}
					onChange={props.onChange}
				/>
			</ProsemirrorAdapterProvider>
		</MilkdownProvider>
	);
};

export const EditorWithoutProvider = (props: {
	value?: string;
	onChange: (value: string) => void;
}) => {
	return (
		<ProsemirrorAdapterProvider>
			<MilkdownEditor
				onChange={props.onChange}
				value={props.value}
			/>
		</ProsemirrorAdapterProvider>
	);
};

export default MilkdownEditor;
