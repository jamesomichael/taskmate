import React, { Fragment, useState } from 'react';

import Input from './Input';

import { FaRegComments } from 'react-icons/fa6';

import useBoardStore from '@/stores/boardStore';

const comments = [];

const ActiveCardComments = () => {
	const { activeCard, addComment, board } = useBoardStore();
	const [showComments, setShowComments] = useState(true);
	const [newCommentText, setNewCommentText] = useState('');

	const toggleShowComments = () => setShowComments((prev) => !prev);

	const handleNewComment = async (e) => {
		e.preventDefault();
		if (!newCommentText || newCommentText.trim() === '') {
			return;
		}

		await addComment(newCommentText, activeCard.id, board.id);
	};

	return (
		<>
			<FaRegComments size={22} />
			<div className="justify-between flex items-center">
				<span className="font-copy font-semibold">Comments</span>
				<button
					onClick={toggleShowComments}
					className="font-copy font-medium text-sm rounded bg-gray-200 hover:bg-gray-300 px-4 py-2"
				>
					{showComments ? 'Hide all' : 'Show all'}
				</button>
			</div>
			<div className="h-full bg-blue-600 aspect-square rounded-full"></div>
			<form onSubmit={handleNewComment}>
				<Input
					value={newCommentText}
					onChange={(e) => setNewCommentText(e.target.value)}
					placeholder="Write a comment..."
				/>
			</form>
			{showComments &&
				comments?.map((comment, index) => (
					<Fragment key={index}>
						<div className="self-start h-8 bg-blue-600 aspect-square rounded-full"></div>
						<div className="grid grid-rows-[auto,auto,auto]">
							<div className="h-8 flex gap-3 items-center">
								<span className="font-copy font-bold text-sm">
									James
								</span>
								<span className="font-copy text-xs">
									just now
								</span>
							</div>
							<div className="break-words outline outline-[1px] outline-gray-300 shadow-xl rounded p-2">
								<span className="font-copy text-sm">
									{comment.text}
								</span>
							</div>
							<div className="h-6">
								<span className="font-copy font-medium text-xs hover:underline hover:cursor-pointer">
									Delete
								</span>
							</div>
						</div>
					</Fragment>
				))}
			{/* <input type="text" placeholder="Write a comment..." className="" /> */}
		</>
	);
};

export default ActiveCardComments;
