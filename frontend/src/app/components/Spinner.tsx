const Spinner = ({ symbol }: { symbol: string }) => {
	return (
	  <div className="w-16 h-16 flex items-center justify-center text-2xl bg-gray-200 rounded-md">
		{symbol}
	  </div>
	);
  };
  
  export default Spinner;
  