import React, { useState, useRef } from 'react';

import Modal from '@/components/Modal';
import Popover from '@/components/Popover';

import {
	FaArrowRight,
	FaRegCopy,
	FaRegTrashCan,
	FaRegCircle,
	FaCircleCheck,
	FaRegWindowMaximize,
} from 'react-icons/fa6';
import { BsJustifyLeft } from 'react-icons/bs';

import useBoardStore from '@/stores/boardStore';
import Loader from './Loader';

const ActiveCard = () => {
	const { lists, activeCard, updateCard, deleteCard, setActiveCard } =
		useBoardStore();
	const [isEditingDescription, setIsEditingDescription] = useState(false);
	const [description, setDescription] = useState(
		activeCard?.description || ''
	);
	const [title, setTitle] = useState(activeCard?.title || '');
	const [isLoadingDescription, setIsLoadingDescription] = useState(false);
	const [isComplete, setIsComplete] = useState(
		activeCard?.is_complete || false
	);
	const titleRef = useRef(null);

	const list = activeCard
		? lists.find((list) => list.id === activeCard.list_id)
		: null;

	const handleDescriptionChange = (e) => {
		setDescription(e.target.value);
	};

	const handleTitleChange = (e) => {
		setTitle(e.target.value);
	};

	const saveTitle = async () => {
		if (title !== activeCard.title && title.trim() !== '') {
			await updateCard(
				activeCard.id,
				{ title },
				activeCard.list_id,
				true
			);
		}
	};

	const handleKeyDown = (e) => {
		if (e.key === 'Enter') {
			titleRef.current?.blur();
		}
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

	const handleDescriptionCancel = () => {
		setIsEditingDescription(false);
		setDescription(activeCard.description || '');
	};

	const handleCardDeletion = async () => {
		await deleteCard(activeCard.id, activeCard.list_id);
		setActiveCard(null);
	};

	const toggleCompletionStatus = async () => {
		await updateCard(
			activeCard.id,
			{ is_complete: !isComplete },
			activeCard.list_id,
			true
		);
		setIsComplete((prev) => !prev);
	};

	return activeCard ? (
		<Modal
			isOpen={true}
			onClose={() => setActiveCard(null)}
			width="max-w-3xl"
		>
			<div className="flex flex-col gap-6">
				<div className="grid grid-rows-[auto,auto] grid-cols-[1rem,1fr] items-center gap-x-5 gap-y-1">
					{isComplete ? (
						<FaCircleCheck
							onClick={toggleCompletionStatus}
							title="Mark incomplete"
							className="text-green-600 cursor-pointer"
						/>
					) : (
						<FaRegCircle
							onClick={toggleCompletionStatus}
							title="Mark complete"
							className="cursor-pointer"
						/>
					)}
					<input
						ref={titleRef}
						type="text"
						value={title}
						onChange={handleTitleChange}
						onBlur={saveTitle}
						onKeyDown={handleKeyDown}
						className="truncate -ml-2 w-[95%] px-2 py-1 font-copy font-bold text-lg"
					/>
					<div className="w-full"></div>
					<span className="font-copy text-sm flex items-center gap-0.5">
						in list&nbsp;
						<span className="bg-gray-300 text-gray-700 font-bold px-2 text-xs rounded">
							{list.name}
						</span>
					</span>
				</div>
				<div className="grid grid-rows-[1fr,auto] sm:grid-rows-none sm:grid-cols-[1fr,auto] gap-4">
					<div className="grid grid-rows-[auto,auto] grid-cols-[1rem,1fr] items-center gap-x-5 gap-y-2">
						<BsJustifyLeft size={22} />
						<span className="font-copy font-semibold">
							Description
						</span>
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
							<div className="relative">
								<Popover
									trigger={
										<div className="flex gap-2 items-center font-medium text-sm font-copy w-full p-2 bg-gray-200 hover:bg-gray-300 hover:cursor-pointer rounded">
											<FaRegWindowMaximize size={15} />
											<span>Cover</span>
										</div>
									}
								>
									<div className="w-48">
										<p className="text-sm font-medium">
											Choose a cover
										</p>
										<div className="grid grid-cols-3 gap-2 mt-2">
											<div className="w-12 h-12 bg-red-500 cursor-pointer rounded"></div>
											<div className="w-12 h-12 bg-blue-500 cursor-pointer rounded"></div>
											<div className="w-12 h-12 bg-green-500 cursor-pointer rounded"></div>
										</div>
									</div>
								</Popover>
							</div>
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
