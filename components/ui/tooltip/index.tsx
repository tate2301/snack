import React from 'react';
import * as RadixTooltip from '@radix-ui/react-tooltip';

const Tooltip = (props: { children: React.ReactNode; content: string }) => {
	return (
		<RadixTooltip.Provider>
			<RadixTooltip.Root>
				<RadixTooltip.Trigger asChild>{props.children}</RadixTooltip.Trigger>
				<RadixTooltip.Portal>
					<RadixTooltip.Content
						className="bg-white"
						sideOffset={5}>
						{props.content}
						<RadixTooltip.Arrow className="fill-white" />
					</RadixTooltip.Content>
				</RadixTooltip.Portal>
			</RadixTooltip.Root>
		</RadixTooltip.Provider>
	);
};

export default Tooltip;
