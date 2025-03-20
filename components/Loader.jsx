const Loader = ({ size = 10 }) => {
	return (
		<div className="flex items-center justify-center w-full h-full">
			<div
				className={`w-${size} h-${size} aspect-square border-2 border-t-transparent border-blue-600 rounded-full animate-spin`}
			></div>
		</div>
	);
};

export default Loader;
