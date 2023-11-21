import { useState, useRef, useMemo, useEffect } from 'react';
import { electron } from '../../lib/core/electron';
import { ipcRenderer } from 'electron';
import clsx from 'clsx';
import data from '@emoji-mart/data';
import Picker from '@emoji-mart/react';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { cn } from '../../lib/utils';

const EmojiPicker = (props: {
	onChange: (emoji: string) => void;
	value?: string;
	size?: 'xl' | 'md' | 'sm';
}) => {
	const [value, setvalue] = useState(props.value ? props.value : '🚀');

	useEffect(() => {
		props.onChange(value);
	}, [value]);

	useEffect(() => {
		setvalue(props.value);
	}, [props.value]);

	const sizes = {
		xl: 'text-7xl',
		md: 'text-4xl',
		normal: '',
	};

	return (
		<Popover>
			<PopoverTrigger
				className={cn(
					'rounded-xl py-1 px-2 hover:bg-surface-4',
					props.size ? sizes[props.size] : 'text-lg',
				)}>
				{props.value ?? '😊'}
			</PopoverTrigger>
			<PopoverContent>
				<Picker
					data={data}
					onEmojiSelect={props.onChange}
					native={true}
					theme="dark"
					previewPosition="none"
				/>
			</PopoverContent>
		</Popover>
	);
};

export default EmojiPicker;
