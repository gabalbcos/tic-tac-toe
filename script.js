function Gameboard(){
  
  let board = [['','',''],['','',''],['','','']];
  let round = 0;

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

  // function to add the symbol
  const addSignal = (row, column) => {
    if (board[row][column] === ''){
      board[row][column] = playerSignal();
      round += 1;
    } else { 
      return };
  }

  // function to dictate the player turn
  const playerTurn = () => {
      return (round % 2 === 0) ;
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
        if (board[a[0]][a[1]] === player && board[b[0]][b[1]] === player && board[c[0]][c[1]] === player) {
          return true;
        }
      }
      return false;
    }

  const finalMessage = () => {
      if (checkWin(playerSignal())) {
      console.log(`Player ${playerSignal()} wins!`);
    } else {
      console.log('No winner.');
    }
  }

  // function to log the board
  const getBoard = () => {
    console.log(board);
  }

  return{addSignal, checkWinner, finalMessage, getBoard}
} 

