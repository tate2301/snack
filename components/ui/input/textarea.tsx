import clsx from 'clsx';

interface TextareaProps
	extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

const Textarea = (props: TextareaProps) => {
	return (
		<textarea
			{...props}
			className={clsx(
				props.className,
				'w-full p-1 placeholder:text-zinc-400 form-textarea resize-none h-auto border-none focus:ring-0',
			)}></textarea>
	);
};

export default Textarea;
