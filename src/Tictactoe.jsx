import React, { useRef, useState } from "react";

const generateBoard = (size) => {
  const newBoard = [];
  for (let i = 0; i < size; i++) {
    newBoard.push([...Array(size)]);
  }
  return newBoard;
};

const checkHorizontal = (board) => {
  for (let row of board) {
    const rowSet = new Set(row);
    if (rowSet.size === 1 && !rowSet.has(undefined)) return true;
  }
};

const rowsToColumn = (board) => {
  const newBoard = [];
  let column = 0;
  while (column < board.length) {
    const newRow = [];
    for (let row = 0; row < board.length; row++) {
      newRow.push(board[row][column]);
    }
    newBoard.push(newRow);
    column++;
  }
  return newBoard;
};

const diagonalToRow = (board) => {
  const newBoard = [[], []];
  let increment = 0;
  let decrement = board.length - 1;

  while (increment < board.length) {
    newBoard[0].push(board[increment][increment]);
    newBoard[1].push(board[increment][decrement]);
    increment++;
    decrement++;
  }
  return newBoard;
};

const checkForWin = (board) => {
  //horizontal
  if (checkHorizontal(board)) {
    return true;
  }
  //vertical
  if (checkHorizontal(rowsToColumn(board))) {
    return true;
  }
  //diagonal
  if (checkHorizontal(diagonalToRow(board))) {
    return true;
  }
};

const Alert = (props) => {
  return (
    <div>
      <span>{props.message}</span>
      <p>Hurray!</p>
    </div>
  );
};

function Tictactoe() {
  const [board, setBoard] = useState(generateBoard(3));
  const [currPlayer, setCurrPlayer] = useState("X");
  const [alertMessage, setAlertMessage] = useState("");
  const customRef = useRef();

  const handleClick = (row, col) => {
    board[row][col] = currPlayer;
    setBoard([...board]);
    if (checkForWin(board)) {
      setAlertMessage(`${currPlayer} Wins!`);
      customRef.current.style.display = "block";
    }
    setCurrPlayer(currPlayer === "X" ? "O" : "X");
  };
  return (
    <div>
      <div className="mask" ref={customRef}>
        <Alert message={alertMessage} />
      </div>
      {board.map((row, r) => {
        return (
          <div
            key={r}
            style={{
              display: "flex",
            }}
          >
            {row.map((cell, c) => {
              return (
                <div
                  key={c}
                  onClick={() => {
                    handleClick(r, c);
                  }}
                  style={{
                    border: "solid 1px white",
                    height: "50px",
                    width: "50px",
                    color: "white",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {cell}
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
}

export default Tictactoe;
