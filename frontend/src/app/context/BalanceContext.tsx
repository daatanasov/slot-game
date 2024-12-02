"use client"
import { createContext, useState, ReactNode } from 'react';

type BalanceContextType = {
	  balance: number;
	    updateBalance: (newBalance: number) => void;
};

export const BalanceContext = createContext<BalanceContextType>({
	  balance: 100,
	    updateBalance: () => {},
});

	    export const BalanceProvider = ({ children }: { children: ReactNode }) => {
		      const [balance, setBalance] = useState(100);

		        const updateBalance = (newBalance: number) => {
				    setBalance(newBalance);
				      };

				        return (
						    <BalanceContext.Provider value={{ balance, updateBalance }}>
						          {children}
							      </BalanceContext.Provider>
							        );
	    };

