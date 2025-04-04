import React, { useState } from 'react';

import Popover from '../shared/Popover';
import HeaderInput from '../shared/HeaderInput';
import ConfirmModal from '../shared/ConfirmModal';

import { FaEllipsis, FaRegTrashCan } from 'react-icons/fa6';

import useBoardStore from '@/stores/boardStore';

const ListHeader = ({ list }) => {
	const { updateList, deleteList } = useBoardStore();
	const [isModalOpen, setIsModalOpen] = useState(false);

	const handleListDeletion = async () => {
		await deleteList(list.id, list.board_id);
	};

	const saveName = async (updatedName) => {
		await updateList(list.id, { name: updatedName }, list.board_id);
	};

	return (
		<>
			<div className="grid grid-cols-[1fr,auto] gap-1 px-2 pt-2 items-center h-10">
				<HeaderInput
					value={list.name}
					onSave={saveName}
					className="truncate placeholder-black px-2 h-full w-full font-copy text-sm font-semibold hover:cursor-pointer"
				/>
				<Popover
					trigger={
						<div className="w-8 aspect-square rounded hover:cursor-pointer hover:bg-gray-300 flex justify-center items-center">
							<FaEllipsis />
						</div>
					}
				>
					<div className="flex flex-col gap-2 items-center w-40">
						{/* <span className="font-bold font-copy text-sm py-1">
							List actions
						</span> */}
						<div
							onClick={() => setIsModalOpen(true)}
							className="flex gap-2 items-center font-medium text-sm font-copy w-full p-2 hover:bg-red-700 bg-red-600 text-white hover:cursor-pointer"
						>
							<FaRegTrashCan size={14} />
							<span className="">Delete List</span>
						</div>
					</div>
				</Popover>
			</div>

			<ConfirmModal
				isOpen={isModalOpen}
				onCancel={() => setIsModalOpen(false)}
				onClose={() => setIsModalOpen(false)}
				onConfirm={handleListDeletion}
				confirmationButtonText="Delete List"
			>
				<span className="font-copy">
					This list will be permanently deleted. This action cannot be
					undone.
				</span>
			</ConfirmModal>
		</>
	);
};

export default ListHeader;
