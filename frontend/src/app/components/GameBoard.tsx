"use client"
import { useState, useContext } from 'react';
import { BalanceContext } from '../context/BalanceContext';
import Spinner from './Spinner';

const GameBoard = () => {
	  const { balance, updateBalance } = useContext(BalanceContext);
	    const [reels, setReels] = useState<string[]>(['🍒', '🍒', '🍒']);
	      const [result, setResult] = useState<string | null>(null);

	        const spinReels = async () => {
			    const response = await fetch('http://localhost:3001/api/game/spin');
			        const data = await response.json();
				    setReels(data.reels);
				        if (data.isWin) {
						      updateBalance(balance + data.payout);
						            setResult('You win!');
							        } else {
									      setResult('You lose!');
									          }
										    };

										      return (
											          <div className="text-center">
												        <div className="flex justify-center space-x-4 mb-4">
													        {reels.map((symbol, idx) => (
															          <Spinner key={idx} symbol={symbol} />
																          ))}
																	        </div>
																		      <button
																		              onClick={spinReels}
																			              className="px-4 py-2 bg-green-500 text-white rounded-md"
																				            >
																					            Spin
																						          </button>
																							        {result && <p className="mt-4 text-lg">{result}</p>}
																								    </div>
																								      );
};

export default GameBoard;

