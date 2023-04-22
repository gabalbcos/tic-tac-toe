// Attempt 2 
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

  return {render,
    update,
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
    let index = event.target.id.replace('square-',"");
    Gameboard.update(index, players[currentPlayerIndex].mark);
    currentPlayerIndex = currentPlayerIndex === 0 ? 1 : 0;
  }

  return{start, handleClick};
})();


const buttonPlay = document.querySelector('#btn-reset') ;
buttonPlay.addEventListener('click', () => {
  Game.start() ;
});