

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



import React, {useState} from "react"
import "../styles/TicTacToe.css"
import ScoreBoardTicTacToe from "../components/ScoreBoardTicTacToe"
import BoxTicTacToe from "../components/BoxTicTacToe"
import ResetButtonTicTacToe from "../components/ResetButtonTicTacToe"
import BoardTicTacToe from "../components/BoardTicTacToe"



const TicTacToe = () => {
    /*define all cases in which a game is won 
    no cases for a draw yet.*/
    
    const WIN_CONDITIONS = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
      ]

    /* initialize all the conditions and variables that we need to keep track of */ 
    /* initialize empty list for the board */
    const [board, setBoard] = useState(Array(9).fill(null)) 
    /* keep track if current player is X */ 
    const [xPlaying, setXPlaying] = useState(true); 
    const [scores, setScores]  = useState({xScore: 0, oScore:0})
    const [gameOver, setGameOver]  = useState(false)
     
    /* note that the handleBoxClick body goes pretty far down */ 
    const handleBoxClick = (boxIdx) => {
        const updatedBoard = board.map((value, idx) => {
            if (idx == boxIdx){
                return xPlaying === true ? "X" : "O"; 
            } else{
                return value
            }
        })

        const winner = checkWinner(updatedBoard)

        /* update the scores if there is a winner */ 
        if (winner) {
            if (winner == "O"){
                let {oScore} = scores; 
                oScore += 1 
                setScores({...scores, oScore}) /* keep all the other scores the same except for oScore */
            } else {
                let {xScore} = scores; 
                xScore += 1 
                setScores({...scores, xScore})
            }
        }

        /* actually update the board */ 
        setBoard(updatedBoard);

        /* set opposite of X playing */ 
        setXPlaying(!xPlaying); 

    } /* end of handleBoxClick */ 

    const checkWinner = (board) => {
        /* go through all possible win conditions. For an ultimate tictactoe, this could be done by checking each field where a turn is done */ 
        for (let i = 0; i < WIN_CONDITIONS.length; i++){
            const [x,y,z] = WIN_CONDITIONS[i];

            if (board[x] && board[x] === board[y] && board[y] === board[z]){
                setGameOver(true)
                return board[x]
            }
        }
    }

    const resetBoard = () => {
        setGameOver(false); 
        setBoard(Array(9).fill(null))
    }


    return(
        <div>
            <div className="page-header">
                <h1>A simple game of tictactoe</h1>
            </div>
            <div>
            <ScoreBoardTicTacToe scores = {scores} xPlaying = {xPlaying}/>
            {/* onclick gives check if gameOver if so, reset the board, if not continue with handleBoxClick function*/}
            <BoardTicTacToe board = {board} onClick={gameOver ? resetBoard : handleBoxClick} /> {/* render the board */}
            {/* this could simply be a button honestly... */}
            <ResetButtonTicTacToe resetBoard ={resetBoard}/>
            </div>
        </div>
    )
}

export default TicTacToe;