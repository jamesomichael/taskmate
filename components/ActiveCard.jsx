import React from 'react';

import Modal from '@/components/Modal';
import ActiveCardHeader from './ActiveCardHeader';
import ActiveCardContent from './ActiveCardContent';

import useBoardStore from '@/stores/boardStore';

const ActiveCard = () => {
	const { activeCard, setActiveCard } = useBoardStore();

	return activeCard ? (
		<Modal
			isOpen={true}
			onClose={() => setActiveCard(null)}
			width="max-w-3xl"
			cover={activeCard.cover}
		>
			<div className="flex flex-col gap-6">
				<ActiveCardHeader />
				<ActiveCardContent />
			</div>
		</Modal>
	) : null;
};

export default ActiveCard;
