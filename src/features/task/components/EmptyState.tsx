import SFSymbol from '../../../assets/icons/SFSymbol';

export default function TaskPageEmptyState() {
	return (
		<div className="py-2 w-full h-full flex items-center justify-center">
			<div className={'text-center'}>
				<SFSymbol
					name={'lightbulb'}
					color={'#707070'}
					className={'!w-12 !h-12 mx-auto mb-5'}
				/>
				<h1 className={'title-2 text-surface-12 mb-1 mx-auto'}>
					You're a productivity superstar!
				</h1>
				<p className={'mx-auto'}>
					Congratulations on completing all your tasks for today.
				</p>
			</div>
		</div>
	);
}
