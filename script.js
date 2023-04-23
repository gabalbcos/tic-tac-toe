// Attempt 2 
const displayController = (() => {
  const renderMessage = (message) => {
    document.querySelector('#round').innerHTML = message;
  }

  return {renderMessage}
})();

const Gameboard = (() => {
  let gameboard =['','','','','','','','','',];

  const render = () => {
    let boardHTML = '';
    gameboard.forEach((square, index ) => {
      boardHTML += `<div class="square" id="square-${index}">${square}</div>`;
      
    })
    document.querySelector('#board-grid').innerHTML = boardHTML;
    const squares = document.querySelectorAll('.square');
    squares.forEach((square) => {
      square.addEventListener('click', Game.handleClick);
    })
  }

  const update = (index, value) => {
    gameboard[index] = value;
    render();
  }

  const getGameboard = () => gameboard;

  return {render,
    update,
    getGameboard,
         }
})();

// players factory function
const createPlayers = (name, mark) => {
  return {
    name,
    mark
  }
}

const Game = (() => {
  let players = [];
  let currentPlayerIndex;
  let gameOver;

  const start = () => {
    players = [
      createPlayers(document.querySelector('#player1').value, 'X'),
      createPlayers(document.querySelector('#player2').value, 'O')
    ];
    currentPlayerIndex = 0;
    gameOver = false;
    Gameboard.render();
    const squares = document.querySelectorAll('.square');
    squares.forEach((square) => {
      square.addEventListener('click', Game.handleClick);
    })
  }

  const handleClick = (event) => {
    if (gameOver) {
      return;
    }
    let index = event.target.id.replace('square-',"");
    if (Gameboard.getGameboard()[index] !== ""){
      return;
    }
    Gameboard.update(index, players[currentPlayerIndex].mark);

    if (checkForWin(Gameboard.getGameboard(), players[currentPlayerIndex].mark)) {
      gameOver = true;
      displayController.renderMessage(`${players[currentPlayerIndex].name} WON!`);
    } else if (checkForTie(Gameboard.getGameboard())) {
      gameOver = true;
      displayController.renderMessage("It's a TIE");
    }
    currentPlayerIndex = currentPlayerIndex === 0 ? 1 : 0;
  }

  function checkForWin(board) {
    const winningCombinations = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
]
  for (let i = 0; i < winningCombinations.length; i++) {
    const [a, b, c] = winningCombinations[i];
    if (board[a] && board[a] === board[b] && board[a] === board[c]){
      return true;
      }  
    }  
    return false;
}

function checkForTie(board) {
    return board.every(cell => cell !== '')
}

  const restart = () => {
    for (let i = 0; i < 9; i += 1){
      Gameboard.update(i, "");
    }
    Gameboard.render();
  }

  return{start, handleClick, restart, checkForWin};
})();

const buttonReset= document.querySelector('#btn-reset') ;
buttonReset.addEventListener('click', () => {
  Game.restart();
});


const buttonPlay = document.querySelector('#btn-ai') ;
buttonPlay.addEventListener('click', () => {
  Game.start() ;
});