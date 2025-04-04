import React, { useState } from 'react';
import Link from 'next/link';

import ContextMenu from '../shared/ContextMenu';
import ConfirmModal from '../shared/ConfirmModal';

import { FaStar, FaRegStar } from 'react-icons/fa6';

import useBoardStore from '@/stores/boardStore';

const BoardsGridItem = ({ board }) => {
	const { updateBoard, deleteBoard } = useBoardStore();
	const [isModalOpen, setIsModalOpen] = useState(false);

	const toggleStarredStatus = async (e) => {
		e.preventDefault();
		updateBoard(board.id, { is_starred: !board.is_starred });
	};

	const handleBoardDeletion = async () => {
		await deleteBoard(board.id);
	};

	return (
		<>
			<ContextMenu
				trigger={
					<Link
						href={`/board/${board.id}`}
						className={`relative h-24 rounded bg-gradient-to-br ${board.background} flex flex-col justify-between p-2 group`}
					>
						<div className="absolute rounded inset-0 bg-black w-full bg-opacity-10 group-hover:bg-opacity-50"></div>
						<span
							title={board.name}
							className="relative text-white font-bold drop-shadow-md truncate"
						>
							{board.name}
						</span>
						<button
							onClick={toggleStarredStatus}
							className="flex justify-end z-10 text-white"
						>
							{board.is_starred ? (
								<FaStar
									size={14}
									className="text-yellow-400 transition-opacity duration-200 hover:scale-125"
								/>
							) : (
								<FaRegStar
									size={14}
									className="hover:scale-125 hover:text-yellow-400 group-hover:opacity-100 opacity-0 transform translate-x-full group-hover:translate-x-0 transition-transform duration-200"
								/>
							)}
						</button>
					</Link>
				}
				actions={[
					{
						label: 'Delete Board',
						onClick: () => setIsModalOpen(true),
					},
				]}
			/>

			<ConfirmModal
				isOpen={isModalOpen}
				onCancel={() => setIsModalOpen(false)}
				onClose={() => setIsModalOpen(false)}
				onConfirm={handleBoardDeletion}
				confirmationButtonText="Delete Board"
			>
				<span className="font-copy">
					<span className="font-semibold">"{board.name}"</span> and
					all its contents will be permanently deleted. This action
					cannot be undone.
				</span>
			</ConfirmModal>
		</>
	);
};

export default BoardsGridItem;
