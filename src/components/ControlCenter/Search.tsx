import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';

const SearchField = () => {
	return (
		<button className="w-full hover:bg-zinc-900/5 border border-zinc-900/10 py-1.5 px-2 gap-2 rounded-lg font-normal flex">
			<MagnifyingGlassIcon className="w-5 h-5" />
			Search
		</button>
	);
};

export default SearchField;
