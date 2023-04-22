const Gameboard = (() => {

  //public members

  let board = [['','',''],['','',''],['','','']];
  let round = 0;

  // function to add the symbol 
  const addSignal = (row, column) => {
    if (board[row][column] === ''){
      board[row][column] = playerSignal();
      round += 1;
    } else { 
      return };
  }

  // function to log the board
  const getBoard = () => board;
  
  // print
  const printBoard = () => {
    console.log(board);
  }

  const addRound = () => {
    round += 1;
  }

  return {addSignal, addRound, getBoard, printBoard, round};
})();

// control the STATE of the game

const GameController = (() => {
  let player1Score = 0;
  let player2Score = 0;
  const board = Gameboard.board;

  // Winning combinations
  const winningCombinations = [
  // Rows
  [[0, 0], [0, 1], [0, 2]],
  [[1, 0], [1, 1], [1, 2]],
  [[2, 0], [2, 1], [2, 2]],
  // Columns
  [[0, 0], [1, 0], [2, 0]],
  [[0, 1], [1, 1], [2, 1]],
  [[0, 2], [1, 2], [2, 2]],
  // Diagonals
  [[0, 0], [1, 1], [2, 2]],
  [[0, 2], [1, 1], [2, 0]]
  ];

 // function to dictate the player turn
 const playerTurn = () => {
  return (Gameboard.round % 2 === 0) ;
}

// function to change the player turn
const playerSignal = () => {
  if(playerTurn()) {
    return 'X';
  } else {
    return 'O';
  }
}

const checkWinner = (player) => {
  for (let combination of winningCombinations) {
    const [a, b, c] = combination;
    if (Gameboard.board[a[0]][a[1]] === player && Gameboard.board[b[0]][b[1]] === player && Gameboard.board[c[0]][c[1]] === player) {
      return true;
    }
  }
  return false;
}

const checkDraw = () => {
for (let row of Gameboard.board) {
  if (row.includes('')) {
    return false;
  }
}
return true;
}

const finalMessage = () => {
  if (checkWinner(playerSignal())) {
  console.log(`Player ${playerSignal()} wins!`);
} else if (checkDraw()) {
  console.log('No winner.');
} else {
  return;
  }
}

const printNewRound = () => {
  board.getBoard();
    }

  const playRound = (row, column) => {
    
    board.addSignal(row, column);
    finalMessage();
    printNewRound();
    board.printBoard();
  }

  return {playRound}
})();