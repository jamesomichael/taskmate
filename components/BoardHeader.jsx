import React, { useState, useRef } from 'react';

import { FaRegStar, FaStar } from 'react-icons/fa6';

import useBoardStore from '@/stores/boardStore';

const BoardHeader = ({ id, isStarred, name: initialName }) => {
	const { updateBoard } = useBoardStore();
	const [name, setName] = useState(initialName);
	const nameRef = useRef(null);

	const toggleStarredStatus = async (e) => {
		e.preventDefault();
		updateBoard(id, { is_starred: !isStarred });
	};

	const handleNameChange = (e) => {
		setName(e.target.value);
	};

	const saveName = async () => {
		if (name !== initialName && name.trim() !== '') {
			await updateBoard(id, { name });
		}
	};

	const handleKeyDown = (e) => {
		if (e.key === 'Enter') {
			nameRef.current?.blur();
		}
	};

	return (
		<div className="h-14 bg-black bg-opacity-45 flex gap-4 items-center px-4 py-3">
			<input
				ref={nameRef}
				type="text"
				value={name}
				onChange={handleNameChange}
				onBlur={saveName}
				onKeyDown={handleKeyDown}
				className="truncate px-2 h-full font-copy font-semibold text-white text-lg bg-transparent hover:cursor-pointer hover:bg-white hover:bg-opacity-25 focus:text-black focus:bg-white rounded"
			/>
			<div
				onClick={toggleStarredStatus}
				className="h-full aspect-square rounded flex justify-center items-center text-yellow-400 hover:bg-white hover:bg-opacity-25 hover:cursor-pointer text-sm"
			>
				{isStarred ? <FaStar /> : <FaRegStar className="text-white" />}
			</div>
		</div>
	);
};

export default BoardHeader;
