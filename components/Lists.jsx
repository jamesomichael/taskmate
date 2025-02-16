import React, { useState, useRef } from 'react';
import { DndContext, DragOverlay, closestCorners } from '@dnd-kit/core';

import List from '@/components/List';
import AddList from '@/components/AddList';
import Card from './Card';

import useBoardStore from '@/stores/boardStore';

const Lists = () => {
	const { lists, moveCard, saveCards } = useBoardStore();
	const [activeItem, setActiveItem] = useState();

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

	const getContainer = (id) => {
		const container = lists.find(
			(list) =>
				list.id === id || list.cards.some((card) => card.id === id)
		);
		if (container) {
			return container;
		}
		return null;
	};

	const handleDragStart = (event) => {
		const { active } = event;
		const { id } = active;
		const container = getContainer(id);
		const item = container.cards.find((card) => card.id === id);
		setActiveItem(item);
	};

	const handleDragOver = (event) => {
		const { active, over } = event;
		const startContainer = getContainer(active.id);
		const overContainer = getContainer(over.id);

		if (!startContainer || !overContainer) {
			return;
		}

		const startIndex = startContainer.cards.findIndex(
			(card) => card.id === active.id
		);
		const overIndex = overContainer.cards.findIndex(
			(card) => card.id === over.id
		);

		if (
			startContainer.id === overContainer.id &&
			startIndex === overIndex
		) {
			// Card has not moved.
			return;
		}

		moveCard(
			activeItem,
			startContainer,
			overContainer,
			startIndex,
			overIndex
		);
	};

	const handleDragEnd = (event) => {
		saveCards();
		setActiveItem(null);
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
					{activeItem && <Card card={activeItem} />}
				</DragOverlay>
			</DndContext>
			<AddList />
		</div>
	);
};

export default Lists;
