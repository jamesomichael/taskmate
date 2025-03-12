import React, { useState } from 'react';

import Loader from './Loader';

import { BsJustifyLeft } from 'react-icons/bs';

import useBoardStore from '@/stores/boardStore';

const ActiveCardDescription = () => {
	const { activeCard, updateCard } = useBoardStore();
	const [isEditingDescription, setIsEditingDescription] = useState(false);
	const [isLoadingDescription, setIsLoadingDescription] = useState(false);
	const [description, setDescription] = useState(
		activeCard?.description || ''
	);

	const handleDescriptionChange = (e) => {
		setDescription(e.target.value);
	};

	const updateDescription = async () => {
		setIsLoadingDescription(true);
		await updateCard(
			activeCard.id,
			{ description },
			activeCard.board_id,
			activeCard.list_id,
			true
		);
		setIsEditingDescription(false);
		setIsLoadingDescription(false);
	};

	const handleDescriptionCancel = () => {
		setIsEditingDescription(false);
		setDescription(activeCard.description || '');
	};

	return (
		<>
			<BsJustifyLeft size={22} />
			<span className="font-copy font-semibold">Description</span>
			<div></div>
			{isLoadingDescription ? (
				<Loader />
			) : isEditingDescription ? (
				<div className="">
					<textarea
						autoFocus
						placeholder="Add a description..."
						value={description}
						onChange={handleDescriptionChange}
						onFocus={(e) =>
							e.target.setSelectionRange(
								e.target.value.length,
								e.target.value.length
							)
						}
						name="description"
						id="description"
						className="w-full resize-none h-60 rounded p-4 font-copy text-sm outline outline-[1px] outline-gray-400 focus:outline-2 focus:outline-blue-600"
					/>
					<div className="flex gap-2 font-copy text-sm font-medium">
						<button
							onClick={updateDescription}
							className="bg-blue-600 hover:bg-blue-700 py-2 px-4 rounded text-white"
						>
							Save
						</button>
						<button
							onClick={handleDescriptionCancel}
							className="py-2 px-4 rounded hover:bg-gray-300"
						>
							Cancel
						</button>
					</div>
				</div>
			) : activeCard.description ? (
				<textarea
					onClick={() => setIsEditingDescription(true)}
					placeholder={activeCard.description}
					className="resize-none font-copy text-sm font-medium placeholder-black h-60 focus:outline-none rounded cursor-pointer"
				/>
			) : (
				<textarea
					onClick={() => setIsEditingDescription(true)}
					placeholder="Add a more detailed description..."
					className="resize-none font-copy text-sm font-medium placeholder-black h-20 bg-gray-200 hover:bg-gray-300 rounded cursor-pointer p-4"
				/>
			)}
		</>
	);
};

export default ActiveCardDescription;
