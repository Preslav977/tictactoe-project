const gameBoard = (() => {
  // this variable is used to control
  // if there is an empty index of the array
  // place marker if not don't also if there is
  // a win stop the game same for time else continue
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
  const createPlayers = (name, marker) => ({ name, marker });

  let playerOne;

  let playerTwo;

  const setPlayerOne = (name, marker) => {
    playerOne = createPlayers(name, marker);
  };

  const setPlayerTwo = (name, marker) => {
    playerTwo = createPlayers(name, marker);
  };

  let firstPlayer;

  const setFirstPlayer = () => {
    firstPlayer = playerOne;
  };

  const getPlayerOne = () => playerOne;

  const getPlayerTwo = () => playerTwo;

  const switchPlayerTurns = () => {
    firstPlayer = firstPlayer === playerOne ? playerTwo : playerOne;
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
    createPlayers,
    getFirstPlayer,
    setPlayerOne,
    setPlayerTwo,
    setFirstPlayer,
    getPlayerOne,
    getPlayerTwo,
  };
})();

const displayController = (() => {
  const userForm = document.querySelector('form');
  const playerTurnDiv = document.getElementById('turn');
  const boardDiv = document.getElementById('game-board');
  const restartButton = document.getElementById('restart-btn');
  // TODO: Modal
  // const modal = document.getElementById('modal');
  // const startBtn = document.getElementById('start-btn');

  // startBtn.addEventListener('click', () => {
  //   modal.close();
  // });

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
    gameController.setFirstPlayer();

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
    // console.log(gameController.getFirstPlayer());
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

  boardDiv.addEventListener('click', saveCellIndex);

  const showBoard = () => {
    for (let i = 0; i < 9; i += 1) {
      const cell = document.createElement('div');
      cell.classList.add('cell');
      cell.setAttribute('data-index', i);
      cell.style.fontSize = '2em';
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
