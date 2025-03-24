import React, { Fragment, useState } from 'react';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);

import Input from './Input';
import Loader from './Loader';

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

	const handleNewComment = async (e) => {
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
				<span className="font-copy font-semibold">Comments</span>
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
			<form onSubmit={handleNewComment}>
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
									title={dayjs(comment.created_at)
										.toDate()
										.toString()}
									className="font-copy text-xs"
								>
									{dayjs(comment.created_at).fromNow()}
								</span>
							</div>
							<div className="select-text break-words outline outline-[1px] outline-gray-300 shadow-md rounded px-2 py-1">
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
				))
			) : null}
		</>
	);
};

export default ActiveCardComments;
