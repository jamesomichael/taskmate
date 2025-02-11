import React from 'react';

const BoardPage = async ({ params }) => {
	const { id } = await params;
	return <div>{id}</div>;
};

export default BoardPage;
