const gameBoard = (() => {
  let isActive = true;

  let gameArray = new Array(9).fill('');

  const placeMarker = (index, marker) => {
    if (gameArray[index] === '' && isActive) {
      gameArray[index] = marker;
      // console.log('Place marker');
      return true;
    }
    // console.log('Cant place marker');
    return false;
  };

  const checkForWin = (marker) => {
    const winningCombos = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],

      [2, 1, 0],
      [5, 4, 3],
      [8, 7, 6],

      [2, 4, 6],
      [6, 4, 2],
      [0, 4, 8],
      [8, 4, 0],

      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],

      [6, 3, 0],
      [7, 4, 1],
      [8, 5, 2],
    ];

    const winning = winningCombos.find((combos) =>
      combos.every((index) => gameArray[index].includes(marker))
    );

    if (winning) {
      // console.log(winning);
      // console.log(`Got three ${marker} in a row`);
      isActive = false;
      return true;
    }
    isActive = true;
    return false;
  };

  const gameIsTie = () => {
    if (checkForWin('X') === true) {
      isActive = false;
      return false;
    }
    if (checkForWin('O') === true) {
      isActive = false;
      return false;
    }
    if (gameArray.includes('')) {
      isActive = true;
      return false;
    }
    // console.log('Game is tie!');
    isActive = false;
    return true;
  };

  const clearBoard = () => {
    gameArray = new Array(9).fill('');
    // console.log(gameBoard.gameArray);
  };

  return {
    get gameArray() {
      return [...gameArray];
    },
    placeMarker,
    checkForWin,
    gameIsTie,
    clearBoard,
  };
})();

const gameController = (() => {
  const startButton = document.getElementById('start-btn');

  const createPlayers = (name, marker) => ({ name, marker });

  let playerOne;

  let playerTwo;

  const setPlayerOne = (name, marker) => {
    playerOne = createPlayers(name, marker);
  };

  const setPlayerTwo = (name, marker) => {
    playerTwo = createPlayers(name, marker);
  };

  const getPlayerOne = () => playerOne;

  const getPlayerTwo = () => playerTwo;

  startButton.addEventListener('click', () => {});

  const playerOneDefault = createPlayers('player One', 'X');
  const playerTwoDefault = createPlayers('player Two', 'O');

  let firstPlayer = playerOneDefault;

  const switchPlayerTurns = () => {
    firstPlayer =
      firstPlayer === playerOneDefault ? playerTwoDefault : playerOneDefault;
  };

  const getFirstPlayer = () => firstPlayer;

  const printTurn = () => {
    // console.log(`${getFirstPlayer().name}'s turn`);
  };

  const playRound = (index) => {
    // console.log(`${getFirstPlayer().name} placing marker at index ${index}`);
    gameBoard.placeMarker(index, getFirstPlayer().marker);

    if (gameBoard.checkForWin(getFirstPlayer().marker)) {
      // console.log(`${getFirstPlayer().name} won!`);
      return;
    }

    if (gameBoard.gameIsTie()) {
      return;
    }

    switchPlayerTurns();
    printTurn();
  };

  printTurn();

  return {
    playRound,
    switchPlayerTurns,
    getFirstPlayer,
    setPlayerOne,
    setPlayerTwo,
    getPlayerOne,
    getPlayerTwo,
  };
})();

// Interface for TicTicToe
// 1. method for getting the id of cells is a must - DONE
// 2. method for showing the board, created the cells with DOM - DONE

// 3. method for players to be able to put their names and markers,
// then create new objects using the factory function - TODO

// 4. method for knowing who's marker is and show in the board
// when the cell has been clicked, then switch turns
// 4.1. first get the first players marker, place it using the textContent
// of the marker on the cell, the when the players turns are switch place
// the second players markers on the cell, if markers already exist
// in the cell don't place another marker
// get the first players by accessing the method that switch turns
// saves the markers by calling the first players with the marker
// using event target textContent show the players marker - DONE

// 5. method for knowing when there is a win or tie, with conditions
// to know when to stop the game ! - DONE
// 5.1 this method will be used to know if player1 won or player2,
// if any of this is true three in a row depending on the players turn
// show in the DOM, who won stop the game, otherwise continue until it's
// win or a tie
// 6. method to show what happens every turn the game has been played
// and switch turns, who won or a tie ! - DONE
// 6.1 this method will show who's the first players turns, who the second
// players turn is and it will switch back and forth until there is a winner
// a tie, basically this method will show what happens every turn on the board
// 7. startButton, that is required to be clicked that will load
// all these events to play the game otherwise the game cannot be played
// 7.1 until this button has been clicked no game will be played after
// has been clicked and been putted name and marker then the game will be
// played
// 8. restartButton that will either restart the whole game or only
// will clear rhe board so the game can be played again
// 8.1, maybe using points first of 5, or keep the game playing,
// or play one round reset everything - TODO

const displayController = (() => {
  const userForm = document.querySelector('form');
  const userFormContainer = document.getElementById('form-container');
  const playerTurnDiv = document.getElementById('turn');
  const boardDiv = document.getElementById('game-board');
  const restartButton = document.getElementById('restart-btn');

  const resetForm = () => {
    userForm.reset();
  };

  const getNameAndMarker = () => {
    const playerOneName = document.getElementById('player-one-name').value;
    let playerOneMarker = document.getElementById('marker-x');
    const playerTwoName = document.getElementById('player-two-name').value;
    let playerTwoMarker = document.getElementById('marker-o');

    if (playerOneMarker.checked) {
      playerOneMarker = 'X';
      playerTwoMarker = 'O';
    } else {
      playerOneMarker = 'O';
      playerTwoMarker = 'X';
    }

    gameController.setPlayerOne(playerOneName, playerOneMarker);
    gameController.setPlayerTwo(playerTwoName, playerTwoMarker);

    const showFirstPlayerName = document.getElementById('first-player');
    showFirstPlayerName.textContent = `${playerOneName}`;

    const showSecondPlayerName = document.getElementById('second-player');
    showSecondPlayerName.textContent = `${playerTwoName}`;
  };

  userForm.addEventListener('submit', (e) => {
    e.preventDefault();
    getNameAndMarker();
    console.log(gameController.getPlayerOne());
    console.log(gameController.getPlayerTwo());
    userFormContainer.style.opacity = 0;
    resetForm();
  });

  const updateGameScreen = (saveClickedCell) => {
    const placingMarkers = saveClickedCell;
    const getFirstPlayer = gameController.getFirstPlayer();

    playerTurnDiv.textContent = `${getFirstPlayer.name} turn`;
    const getPlayersMarkers = gameController.getFirstPlayer().marker;

    if (placingMarkers.textContent === '') {
      placingMarkers.textContent = getPlayersMarkers;
      placingMarkers.style.pointerEvents = 'none';
    }

    if (gameBoard.checkForWin(getPlayersMarkers)) {
      playerTurnDiv.textContent = `${getFirstPlayer.name} won!`;
      boardDiv.style.pointerEvents = 'none';
    }

    if (gameBoard.gameIsTie()) {
      playerTurnDiv.textContent = 'No one won!';
      boardDiv.style.pointerEvents = 'none';
    }
  };

  const saveCellIndex = (e) => {
    const saveClickedCell = e.target;
    const saveMarkerIndex = saveClickedCell.getAttribute('data-index');
    if (!saveMarkerIndex) {
      return;
    }
    // update screen before playing valid move
    updateGameScreen(saveClickedCell);
    gameController.playRound(saveMarkerIndex);
    // update screen to show who won
    updateGameScreen('');
  };
  // update the screen by showing who is first
  updateGameScreen('');

  boardDiv.addEventListener('click', saveCellIndex);

  const showBoard = () => {
    for (let i = 0; i < 9; i += 1) {
      const cell = document.createElement('div');
      cell.classList.add('cell');
      cell.setAttribute('data-index', i);
      cell.style.fontSize = '1.5em';
      boardDiv.appendChild(cell);
    }
  };

  const restartGame = () => {
    gameBoard.clearBoard();

    const cells = document.querySelectorAll('.cell');
    cells.forEach((cell) => {
      cell.remove('.cell');

      boardDiv.style.pointerEvents = 'auto';
    });
    showBoard();

    const getFirstPlayer = gameController.getFirstPlayer();

    playerTurnDiv.textContent = `${getFirstPlayer.name} turn`;
  };

  restartButton.addEventListener('click', restartGame);

  return {
    showBoard,
  };
})();

displayController.showBoard();
