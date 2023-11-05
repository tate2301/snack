import EditorJS from '@editorjs/editorjs';
import { useEffect, useRef } from 'react';
import Code from '@editorjs/code';
import Header from '@editorjs/header';
import Quote from '@editorjs/quote';
import Checklist from '@editorjs/checklist';
import Table from '@editorjs/table';

const EJLaTeX = require('editorjs-latex');

const BlockEditor = () => {
	const editor = useRef(null);

	useEffect(() => {
		if (!editor.current) {
			editor.current = new EditorJS({
				/**
				 * Id of Element that should contain Editor instance
				 */
				holder: 'editorjs',
				placeholder: 'Press SHIFT + Enter and start typing.',
				tools: {
					header: Header,
					quote: Quote,
					checklist: {
						class: Checklist,
						inlineToolbar: true,
					},
					code: Code,
					Math: {
						class: EJLaTeX,
						shortcut: 'CMD+SHIFT+M',
					},
					table: {
						class: Table,
						inlineToolbar: true,
						config: {
							rows: 2,
							cols: 3,
						},
					},
				},
			});
		}
	}, []);

	return (
		<div
			className=" w-full max-w-full"
			id="editorjs"></div>
	);
};

export default BlockEditor;
