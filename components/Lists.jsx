import React, { useState, useRef } from 'react';
import { DndContext, DragOverlay, closestCorners } from '@dnd-kit/core';

import List from '@/components/List';
import AddList from '@/components/AddList';
import Card from './Card';

import useBoardStore from '@/stores/boardStore';

const Lists = () => {
	const { lists } = useBoardStore();
	const [activeId, setActiveId] = useState();

	const boardRef = useRef(null);
	let isDown = false;
	let startX;
	let scrollLeft;

	const handleMouseDown = (e) => {
		const isList = e.target.closest('.list');
		if (isList) {
			return;
		}
		isDown = true;
		startX = e.pageX - boardRef.current.offsetLeft;
		scrollLeft = boardRef.current.scrollLeft;
	};

	const handleMouseLeave = () => {
		isDown = false;
	};

	const handleMouseUp = () => {
		isDown = false;
	};

	const handleMouseMove = (e) => {
		if (!isDown) {
			return;
		}
		e.preventDefault();
		const x = e.pageX - boardRef.current.offsetLeft;
		const walk = (x - startX) * 1.5;
		boardRef.current.scrollLeft = scrollLeft - walk;
	};

	const handleDragStart = (event) => {
		const { active } = event;
		const { id } = active;
		setActiveId(id);
		console.log('activeId', id);
	};

	const handleDragOver = (event) => {
		console.log('event', event);
	};

	const handleDragEnd = (event) => {
		// console.log('event', event);
	};

	return (
		<div
			ref={boardRef}
			className="p-3 flex gap-3 w-full overflow-x-scroll"
			onMouseDown={handleMouseDown}
			onMouseLeave={handleMouseLeave}
			onMouseUp={handleMouseUp}
			onMouseMove={handleMouseMove}
		>
			<DndContext
				collisionDetection={closestCorners}
				onDragStart={handleDragStart}
				onDragOver={handleDragOver}
				onDragEnd={handleDragEnd}
			>
				{lists.map((list) => (
					<List key={list.id} list={list} />
				))}
				<DragOverlay>
					{activeId && (
						<Card
							card={{
								id: 'test-card-1',
								title: 'Test Card 1',
							}}
						/>
					)}
				</DragOverlay>
			</DndContext>
			<AddList />
		</div>
	);
};

export default Lists;
