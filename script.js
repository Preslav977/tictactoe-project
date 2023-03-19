const gameBoard = (() => {
  const gameArray = ['', '', '', '', '', '', '', '', ''];

  const placeMarker = (index, marker) => {
    if (gameArray[index] === '') {
      gameArray[index] = marker;
      console.log('Place marker');
      return true;
    }
    console.log('Dont place marker');
    return false;
  };
  const getBoard = () => gameArray.map((element) => element);

  // function with winning conditions, something else is missing ?
  // in here using array indexes with switch or nested else if's maybe
  // or something else to check all these indexes
  const checkForWin = () => {
    // const gameWinner = 'Congratulation you won !';
    // const gameLoser = 'You lost !';
    // const gameTie = "It's a tie !";

    const winningConditions = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],

      [2, 4, 6],
      [6, 4, 2],
      [0, 4, 8],
      [8, 4, 0],

      [2, 1, 0],
      [5, 4, 3],
      [8, 7, 6],

      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [6, 3, 0],
      [7, 4, 1],
      [8, 5, 2],
    ];
  };

  const clearBoard = () => {
    // if board contains any elements remove any elements ?
    // if the round is finished and there is a winner
    // clear the board "array" remove everything
  };

  return {
    gameArray,
    placeMarker,
    checkForWin,
    clearBoard,
  };
})();

const gameController = (() => {
  const createPlayers = (name, marker) => ({ name, marker });

  const getPlayersMarkers = () => marker;

  const playerOne = createPlayers('Player One', 'X');
  const playerTwo = createPlayers('Player Two', 'O');

  let firstPlayer = playerOne;

  const switchPlayerTurns = () => {
    firstPlayer = firstPlayer === playerOne ? playerTwo : playerOne;
  };

  const getFirstPlayer = () => firstPlayer;
  const printTurn = () => {
    console.log(`${getFirstPlayer().name}'s turn`);
  };

  const playRound = (index) => {
    console.log(gameBoard.placeMarker(index, getFirstPlayer().marker));

    switchPlayerTurns();
    printTurn();
  };

  printTurn();

  return {
    playRound,
    getPlayersMarkers,
    getFirstPlayer,
  };
})();

gameController.playRound(0);
gameController.playRound(1);

const displayController = (() => {
  // create the board with DOM with data-att, to get
  // their indexes for later, using the array has as parameter
  // to be able to call it below using the current module
  // and the array module which he resides
  const showBoard = (gameArray) => {
    const boardContainer = document.getElementById('game-board');
    for (let i = 0; i < 9; i += 1) {
      const cell = document.createElement('button');
      cell.classList.add('cell');
      cell.setAttribute('data-index', i);
      cell.style.fontSize = '1.5em';
      // eslint-disable-next-line no-use-before-define
      cell.addEventListener('click', clickedCell);
      // cell.addEventListener('click', gameController.playRound);
      // using simple i of the loop for easy to work indexes
      cell.textContent = `${gameArray[i]}`;
      boardContainer.appendChild(cell);
    }
  };

  const clickedCell = (e) => {
    // in here get which cell has been clicked
    // get the data-att hmm save it for later
    // then place the marker
    // the problem here placeMarker is in another module
    const saveClickedCell = e.target;
    const saveClickedCellIndex = saveClickedCell.getAttribute('data-index');
    console.log(saveClickedCellIndex);
  };

  return {
    showBoard,
    clickedCell,
  };
})();

displayController.showBoard(gameBoard.gameArray);
