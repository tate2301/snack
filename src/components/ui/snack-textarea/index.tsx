import 'remirror/styles/all.css';

import {
	MarkdownToolbar,
	ReactExtensions,
	Remirror,
	ThemeProvider,
	useHelpers,
	useRemirror,
	UseRemirrorReturn,
} from '@remirror/react';
import { MarkdownEditor } from '@remirror/react-editors/markdown';
import md from 'refractor/lang/markdown.js';
import typescript from 'refractor/lang/typescript.js';

import {
	TableExtension,
	BoldExtension,
	DocExtension,
	BlockquoteExtension,
	CodeBlockExtension,
	DropCursorExtension,
	IframeExtension,
	FontSizeExtension,
	HardBreakExtension,
	HeadingExtension,
	HistoryExtension,
	ItalicExtension,
	LinkExtension,
	BulletListExtension,
	ListItemExtension,
	TaskListExtension,
	TaskListItemExtension,
	MarkdownExtension,
	PlaceholderExtension,
	UnderlineExtension,
	WhitespaceExtension,
} from 'remirror/extensions';

import {
	FC,
	TextareaHTMLAttributes,
	useEffect,
	useImperativeHandle,
	useState,
} from 'react';
import { DocChangedExtension } from 'remirror';
import { createContextState } from 'create-context-state';

const extensions = () => [
	new BoldExtension({ weight: 600 }),
	new TableExtension(),
	new BlockquoteExtension(),
	new CodeBlockExtension({
		defaultLanguage: 'js',
	}),
	new DropCursorExtension(),
	new IframeExtension({
		enableResizing: true,
	}),
	new FontSizeExtension({ unit: 'pt' }),
	new HardBreakExtension(),
	new HeadingExtension({}),
	new HistoryExtension({ depth: 15 }),
	new ItalicExtension(),
	new LinkExtension({}),
	new BulletListExtension({}),
	new LinkExtension({ autoLink: true, openLinkOnClick: true }),
	new ListItemExtension({}),
	new TaskListItemExtension(),
	new TaskListExtension(),
	new MarkdownExtension({}),
	new UnderlineExtension(),
	new PlaceholderExtension(),
	new WhitespaceExtension({}),
];

export type RichTextarea = {};

const RichTextarea: FC<TextareaHTMLAttributes<RichTextarea>> = ({
	value,
	onChange,
}) => {
	const [editorValue, setEditorValue] = useState<string>(value as string);
	const { manager } = useRemirror({
		content: (editorValue as string) || '',
		selection: 'start',
		stringHandler: 'html',
		extensions,
	});

	return (
		<Remirror
			classNames={['prose prose-zinc prose-base w-full']}
			initialContent={value as string}
			autoFocus
			autoRender={'end'}
			manager={manager}>
			<MarkdownEditor
				autoFocus
				placeholder="Start typing..."
			/>
		</Remirror>
	);
};

export default RichTextarea;
