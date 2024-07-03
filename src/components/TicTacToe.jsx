

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
 */



import React, { useState, useEffect } from 'react';
import '../styles/TicTacToe.css';



//These are two constants for the cross and circle
const X_CLASS = 'x';
const CIRCLE_CLASS = 'circle';

//This is a constance for the winning combinations of the game
const WINNING_COMBINATIONS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];


const TicTacToe = () => {
  //This is a constance for the state of the game along with turns and winning messages
  const [board, setBoard] = useState(Array(9).fill(''));
  const [circleTurn, setCircleTurn] = useState(false);
  const [winningMessage, setWinningMessage] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [selectedCell, setSelectedCell] = useState(null);
  const [answer, setAnswer] = useState('');

  useEffect(() => {
    startGame();
  }, []);

  // Constant for the starting state of the game 
  const startGame = () => {
    setBoard(Array(9).fill(''));
    setCircleTurn(false);
    setWinningMessage('');
    setShowModal(false);
  };

  //Constant for setting a mark of the chosen choice 'x' or 'o'
  const placeMark = (index) => {
    setBoard(prevBoard => {
      const newBoard = [...prevBoard];
      newBoard[index] = circleTurn ? CIRCLE_CLASS : X_CLASS;
      return newBoard;
    });
  };
 
  //Function to check winning combinations 
  const checkWin = (currentClass, board) => {
    return WINNING_COMBINATIONS.some(combination => {
      return combination.every(index => {
        return board[index] === currentClass;
      });
    });
  };

  //Function to check if the game is a draw
  const isDraw = (board) => {
    return board.every(cell => cell === X_CLASS || cell === CIRCLE_CLASS);
  };

  //Function to end the game upon winning/draw combination and display end message
  const endGame = (draw) => {
    if (draw) {
      setWinningMessage('Draw!');
    } else {
      setWinningMessage(`${circleTurn ? "O's" : "X's"} Wins!`);
    }
  };

  //Function to handle the clicks on each turn 
  const handleClick = (index) => {
    if (!winningMessage && board[index] === '') {
      setBoard(prevBoard => {
        const newBoard = [...prevBoard];
        newBoard[index] = circleTurn ? CIRCLE_CLASS : X_CLASS;

        const currentClass = circleTurn ? CIRCLE_CLASS : X_CLASS;
        if (checkWin(currentClass, newBoard)) {
          endGame(false);
        } else if (isDraw(newBoard)) {
          endGame(true);
        } else {
          setCircleTurn(!circleTurn);
        }

        return newBoard;
      });
    }
  };

  //Function to regulate the answer of the choice to handle the answer 
  const handleAnswerSubmit = () => {
    if (answer.trim() && selectedCell !== null) {
      setBoard(prevBoard => {
        const newBoard = [...prevBoard];
        newBoard[selectedCell] = circleTurn ? CIRCLE_CLASS : X_CLASS;

        const currentClass = circleTurn ? CIRCLE_CLASS : X_CLASS;
        if (checkWin(currentClass, newBoard)) {
          endGame(false);
        } else if (isDraw(newBoard)) {
          endGame(true);
        } else {
          setCircleTurn(!circleTurn);
        }

        return newBoard;
      });

      setShowModal(false);
      setAnswer('');
    }
  };

  return (
    <div id="gameContainer">
      <h1>Tic-Tac-Toe</h1>
      <div id="whoseTurn">{circleTurn ? "Circle's turn" : "X's turn"}</div>
      <div id="gameBoard">
        {board.map((cell, index) => (
          <div
            key={index}
            className={`cell ${cell}`}
            onClick={() => handleClick(index)}
          ></div>
        ))}
      </div>
      {winningMessage && (
        <div id="winningMessage" className="show">
          <div data-winning-message-text>{winningMessage}</div>
        </div>
      )}
      <button id="restartButton" onClick={startGame}>Restart</button>
      {showModal && (
        <div id="questionModal" className="modal">
          <div className="modal-content">
            <span className="close" onClick={() => setShowModal(false)}>&times;</span>
            <p>Answer the question:</p>
            <input
              type="text"
              id="answerInput"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
            />
            <button id="submitAnswer" onClick={handleAnswerSubmit}>Submit</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default TicTacToe;

