import React, { useState } from 'react';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);

import ConfirmModal from './ConfirmModal';

import useBoardStore from '@/stores/boardStore';
import useAuthStore from '@/stores/authStore';

const Comment = ({ comment }) => {
	const { board, activeCard, deleteComment } = useBoardStore();
	const { user } = useAuthStore();
	const [isModalOpen, setIsModalOpen] = useState(false);

	const handleCommentDeletion = async (id) => {
		await deleteComment(id, activeCard.id, board.id);
		setIsModalOpen(false);
	};

	return (
		<>
			<div className="self-start h-8 bg-blue-600 aspect-square rounded-full flex justify-center items-center">
				<span className="font-copy text-white text-sm">
					{user?.user_metadata?.display_name?.charAt(0)}
				</span>
			</div>
			<div className="grid grid-rows-[auto,auto,auto]">
				<div className="h-8 flex gap-3 items-center">
					<span className="font-copy font-bold text-sm">
						{user?.user_metadata?.display_name}
					</span>
					<span
						title={dayjs(comment.created_at).toDate().toString()}
						className="font-copy text-xs"
					>
						{dayjs(comment.created_at).fromNow()}
					</span>
				</div>
				<div className="select-text break-words outline outline-[1px] outline-gray-300 shadow-md rounded px-2 py-1">
					<span className="font-copy text-sm">{comment.text}</span>
				</div>
				<div className="h-6">
					<button
						onClick={() => setIsModalOpen(true)}
						className="font-copy font-medium text-xs hover:underline hover:cursor-pointer"
					>
						Delete
					</button>
				</div>
			</div>

			<ConfirmModal
				isOpen={isModalOpen}
				onCancel={() => setIsModalOpen(false)}
				onClose={() => setIsModalOpen(false)}
				onConfirm={() => handleCommentDeletion(comment.id)}
				confirmationButtonText="Delete Comment"
			>
				<span className="font-copy">
					This comment will be permanently deleted. This action cannot
					be undone.
				</span>
			</ConfirmModal>
		</>
	);
};

export default Comment;
