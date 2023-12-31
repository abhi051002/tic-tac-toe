import React, { useEffect, useState } from 'react'
import Board from './Board';
import GameOver from './GameOver';
import GameState from './GameState';
import Reset from './Reset';
const Player_X="X";
const Player_O="O";
const winningCombinations =[
  //Rows
  {combo: [0,1,2],strikeClass:"strike-row-1"},
  {combo: [3,4,5],strikeClass:"strike-row-2"},
  {combo: [6,7,8],strikeClass:"strike-row-3"},

  //Columns
  {combo: [0,3,6],strikeClass:"strike-column-1"},
  {combo: [1,4,7],strikeClass:"strike-column-2"},
  {combo: [2,5,8],strikeClass:"strike-column-3"},

  //diagonals
  {combo: [0,4,8],strikeClass:"strike-diagonal-1"},
  {combo: [2,4,6],strikeClass:"strike-diagonal-2"},
];
function checkWinner(tiles,setStrikeClass,setGameState){
  for(const {combo,strikeClass} of winningCombinations){
    const tileValue1 = tiles[combo[0]]
    const tileValue2 = tiles[combo[1]]
    const tileValue3 = tiles[combo[2]]

    if(tileValue1 !== null && tileValue1 ===tileValue2 && tileValue1===tileValue3){
      setStrikeClass(strikeClass);
      if(tileValue1 === Player_X){
        setGameState(GameState.PlayerXWins);
      }
      else{
        setGameState(GameState.PlayerOWins);
      }return;
    }
  }

  const areAllTilesFilled = tiles.every((tiles) => tiles !== null)
  if(areAllTilesFilled){
    setGameState(GameState.draw);
  }
}

const TicTacToe = () => {
  const [tiles,setTiles] = useState(Array(9).fill(null));
  const [playTurn,setPlayTurn] =useState(Player_X);
  const [strikeClass,setStrikeClass] = useState();
  const [gameState,setGameState] = useState(GameState.inProgress);

  const handleReset =()=>{
    setGameState(GameState.inProgress);
    setTiles(Array(9).fill(null));
    setPlayTurn(Player_X);
    setStrikeClass(null);
  };

  const handleTileClick = (index) =>{
    if(gameState !== GameState.inProgress){
      return ;
    }
    if(tiles[index] !== null){
      return ;
    }
    const newTiles= [...tiles];
    newTiles[index] =playTurn;
    setTiles(newTiles);
    if(playTurn === Player_X){
      setPlayTurn(Player_O);
    }
    else{
      setPlayTurn(Player_X);
    }
  }
  
  useEffect(()=>{
    checkWinner(tiles,setStrikeClass,setGameState);
  },[tiles]);
  return (
    <>
    <h1>Tic Tac Toe</h1>
    <Board playerTurn={playTurn} tiles={tiles} onTileClick={handleTileClick} strikeClass={strikeClass} />
    <GameOver gameState={gameState} />
    <Reset gameState={gameState} onReset={handleReset} />
    </>
  )
}

export default TicTacToe