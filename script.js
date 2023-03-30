const gameBoard = (() => {
  let gameArray = ['', '', '', '', '', '', '', '', ''];

  const getBoard = () => gameArray.forEach((item) => item);

  let isActive = true;

  const placeMarker = (index, marker) => {
    if (gameArray[index] === '' && isActive) {
      gameArray[index] = marker;
      console.log('Place marker');
      return true;
    }
    console.log('Cant place marker');
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

    // find if there is three markers in a row
    const winning = winningCombos.find((combos) =>
      combos.every((index) => gameArray[index].includes(marker))
    );

    if (winning) {
      console.log(winning);
      console.log(`Got three ${marker} in a row`);
      isActive = false;
      return true;
    }
    isActive = true;
    return false;
  };

  const gameIsTie = () => {
    if (checkForWin === true) {
      isActive = false;
      return false;
    }
    if (gameArray.includes('')) {
      isActive = true;
      return false;
    }
    console.log('Game is tie!');
    isActive = false;
    return true;
  };

  const clearBoard = () => {
    // if board contains any elements remove any elements ?
    // if the round is finished and there is a winner
    // clear the board "array" remove everything
    gameArray = new Array(9).fill('');
  };

  return {
    get gameArray() {
      return [...gameArray];
    },
    getBoard,
    placeMarker,
    checkForWin,
    gameIsTie,
    clearBoard,
  };
})();

const gameController = (() => {
  const createPlayers = (name, marker) => ({ name, marker });

  // const getPlayersMarkers = () => marker;

  const playerOne = createPlayers('PlayerOne', 'x');
  const playerTwo = createPlayers('PlayerTwo', 'o');

  let firstPlayer = playerOne;

  const switchPlayerTurns = () => {
    firstPlayer = firstPlayer === playerOne ? playerTwo : playerOne;
  };

  const getFirstPlayer = () => firstPlayer;

  const printTurn = () => {
    console.log(`${getFirstPlayer().name}'s turn`);
  };

  const playRound = (index) => {
    console.log(`${getFirstPlayer().name} placing marker at index ${index}`);
    console.log(gameBoard.placeMarker(index, getFirstPlayer().marker));

    if (gameBoard.checkForWin(getFirstPlayer().marker)) {
      console.log(`${getFirstPlayer().name} won!`);
      return switchPlayerTurns();
    }
    gameBoard.gameIsTie();

    switchPlayerTurns();
    printTurn();
  };

  printTurn();

  return {
    playRound,
    getFirstPlayer,
  };
})();

const displayController = (() => {
  const clickedCell = (e) => {
    // in here get which cell has been clicked
    // get the data-att hmm save it for later
    // then place the marker
    // the problem here placeMarker is in another module
    const saveClickedCell = e.target;
    const saveClickedCellIndex = saveClickedCell.getAttribute('data-index');
    console.log(saveClickedCellIndex);
  };
  // create the board with DOM with data-att, to get
  // their indexes for later, using the array has as parameter
  // to be able to call it below using the current module
  // and the array module which he resides
  const showBoard = (gameArray) => {
    const boardContainer = document.getElementById('game-board');
    for (let i = 0; i < 9; i += 1) {
      const cell = document.createElement('div');
      cell.classList.add('cell');
      cell.setAttribute('data-index', i);
      cell.style.fontSize = '1.5em';
      cell.addEventListener('click', clickedCell);
      // cell.addEventListener('click', gameController.playRound);
      // using simple i of the loop for easy to work indexes
      cell.textContent = `${gameArray[i]}`;
      boardContainer.appendChild(cell);
    }
  };

  return {
    showBoard,
    clickedCell,
  };
})();

displayController.showBoard(gameBoard.gameArray);
