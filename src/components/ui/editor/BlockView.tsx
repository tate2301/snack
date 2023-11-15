import { RectangleStackIcon } from '@heroicons/react/24/outline';
import { BlockProvider } from '@milkdown/plugin-block';
import { useInstance } from '@milkdown/react';
import { usePluginViewContext } from '@prosemirror-adapter/react';
import { useEffect, useRef } from 'react';

export const BlockView = () => {
	const ref = useRef<HTMLDivElement>(null);
	const tooltipProvider = useRef<BlockProvider>();

	const { view } = usePluginViewContext();
	const [loading, get] = useInstance();

	useEffect(() => {
		const div = ref.current;
		if (loading || !div) return;

		const editor = get();
		if (!editor) return;

		tooltipProvider.current = new BlockProvider({
			ctx: editor.ctx,
			content: div,
		});

		return () => {
			tooltipProvider.current?.destroy();
		};
	}, [loading]);

	useEffect(() => {
		tooltipProvider.current?.update(view);
	});

	return (
		<div data-desc="This additional wrapper is useful for keeping tooltip component during HMR">
			<div
				ref={ref}
				className="p-1 rounded-lg bg-surface-2 hover:bg-surface-4 cursor-grab w-fit">
				<RectangleStackIcon className="w-5 h-5" />
			</div>
		</div>
	);
};
