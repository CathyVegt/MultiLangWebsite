

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
import '../styles/FlippingTiles.css'; // Import custom styles


/**
 * FlippingTiles component
 * This component renders a tile-flipping memory game.
 * 
 * @component
 */

const FlippingTiles = () => { 
  // emojis fot the back of the tiles
  const emojis = ["❤️", "❤️", "👌", "👌", "😁", "😁", "😊", "😊", "😍", "😍", "😘", "😘", "👍", "👍", "😂", "😂"];
  //states to manage game logic and UI
  const [shuffledEmojis, setShuffledEmojis] = useState([]);
  const [openTiles, setOpenTiles] = useState([]);
  const [matchedTiles, setMatchedTiles] = useState([]);
  const [playerTurn, setPlayerTurn] = useState(1);
  const [player1Score, setPlayer1Score] = useState(0);
  const [player2Score, setPlayer2Score] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [winner, setWinner] = useState('');
  const [gameReady, setGameReady] = useState(false);

  /**
   * useEffect to shuffle emojis and animate initial tile opening
   */
  useEffect(() => {
    const shuffled = [...emojis].sort(() => Math.random() - 0.5);
    setShuffledEmojis(shuffled);

    // Animate initial box open/close
    shuffled.forEach((emoji, i) => {
      setTimeout(() => {
        setOpenTiles(open => [...open, i]);
        setTimeout(() => {
          setOpenTiles(open => open.filter(index => index !== i));
          if (i === shuffled.length - 1) {
            setGameReady(true); // Set game as ready after the last tile animation
          }
        }, 500);
      }, i * 100);
    });
  }, []);

  /**
   * useEffect to handle tile open and match logic.
   */
  useEffect(() => {
    if (openTiles.length === 2 && gameReady) {
      const [firstIndex, secondIndex] = openTiles;
      if (shuffledEmojis[firstIndex] === shuffledEmojis[secondIndex]) {
        // Tiles match
        setMatchedTiles(matches => [...matches, firstIndex, secondIndex]);
        setOpenTiles([]);

        // Update player score
        if (playerTurn === 1) {
          setPlayer1Score(score => score + 1);
        } else {
          setPlayer2Score(score => score + 1);
        }

        // Check for game over
        if (matchedTiles.length + 2 === emojis.length) {
          setGameOver(true);
          determineWinner();
        }
      } else {
        // No match, switch player turn after delay
        setTimeout(() => {
          setOpenTiles([]);
          setPlayerTurn(playerTurn === 1 ? 2 : 1);
        }, 500);
      }
    }
  }, [openTiles, shuffledEmojis, matchedTiles, playerTurn, player1Score, player2Score, gameReady]);

  /**
   * Handle tile click event
   * @param {number} index - Index of the clicked tile
   */
  const handleTileClick = (index) => {
    if (openTiles.length < 2 && !openTiles.includes(index) && !matchedTiles.includes(index) && gameReady) {
      setOpenTiles(open => [...open, index]);
    }
  };

  /**
  * Determine the winner based on the scores.
  */
  const determineWinner = () => {
    if (player1Score > player2Score) {
      setWinner('Player 1');
    } else if (player2Score > player1Score) {
      setWinner('Player 2');
    } else {
      setWinner('Tie');
    }
  };

  /**
   * Reset the game state to start a new game
   */
  const resetGame = () => {
    setShuffledEmojis([]);
    setOpenTiles([]);
    setMatchedTiles([]);
    setPlayerTurn(1);
    setPlayer1Score(0);
    setPlayer2Score(0);
    setGameOver(false);
    setWinner('');
    setGameReady(false); // Reset game ready state

    const shuffled = [...emojis].sort(() => Math.random() - 0.5);
    setShuffledEmojis(shuffled);
    shuffled.forEach((emoji, i) => {
      setTimeout(() => {
        setOpenTiles(open => [...open, i]);
        setTimeout(() => {
          setOpenTiles(open => open.filter(index => index !== i));
          if (i === shuffled.length - 1) {
            setGameReady(true); // Set game as ready after the last tile animation
          }
        }, 500);
      }, i * 100);
    });
  };

  return (
    <div className="containerFlippingTiles">
      <h2>Flipping Tiles</h2>
      <div className="game">
        {shuffledEmojis.map((emoji, index) => (
          <div
            key={index}
            className={`itemTile ${openTiles.includes(index) ? 'boxOpen' : ''} ${matchedTiles.includes(index) ? 'boxMatch' : ''}`}
            onClick={() => handleTileClick(index)}
          >
            {emoji}
          </div>
        ))}
      </div>
      <div>
        <p id="player-color" className={`player-turn-player${playerTurn}`}>
          It's Player <span id="current-player">{playerTurn}</span>'s Turn
        </p>
      </div>
      <div className="player-color">
        <p id="player1-color">Player 1 Score: <span id="player1-score">{player1Score}</span></p>
        <p id="player2-color">Player 2 Score: <span id="player2-score">{player2Score}</span></p>
      </div>
      <button className="button" onClick={resetGame}>Reset Game</button>
      {gameOver && (
        <div className="overlay">
          <div className="winner-message" id="winner-message">
            <p id="winner-text">
              {winner === 'Tie' ? "It's a tie!" : `The winner is ${winner}!`}
            </p>
            <button className="button" onClick={resetGame}>Play Again</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FlippingTiles;
