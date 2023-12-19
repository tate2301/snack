import { MagnifyingGlassIcon } from '@heroicons/react/24/solid';

const Search = () => {
	return (
		<div className={'flex items-center space-x-4'}>
			<button className="font-normal flex relative px-2 group group-focus:bg-white w-full border border-surface-6 bg-surface-7 hover:bg-surface-1 hover:text-surface-12 rounded-lg">
				<MagnifyingGlassIcon className="w-5 h-5 text-surface-12" />
				<input
					placeholder="Search"
					className="outline-none w-full h-full p-1 bg-transparent"
				/>
			</button>
		</div>
	);
};

export default Search;
