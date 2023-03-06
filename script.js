// 1. First step, creating the modules and factory functions
// module for gameBoard
// module for displayController
// factory function for players

const gameBoard = (function () {
  gameBoardArray = [];

  const placeMarker = () => {};

  const clear = () => {};

  return {
    gameBoardArray,
    placeMarker,
    clear,
  };
})();

const displayController = (function () {})();

const createPlayers = (name, marker) => ({ name, marker });

const tom = createPlayers('tom', 'o');
const jerry = createPlayers('jerry', 'x');
console.log(tom);
console.log(jerry);

// players ---> FF
// the players needs names and markers
// players has to be connected with players's turns,
// to know who is turn is, who won or it'a tie and etc.

//  2. Second step, create the functionality of the gameBoard module
//  gameBoard ---> module
//  module will contain an array ---> gameBoardArray = [];
//  2.1. function that will render the content of the
// board --> createCell, params ?
//  created with DOM (cells), and will display what the array will contain
// ---> using textContent of the cells ?
//  One thing is known the board will be 3x3 using a loop
// instead of creating one by one the cell
//  2.2. function that will place something on the board,
// and to know if the cell is --->
//  maybe using something to check which cell is clicked ?
//  2.2. Two options using data-attributes or using IndexOf method to know ??
//  occupied or not, after that DOM will handle the markers(X, O) on the board
// ---> check for example cell(0) ---> clicked,
//  is it empty true, then place the marker there,
// then use DOM to show it on the board
//  IF it's not occupied place it for example of cell(1)
// if there's is already something
//  IF is not empty false ---> ignore cell(1)
//  don't allow to be placed something again

//  3. Third step, create the gameController functionality's
//  gameController ---> module
//  3.1. startGame() --> this functionality will fire up when the game
// has been started
//  This functionality will save the gameState maybe in a array,
// not clear what needs to happened here,
//  but it has to do with gameState which will determine if the game
// is started/ended, before the game will be played
//  3.2. playersTurns() ---> functionality to know who's turn is
//  This will allow me to know who is first p1 or p2, has to connected
// with players FF and
//  using DOM will show who is playing right now, rule of thumb p1
// is always be first since p2 can't start until p1 is started
//  3.3. checkForWin() ---> functionality to know if the game is over,
// who won/lose, or it's a tie
//  To check for win first has to check in the array and the board ?,
// or only in the array ?
//  There's is only couple of possibilities [0,1,2], [3,4,5], [6,7,8]
// ---> horizontal
//  [2,4,6], [6,4,2], [0,4,8], [8,4,0] ---> vertical
//  Maybe checking the indexes of the array with nested if's,
// switch or some other array methods ???
//  Also for a tie if is not 3 in a row it's a tie has to do some check
//  It will be better to know if it's a tie if not
// only isn't a three in a row but also when the
//  board is filled so can determine maybe easier
// instead of checking 4/5 based of the markers ?

//  4. Step 4 build the interface of the game
//  4.1. Interface for startGame() (button), functionality that
// will allow players to type their name and choose their markers
//  Building using input text for the names,
// for the markers two radio button with X, O, that will force them to choose
//  either one or the other if it's a input text that will confuse the game ?
//  4.2. displayElement (what marks has been placed,
// also chosen by player1 or player2),
//  Messages --> tied with DOM,
// playersTurn so when p1 is turn show it, place mark if it's done,
//  show p2 turn and place marker until the board is filled ?
//  (which turn is player1 or player2 ?), (when the game is over)
// - show the winner and if it's a tie
//  4.3. resetGame() ---> if the game is over reset everything gameState,
// player names, markers, displayElement, board, array
//  that will allow the players to start a new game
//  resetting the value of the inputs, clear the board,
// hmm maybe remove the elements of the gameBoardArray and some other arrays,
//  check if the array has some elements(value), if it's true
// remove them if not keep filling them until the arrays are full ?
