import React from 'react'
import GameState from './GameState';

const GameOver = ({gameState}) => {
  switch(gameState){
    case GameState.inProgress:
        return <></>;
    case GameState.PlayerOWins:
        return <div className="game-over">Player O Wins</div>
    case GameState.PlayerXWins:
        return <div className="game-over">Player X Wins</div>
    case GameState.draw:
        return <div className="game-over">Match Draw</div>
  }
}

export default GameOver