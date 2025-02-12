import React from 'react';

import List from '@/components/List';
import AddList from '@/components/AddList';

import { createClient } from '@/utils/supabase/server';
import {
	getBoardById,
	getLists,
	createList,
} from '@/services/database.service';

const handleListCreation = async (name, boardId) => {
	'use server';
	const supabase = await createClient();
	const {
		data: { user },
	} = await supabase.auth.getUser();
	console.log('name', name);
	console.log('boardId', boardId);
	console.log('user.id', user.id);
	const data = await createList(name, boardId, null, user.id, supabase);
	return data;
};

const BoardPage = async ({ params }) => {
	const { id } = await params;
	const supabase = await createClient();
	const {
		data: { user },
		error,
	} = await supabase.auth.getUser();

	const board = await getBoardById(id, user.id, supabase);
	const lists = await getLists(id, user.id, supabase);

	return !board ? (
		<div className="flex justify-center items-center h-full">
			<span className="font-heading">Board not found.</span>
		</div>
	) : (
		<div
			className={`grid grid-rows-[auto,1fr] bg-gradient-to-br ${board.background} h-full overflow-hidden w-full`}
		>
			<div className="h-14 bg-black bg-opacity-45 flex items-center px-4">
				<span className="font-copy font-semibold text-white text-lg">
					{board.name}
				</span>
			</div>
			<div className="p-3 flex gap-3 w-full overflow-x-scroll">
				{lists.map((list) => (
					<List boardId={board.id} list={list} />
				))}
				<AddList boardId={board.id} onCreate={handleListCreation} />
				{/* <div className="min-w-full sm:min-w-72 h-12 rounded-xl bg-black bg-opacity-30 hover:bg-opacity-20 hover:cursor-pointer flex items-center gap-2 px-3 text-white font-copy text-sm font-medium">
					<FaPlus />
					<span>Add a list</span>
				</div> */}
				{/* <div className="min-w-72 grid grid-rows-[auto,1fr,auto] h-full bg-blue-400 rounded-xl">
					<div className="h-12">List name goes here</div>
					<div className="overflow-y-auto text-xl">
						Lorem ipsum dolor, sit amet consectetur adipisicing
						elit. Vero quos inventore fugiat optio dolor! Repellat
						vel placeat quod distinctio. Ex iusto recusandae sed,
						eaque cumque odit tenetur vero est praesentium. Lorem
						ipsum dolor, sit amet consectetur adipisicing elit. Vero
						quos inventore fugiat optio dolor! Repellat vel placeat
						quod distinctio. Ex iusto recusandae sed, eaque cumque
						odit tenetur vero est praesentium. Lorem ipsum dolor,
						sit amet consectetur adipisicing elit. Vero quos
						inventore fugiat optio dolor! Repellat vel placeat quod
						distinctio. Ex iusto recusandae sed, eaque cumque odit
						tenetur vero est praesentium. Lorem ipsum dolor, sit
						amet consectetur adipisicing elit. Vero quos inventore
						fugiat optio dolor! Repellat vel placeat quod
						distinctio. Ex iusto recusandae sed, eaque cumque odit
						tenetur vero est praesentium. Lorem ipsum dolor, sit
						amet consectetur adipisicing elit. Vero quos inventore
						fugiat optio dolor! Repellat vel placeat quod
						distinctio. Ex iusto recusandae sed, eaque cumque odit
						tenetur vero est praesentium. Lorem ipsum dolor, sit
						amet consectetur adipisicing elit. Vero quos inventore
						fugiat optio dolor! Repellat vel placeat quod
						distinctio. Ex iusto recusandae sed, eaque cumque odit
						tenetur vero est praesentium. Lorem ipsum dolor, sit
						amet consectetur adipisicing elit. Vero quos inventore
						fugiat optio dolor! Repellat vel placeat quod
						distinctio. Ex iusto recusandae sed, eaque cumque odit
						tenetur vero est praesentium. Lorem ipsum dolor, sit
						amet consectetur adipisicing elit. Vero quos inventore
						fugiat optio dolor! Repellat vel placeat quod
						distinctio. Ex iusto recusandae sed, eaque cumque odit
						tenetur vero est praesentium. Lorem ipsum dolor, sit
						amet consectetur adipisicing elit. Vero quos inventore
						fugiat optio dolor! Repellat vel placeat quod
						distinctio. Ex iusto recusandae sed, eaque cumque odit
						tenetur vero est praesentium. v
					</div>
					<div className="h-12 bg-white bg-opacity-40 rounded-lg hover:bg-opacity-30 hover:cursor-pointer flex items-center gap-2 px-3 text-white font-copy text-sm font-medium">
						<FaPlus />
						<span>Add a list</span>
					</div>
				</div> */}

				{/* Placeholders */}
				{/* <div className="h-12 min-w-72 bg-white bg-opacity-40 rounded-lg hover:bg-opacity-30 hover:cursor-pointer flex items-center gap-2 px-3 text-white font-copy text-sm font-medium">
					<FaPlus />
					<span>Add a list</span>
				</div>
				<div className="h-12 min-w-72 bg-white bg-opacity-40 rounded-lg hover:bg-opacity-30 hover:cursor-pointer flex items-center gap-2 px-3 text-white font-copy text-sm font-medium">
					<FaPlus />
					<span>Add a list</span>
				</div>
				<div className="h-12 min-w-72 bg-white bg-opacity-40 rounded-lg hover:bg-opacity-30 hover:cursor-pointer flex items-center gap-2 px-3 text-white font-copy text-sm font-medium">
					<FaPlus />
					<span>Add a list</span>
				</div>
				<div className="h-12 min-w-72 bg-white bg-opacity-40 rounded-lg hover:bg-opacity-30 hover:cursor-pointer flex items-center gap-2 px-3 text-white font-copy text-sm font-medium">
					<FaPlus />
					<span>Add a list</span>
				</div>
				<div className="h-12 min-w-72 bg-white bg-opacity-40 rounded-lg hover:bg-opacity-30 hover:cursor-pointer flex items-center gap-2 px-3 text-white font-copy text-sm font-medium">
					<FaPlus />
					<span>Add a list</span>
				</div>
				<div className="h-12 min-w-72 bg-white bg-opacity-40 rounded-lg hover:bg-opacity-30 hover:cursor-pointer flex items-center gap-2 px-3 text-white font-copy text-sm font-medium">
					<FaPlus />
					<span>Add a list</span>
				</div>
				<div className="h-12 min-w-72 bg-white bg-opacity-40 rounded-lg hover:bg-opacity-30 hover:cursor-pointer flex items-center gap-2 px-3 text-white font-copy text-sm font-medium">
					<FaPlus />
					<span>Add a list</span>
				</div>
				<div className="h-12 min-w-72 bg-white bg-opacity-40 rounded-lg hover:bg-opacity-30 hover:cursor-pointer flex items-center gap-2 px-3 text-white font-copy text-sm font-medium">
					<FaPlus />
					<span>Add a list</span>
				</div>
				<div className="h-12 min-w-72 bg-white bg-opacity-40 rounded-lg hover:bg-opacity-30 hover:cursor-pointer flex items-center gap-2 px-3 text-white font-copy text-sm font-medium">
					<FaPlus />
					<span>Add a list</span>
				</div> */}
			</div>
		</div>
	);
};

export default BoardPage;
