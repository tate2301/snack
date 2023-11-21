import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';

const SearchField = () => {
	return (
		<div className="font-normal flex relative">
			<MagnifyingGlassIcon className="w-5 h-5 absolute left-2 top-[50%] -translate-y-[50%] " />
			<input
				placeholder="Search"
				className="w-full h-full rounded-lg pl-8 py-2 bg-surface-3 focus:shadow-sm focus:ring-2 focus:bg-white outline outline-zinc-900/10"
			/>
		</div>
	);
};

export default SearchField;
