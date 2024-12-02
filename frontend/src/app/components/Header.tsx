"use client"
import { useContext } from 'react';
import { BalanceContext } from '../context/BalanceContext';

const Header = () => {
	  const { balance } = useContext(BalanceContext);

	    return (
		        <header className="p-4 bg-blue-500 text-white text-center">
			      <h1 className="text-2xl font-bold">Slot Game</h1>
			            <p>Balance: ${balance}</p>
				        </header>
					  );
};

export default Header;

