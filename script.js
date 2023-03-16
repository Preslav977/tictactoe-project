const gameBoard = (() => {
  // in here make a array for the markers
  const gameArray = ['', '', '', '', '', '', '', '', ''];

  // place marker on the array index check if the index
  // is bigger than the length of the array return false else return true
  const placeMarker = (marker, index) => {
    // check if there is already something on the board
    if (gameArray.includes(marker)) {
      console.log('The marker exist already');
      return false;
    }
    console.log('The marker doenst exist');
    gameArray[index] = marker;
    return true;
  };

  // get the object of the board
  const getBoard = () => gameArray.map((element) => element);

  // function with winning conditions, something else is missing ?
  // in here using array indexes with switch or nested else if's maybe
  // or something else to check all these indexes
  const checkForWin = (index) => {
    // some type of loop to maybe check all of there combinations ?
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

  const clearBoard = (board) => {
    // if board contains any elements remove any elements ?
    // if the round is finished and there is a winner
    // clear the board "array" remove everything
  };

  return {
    gameArray,
    getBoard,
    placeMarker,
    checkForWin,
    clearBoard,
  };
})();

// console.log(gameBoard.placeMarker('x', 1));
// console.log(gameBoard.placeMarker('o', 7));
// console.log(gameBoard.placeMarker('x', 6));
// console.log(gameBoard.placeMarker('o', 8));
// console.log(gameBoard.gameArray);

const gameController = (() => {
  // create players objects using factory function
  const createPlayers = (name, marker) => ({ name, marker });

  const playerOne = createPlayers('Player One', 'X');
  const playerTwo = createPlayers('Player Two', 'O');

  // using get method to access their markers
  // the reason for this is p1 is X or O to have access for
  // them in the DOM and to know who is X or O
  const getPlayersMarkers = () => marker;

  // get first player since rule of thumb p1 is always
  // going to be first
  const getFirstPlayer = () => playerOne;

  // in here switch the turns using else if, switch or ternary operator ?
  const switchPlayerTurns = () => {};

  const printTurn = () => {
    // if it's the p1 turn console.log it, else if the p2 turn console.log
    // and so on
    let player;
    if (player === playerOne) {
      console.log('Player One Turn');
    } else {
      console.console.log('Player Two Turn');
    }
  };

  // in here couple of things needs to happened
  // play the round using marker and a player
  // hmm maybe the array needs to be here since the he is the board
  // after that placeMarker on the index with a marker ?
  // switch players turns ?
  const playRound = (board, marker, player) => {
    // getPlayerMarkers()
    // switchPlayerTurns()
    // printTurn()
    // winning logic ?
  };

  return {
    getPlayersMarkers,
    printTurn,
    playRound,
  };
})();

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
    // console.log(clickedCell);
    const saveClickedCellIndex = saveClickedCell.getAttribute('data-index');
    // eslint-disable-next-line no-multi-assign
    const dropMarker = (saveClickedCell.textContent = 'x');
    console.log(gameBoard.placeMarker(dropMarker, saveClickedCellIndex));
    // console.log(dropMark);
    console.log(gameBoard.gameArray);
    // console.log(saveClickedCellIndex);
  };

  return {
    showBoard,
    clickedCell,
  };
})();

console.log(displayController.showBoard(gameBoard.gameArray));

// 1. create modules for gameBoard, gameController, displayController

// 2. inside gameBoard module create, array for the board

// 3. create function to render the content of the array for the webpage,
// two choices either use data-att, to know
// which cell has the value of the mark later,
// or create the board entirely with HTML and populate it with javascript ?
// if the board is created with board 3x3 easy, using divisions

// 4. function to place something on the board, maybe using a function inside
// gameBoard to place something there first in the console for example
// placeMarker(0, 'x') ==> splice might do the job since it allows to use
// the method parameters splice(start, deleteCount, item1, item2, ...)
// first is the index maybe using index as start
// depending on which the calling the function
// deleteCount maybe delete one element so it
// wouldn't able to place new element if using 0
// item will be a marker maybe using marker as
// parameter then creating variable and assign it there
// it has to prevent placing a mark if there is already
// something on the current index maybe
// maybe using check so it wouldn't allow the player
// placeMarker on something higher than 8 index

// 5. tidying with DOM meaning it has to get the
// reference of the array somehow and using event
// by calling for example placeMarker(1, 'o'),
// call the event function by placing mark there ?

// 6. so if in the gameBoard has functionality for -
// placingMark, clearingBoard, checkingForWin maybe
// it will be done for now ?
// 7. in gameController players has to there they will have
// two things names and markers,
// then something has to indicate who's turn is, who
// is the first player, then switch the players turns,
// playRound will have parameters of index, players, marker ?
// and depending on the result of the board call
// checkForWin and declare the winner ?
