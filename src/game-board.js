import React, { useReducer } from "react";
import calculateWinner from "./calculate-winner";

const getStatus = (squares, xIsNext) => {
  const winner = calculateWinner(squares);
  if (winner) {
    return `Winner: ${winner}`;
  } else if (squares.every(Boolean)) {
    return `Tie`;
  } else {
    return `Next Player: ${xIsNext ? "X" : "0"}`;
  }
}

const gameReducer = (state, action) => {
  const { squares, xIsNext } = state;
  switch (action.type) {
    case "SELECT_SQUARE": {
      const { square } = action;
      const winner = calculateWinner(squares);
      if (winner || squares[square]) {
        return state;
      }
      const squaresCopy = [...squares];
      squaresCopy[square] = xIsNext ? 'X' : '0'
      return {
        squares: squaresCopy,
        xIsNext: !xIsNext,
      };
    }
    default: {
      throw new Error(
        `Unhandled action type: ${action.type}. Please fix it. Thank you.`
      );
    }
  }
}

const Board = () => {
  const [state, dispatch] = useReducer(gameReducer, {
    squares: Array(9).fill(null),
    xIsNext: true,
  });

  const { squares, xIsNext } = state;
  const renderSquare = (index) => {
    return (
      <button className="square" onClick={() => selectSquare(index)}>
        {squares[index]}
      </button>
    );
  };

  const selectSquare = (square) => {
    dispatch({ type: "SELECT_SQUARE", square });
  };

  const status = getStatus(squares, xIsNext);

  return (
    <>
      <div className="status">{status}</div>
      <div className="board-row">
        {renderSquare(0)}
        {renderSquare(1)}
        {renderSquare(2)}
      </div>
      <div className="board-row">
        {renderSquare(3)}
        {renderSquare(4)}
        {renderSquare(5)}
      </div>
      <div className="board-row">
        {renderSquare(6)}
        {renderSquare(7)}
        {renderSquare(8)}
      </div>
    </>
  );
};

export default Board;
