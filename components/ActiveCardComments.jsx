import React, { Fragment, useState } from 'react';

import Input from './Input';
import Loader from './Loader';
import Comment from './Comment';

import { FaRegComments } from 'react-icons/fa6';

import useBoardStore from '@/stores/boardStore';
import useAuthStore from '@/stores/authStore';

const ActiveCardComments = () => {
	const { activeCard, isLoadingComments, addComment, board } =
		useBoardStore();
	const { user } = useAuthStore();
	const [showComments, setShowComments] = useState(true);
	const [newCommentText, setNewCommentText] = useState('');

	const { comments = [] } = activeCard;

	const toggleShowComments = () => setShowComments((prev) => !prev);

	const handleCommentCreation = async (e) => {
		e.preventDefault();
		if (!newCommentText || newCommentText.trim() === '') {
			return;
		}

		await addComment(newCommentText, activeCard.id, board.id);
		setNewCommentText('');
	};

	return (
		<>
			<FaRegComments size={22} />
			<div className="justify-between flex items-center">
				<span className="font-copy font-semibold">
					Comments {comments?.length > 0 && `(${comments.length})`}
				</span>
				{comments?.length > 0 && (
					<button
						onClick={toggleShowComments}
						className="font-copy font-medium text-sm rounded bg-gray-200 hover:bg-gray-300 px-4 py-2"
					>
						{showComments ? 'Hide all' : 'Show all'}
					</button>
				)}
			</div>
			<div className="h-full bg-blue-600 aspect-square rounded-full flex justify-center items-center">
				<span className="font-copy text-white text-sm">
					{user?.user_metadata?.display_name?.charAt(0)}
				</span>
			</div>
			<form onSubmit={handleCommentCreation}>
				<Input
					value={newCommentText}
					onChange={(e) => setNewCommentText(e.target.value)}
					placeholder="Write a comment..."
				/>
			</form>
			{isLoadingComments ? (
				<div className="h-20 col-span-2">
					<Loader size={8} />
				</div>
			) : showComments ? (
				comments?.map((comment, index) => (
					<Fragment key={index}>
						<Comment comment={comment} />
					</Fragment>
				))
			) : null}
		</>
	);
};

export default ActiveCardComments;
