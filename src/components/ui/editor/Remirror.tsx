import 'remirror/styles/all.css';

import { Remirror, useRemirror } from '@remirror/react';

export const MyEditor = ({ content }, { content: string }) => {
	const { manager, state } = useRemirror({
		content,
		selection: 'start',
		stringHandler: 'html',
	});

	return (
		<div className="remirror-theme">
			{/* the className is used to define css variables necessary for the editor */}
			<Remirror
				manager={manager}
				initialContent={state}
			/>
		</div>
	);
};
