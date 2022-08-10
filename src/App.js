import React, { useState } from 'react';

const rowStyle = {
  display: 'flex',
};

const squareStyle = {
  width: '80px',
  height: '80px',
  backgroundColor: '#ddd',
  margin: '4px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  fontSize: '24px',
  color: 'teal',
  fontWeight: 'bold',
};

const boardStyle = {
  backgroundColor: '#eee',
  alignItems: 'center',
  justifyContent: 'center',
  display: 'flex',
  flexDirection: 'column',
  border: '3px #eee solid',
};

const containerStyle = {
  display: 'flex',
  alignItems: 'center',
  flexDirection: 'column',
  marginTop: '30px',
};

const instructionsStyle = {
  marginTop: '5px',
  marginBottom: '5px',
  fontWeight: 'bold',
  fontSize: '16px',
};

const buttonStyle = {
  marginTop: '15px',
  marginBottom: '16px',
  width: '80px',
  height: '40px',
  backgroundColor: 'teal',
  color: 'white',
  fontSize: '16px',
};

const Square = (props) => {
  return (
    <div className="square" style={squareStyle} onClick={props.onClick}>
      {props.value}
    </div>
  );
};

const Board = (props) => {
  return (
    <div style={containerStyle} className="gameBoard">
      <div id="statusArea" className="status" style={instructionsStyle}>
        Next player: <span>{props.nextPlayer ? 'X' : 'O'}</span>
      </div>
      <div id="winnerArea" className="winner" style={instructionsStyle}>
        Winner: <span>{props.winner}</span>
      </div>
      <button style={buttonStyle} onClick={props.reset}>
        Reset
      </button>
      <div style={boardStyle}>
        <div className="board-row" style={rowStyle}>
          <Square value={props.squares[0]} onClick={() => props.onClick(0)} />
          <Square value={props.squares[1]} onClick={() => props.onClick(1)} />
          <Square value={props.squares[2]} onClick={() => props.onClick(2)} />
        </div>
        <div className="board-row" style={rowStyle}>
          <Square value={props.squares[3]} onClick={() => props.onClick(3)} />
          <Square value={props.squares[4]} onClick={() => props.onClick(4)} />
          <Square value={props.squares[5]} onClick={() => props.onClick(5)} />
        </div>
        <div className="board-row" style={rowStyle}>
          <Square value={props.squares[6]} onClick={() => props.onClick(6)} />
          <Square value={props.squares[7]} onClick={() => props.onClick(7)} />
          <Square value={props.squares[8]} onClick={() => props.onClick(8)} />
        </div>
      </div>
    </div>
  );
};

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    } else if (!squares.includes(null)) {
      return 'Tie';
    }
  }
  return null;
}

const App = () => {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [playerX, setPlayerX] = useState(true);
  const [winner, setWinner] = useState(null);

  const handleClick = (i) => {
    if (squares[i]) {
      return;
    }

    if (!winner) {
      let updatedSquares = [...squares];
      updatedSquares[i] = playerX ? 'X' : 'O';
      setSquares(updatedSquares);
      setWinner(calculateWinner(updatedSquares));
      setPlayerX(!playerX);
    }
  };

  const handleReset = () => {
    setSquares(Array(9).fill(null));
    setPlayerX(true);
    setWinner(null);
  };

  return (
    <div className="game">
      <div className="game-board">
        <Board
          squares={squares}
          nextPlayer={playerX}
          reset={handleReset}
          onClick={handleClick}
          winner={winner}
        />
      </div>
    </div>
  );
};

export default App;
