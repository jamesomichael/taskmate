import React, { useState } from 'react';

import Modal from '@/components/Modal';

import { FaArrowRight, FaRegCopy, FaRegTrashCan } from 'react-icons/fa6';

import useBoardStore from '@/stores/boardStore';
import Loader from './Loader';

const ActiveCard = () => {
	const { lists, activeCard, updateCard, deleteCard, setActiveCard } =
		useBoardStore();
	const [isEditingDescription, setIsEditingDescription] = useState(false);
	const [description, setDescription] = useState(
		activeCard?.description || ''
	);
	const [isLoadingDescription, setIsLoadingDescription] = useState(false);

	const list = activeCard
		? lists.find((list) => list.id === activeCard.list_id)
		: null;

	const handleDescriptionChange = (e) => {
		setDescription(e.target.value);
	};

	const updateDescription = async () => {
		setIsLoadingDescription(true);
		await updateCard(
			activeCard.id,
			{ description },
			activeCard.list_id,
			true
		);
		setIsEditingDescription(false);
		setIsLoadingDescription(false);
	};

	const handleCardDeletion = async () => {
		await deleteCard(activeCard.id, activeCard.list_id);
		setActiveCard(null);
	};

	return activeCard ? (
		<Modal
			isOpen={true}
			onClose={() => setActiveCard(null)}
			width="max-w-3xl"
		>
			<div className="flex flex-col gap-6">
				<div className="flex flex-col gap-0.5">
					<span className="font-copy font-bold text-lg">
						{activeCard.title}
					</span>
					<span className="font-copy text-sm flex items-center gap-0.5">
						in list&nbsp;
						<span className="bg-gray-300 text-gray-700 font-bold px-2 text-xs rounded">
							{list.name}
						</span>
					</span>
				</div>
				<div className="grid grid-cols-[1fr,auto] gap-4">
					<div className="flex flex-col gap-2">
						<span className="font-copy font-semibold">
							Description
						</span>
						{isLoadingDescription ? (
							<Loader />
						) : isEditingDescription ? (
							<>
								<textarea
									placeholder="Add a description..."
									value={description}
									onChange={handleDescriptionChange}
									name="description"
									id="description"
									className="resize-none h-60 rounded p-2 font-copy text-sm outline outline-[1px] outline-gray-400 focus:outline-2 focus:outline-blue-600"
								/>
								<div className="flex gap-2 font-copy text-sm font-medium">
									<button
										onClick={updateDescription}
										className="bg-blue-600 hover:bg-blue-700 py-2 px-4 rounded text-white"
									>
										Save
									</button>
									<button
										onClick={() =>
											setIsEditingDescription(false)
										}
										className="py-2 px-4 rounded hover:bg-gray-300"
									>
										Cancel
									</button>
								</div>
							</>
						) : activeCard.description ? (
							<textarea
								onClick={() => setIsEditingDescription(true)}
								placeholder={activeCard.description}
								className="resize-none font-copy text-sm font-medium placeholder-black h-fit max-h-60 focus:outline-none rounded cursor-pointer p-4"
							/>
						) : (
							<textarea
								onClick={() => setIsEditingDescription(true)}
								placeholder="Add a more detailed description..."
								className="resize-none font-copy text-sm font-medium placeholder-black h-20 bg-gray-200 hover:bg-gray-300 rounded cursor-pointer p-4"
							/>
						)}
					</div>
					<div className="w-40 flex flex-col">
						<div className="flex flex-col gap-2">
							<span className="text-xs font-copy font-semibold">
								Actions
							</span>
							{/* <div className="-mt-1 flex gap-2 items-center font-medium text-sm font-copy w-full p-2 bg-gray-200 hover:bg-gray-300 hover:cursor-pointer rounded">
								<FaArrowRight size={15} />
								<span>Move</span>
							</div> */}
							{/* <div className="flex gap-2 items-center font-medium text-sm font-copy w-full p-2 bg-gray-200 hover:bg-gray-300 hover:cursor-pointer rounded">
								<FaRegCopy size={15} />
								<span>Copy</span>
							</div> */}
							<div
								onClick={handleCardDeletion}
								className="flex gap-2 items-center font-medium text-sm font-copy w-full p-2 hover:bg-red-700 bg-red-600 text-white hover:cursor-pointer rounded"
							>
								<FaRegTrashCan size={15} />
								<span>Delete</span>
							</div>
						</div>
					</div>
				</div>
			</div>
		</Modal>
	) : null;
};

export default ActiveCard;
