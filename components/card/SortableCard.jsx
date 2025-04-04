import React from 'react';
import { useSortable } from '@dnd-kit/sortable';

import Card from './Card';

const SortableCard = ({ card }) => {
	const { attributes, listeners, setNodeRef, transform, transition } =
		useSortable({ ...card });

	return (
		<div ref={setNodeRef} {...attributes} {...listeners}>
			<Card card={card} />
		</div>
	);
};

export default SortableCard;
