
/*
 * Copyright (c) 2024, MSDT group6
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without modification,
 * are permitted provided that the following conditions are met:
 *
 * 1. Redistributions of source code must retain the above copyright notice,
 *    this list of conditions and the following disclaimer.
 *
 * 2. Redistributions in binary form must reproduce the above copyright notice,
 *    this list of conditions and the following disclaimer in the documentation
 *    and/or other materials provided with the distribution.
 *
 * 3. Neither the name of Radboud nor the names of its contributors
 *    may be used to endorse or promote products derived from this software
 *    without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
 * AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
 * IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE
 * ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE
 * LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR
 * CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF
 * SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS
 * INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN
 * CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
 * ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE
 * POSSIBILITY OF SUCH DAMAGE.
 * */

import React, { useState } from "react";
import redToken from '../assets/red token.svg';
import blackToken from '../assets/black token.svg';
import '../styles/Connect4Game.css';
import OpenQuestion from '../components/OpenQuestion.jsx';

/**
 * Slot component representing a single cell in the Connect 4 grid.
 * 
 * @param {string} ch - The character representing the played chip.
 * @param {number} y - The row index of the slot.
 * @param {number} x - The column index of the slot.
 */
const Slot = ({ ch, y, x }) => {
    return (
        <div className='slot' x={x} y={y}>
            {ch && (
                <img src={ch === 'X' ? redToken : blackToken} width='100%' height='100%' alt='' />
            )}
        </div>
    );
};

/**
 * This function plays the game. 
 * @returns if a player has won the game.
 */
const Connect4Game = () => {
    const [board, setBoard] = useState([
        ['', '', '', '', '', '', ''],
        ['', '', '', '', '', '', ''],
        ['', '', '', '', '', '', ''],
        ['', '', '', '', '', '', ''],
        ['', '', '', '', '', '', ''],
        ['', '', '', '', '', '', '']
    ]);

    const [currPlayer, setCurrPlayer] = useState('X');
    const [oppPlayer, setOppPlayer] = useState('O');
    const [gameOver, setGameOver] = useState(false);
    const [showQuestion, setShowQuestion] = useState(false);
    const [currentMove, setCurrentMove] = useState({ row: null, column: null });

    /**
     * Checks if the current move results in a win for the specified player.
     * @param {number} row The row index representing the played chip.
     * @param {number} column The column index representing the played chip.
     * @param {string} ch The character representing the played chip
     * @returns if there is a winning situation in one of the four directions.
     */
    const checkWin = (row, column, ch) => {
        const checkDirection = (deltaRow, deltaColumn) => {
            const consecutive = (r, c, dr, dc) => {
                if ((r < 0 || r >= board.length || c < 0 || c >= board[0].length || board[r][c] !== ch)) {
                    return 1;
                }
                return 1 + consecutive(r + dr, c + dc, dr, dc);
            };

            const positiveConsecutive = consecutive(+row + deltaRow, +column + deltaColumn, deltaRow, deltaColumn);
            const negativeConsecutive = consecutive(+row - deltaRow, +column - deltaColumn, -deltaRow, -deltaColumn);

            return positiveConsecutive + negativeConsecutive - 1 >= 4;
        };

        return (
            checkDirection(1, 0) || // Vertical
            checkDirection(0, 1) || // Horizontal
            checkDirection(1, 1) || // Diagonal (bottom-right to top-left)
            checkDirection(-1, 1)   // Diagonal (top-right to bottom-left)
        );
    };

    /**
     * This places the chip move in the board.
     * @param {number} row The row index representing the played chip.
     * @param {number} column The column index representing the played chip.
     * @param {string} ch The character representing the played chip
     * @returns if this move won the game.
     */
    const updateBoard = (row, column, ch) => {
        setBoard(prev => {
            const boardCopy = [...prev];
            boardCopy[row][column] = ch;
            return boardCopy;
        });
        return checkWin(row, column, ch);
    };

    /**
    * Handles the click event on a slot in the Connect 4 game.
    *
    * @param {Object} e - The event object from the click event.
    */
    const handleClick = (e) => {
        const column = e.target.getAttribute('x');
        let row = board.findIndex((rowArr, index) => {
            return (rowArr[column] !== '' || (index === board.length - 1));
        });

        if (row !== (board.length - 1)) row -= 1;
        if (board[row][column] !== '') row -= 1;

        setCurrentMove({ row, column });
        setShowQuestion(true); // Show question before making the move
    };

    /**
 * Handles the event when the user answers an open question.
 * If the answer is correct, updates the game board and checks for a win condition.
 * If the answer is incorrect, switches players without updating the board.
 * 
 * @param {boolean} isCorrect - Indicates whether the user's answer is correct.
 */
const handleQuestionAnswered = (isCorrect) => {
    setShowQuestion(false); // Hide the open question component after it has been answered

    if (!isCorrect) {
        // If the answer is incorrect, switch players without updating the board
        const currPlayerCopy = currPlayer;
        setCurrPlayer(oppPlayer);
        setOppPlayer(currPlayerCopy);
        return; // Exit the function early without updating the board or checking game over
    }

    // If the answer is correct, proceed with updating the board and checking game over
    const { row, column } = currentMove; // Destructure the currentMove object to get the row and column of the move made
    const isGameOver = updateBoard(row, column, currPlayer); // Update the game board with the current player's move and check if it results in a win

    setGameOver(isGameOver); // Update the game state to indicate if the game is over (true) or not (false)

    if (!isGameOver) { // If the game is not over (i.e., no winner yet)
        const currPlayerCopy = currPlayer; // Make a copy of the current player (before switching)
        setCurrPlayer(oppPlayer); // Set the current player to be the opponent player for the next turn
        setOppPlayer(currPlayerCopy); // Set the opponent player to be the current player for the next turn
    }
};

    return (
        <div className="gameWindow">
            {showQuestion && (
                <OpenQuestion onAnswered={handleQuestionAnswered} />
            )}
            {gameOver && (
                <div className="gameState"> Game Over! {oppPlayer === 'X' ? 'Blue' : 'Orange'} Wins!</div>
            )}
            <div className="playerDisplay">{currPlayer === 'X' ? 'Blue' : 'Orange'} Move</div>
            <div className="board" onClick={gameOver || showQuestion ? null : handleClick}>
                {board.map((row, i) => {
                    return row.map((ch, j) => <Slot ch={ch} y={i} x={j} key={`${i}-${j}`} />);
                })}
            </div>
        </div>
    );
}

export default Connect4Game;
