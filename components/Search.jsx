'use client';
import React from 'react';
import { HiMiniMagnifyingGlass } from 'react-icons/hi2';

const Search = () => {
	return (
		<form
			onSubmit={() => alert('Search')}
			className="relative group h-full w-full flex justify-end"
		>
			<div className="relative w-56 transition-all duration-300 group-focus-within:w-full">
				<label
					htmlFor="search"
					className="absolute inset-y-0 left-2 flex items-center text-gray-500"
				>
					<HiMiniMagnifyingGlass size={15} />
				</label>
				<input
					id="search"
					type="text"
					placeholder="Search"
					className="pl-8 px-3 h-full w-full rounded bg-transparent outline outline-[1px] placeholder-gray-500 outline-gray-500 font-copy text-sm 
                    transition-all duration-300 focus:outline-blue-500 focus:outline-2"
				/>
			</div>
		</form>
	);
};

export default Search;
