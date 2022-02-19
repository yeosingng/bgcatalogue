import { createContext, useContext, useState } from 'react';

const GameContext = createContext({
  selectedGame: null,
  setSelectedGame: () => {},
});

const GameContextProvider = (({ children }) => {
  const [selectedGame, setSelectedGame] = useState(null);

  return (
    <GameContext.Provider value={{ selectedGame, setSelectedGame }}>
      {children}
    </GameContext.Provider>
  )
})

export const useGameContext = () => {
  return useContext(GameContext);
}

export default GameContextProvider;