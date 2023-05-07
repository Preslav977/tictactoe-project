# tictactoe-project

## 1. This is the final result of completing the project using HTML, CSS and Javascript.

![ttt](https://user-images.githubusercontent.com/119291608/236667258-79f1c4d1-c14f-4d09-90a7-69605c20930b.PNG)

## 2. Objective

The objectives of this project, were to build the game TicTacToe, first to build it in the console,
then using DOM to create the interface.

With the help of using the article Building The House Inside Out, creating the project with the logic only

in the console first, so that would be easy to implement the DOM later.

This allows better code readability, code separation from the logic and DOM, and using the pattern MVC.

For example, the gameBoard module using module pattern, was corresponds for the board functionality's,

such as creating the board using an array, placing marker, winning conditions, tie conditions and clearing the board.

The gameController, controls the game state, for example after the objects were created this module, allows players

to switch turns to play rounds and using the logic of the gameBoard to stop the game when there is a win or tie.

The displayController was the interface of the game, with using the MVC pattern, it was created simple interface,

by calling the logic and this showed what happens every turn, who's the first player, who won or a tie and etc.

## 3. My personal objective

This project was definitely an interesting and a fun one, i learned new concepts like using factory function,
module pattern, scope, code separation, MVC pattern.

## 4. Notes and lessons learned

After completing the project, i learned about how to divide logic from the interface, how to use factory function,
to create for example the players, module pattern which i could decide which methods, i could exposes to the other
modules, how scoping works if method is not exposed it could not be accessed.

For example, i had to expose the array from the gameBoard to the displayController, so i could created the board with DOM
and using the array, i showed what happens when game was played using the logic only.

Another lesson i learned, is using setters and getters, what they are, how they work and what problems they resolve.

The project was hard, because of the new concepts but after completing it, i could say i got more experience and i understand,
why using IIFE and module pattern is so important.

## 5. Things to improve when visiting the project.

The first thing i could improve, is some of the namings of the variables, implementing the for players vs computer, right
now the game is playable only players vs players, because i don't have enough knowledge of recursion.

The design could be improved, using a modal as pop up to allow players to place their names and markers.
