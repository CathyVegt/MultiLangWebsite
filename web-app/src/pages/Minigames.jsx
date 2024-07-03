

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



import React from 'react'
import '../styles/Minigames.css'
import { useNavigate, Outlet } from 'react-router-dom'
import turningtiles_thumbnail from '../assets/thumbnail_turningtiles.png'
import connect4_thumbnail from '../assets/thumbnail_connect4.png'
import tictactoe_thumbnail from '../assets/thumbnail_tictactoe.png'
import play_icon from '../assets/icons/icons8-play-100.png'

/**
 * 
 * @returns Renders the minigames section screen with available minigames
 */
const Minigames = () => {
    const navigate = useNavigate()
    return (
        <div className='page'>
            <div className='page-header'>
                <h1>Minigames</h1>
            </div>
            <div className='page-body'>
                <div className='minigame'>
                    <a>
                        <img src={turningtiles_thumbnail} alt='' />
                        <div className='caption' onClick={() => {navigate('/minigames/FlippingTiles')}}>
                            <img src={play_icon} alt='' />
                            <p>Flipping Tiles</p>
                        </div>
                    </a>
                </div>
                <div className='minigame'>
                    <img src={tictactoe_thumbnail} alt='' />
                    <div className='caption' onClick={() => {navigate('/minigames/tictactoe')}}>
                        <img src={play_icon} alt=''/>
                        <p>Tic-Tac-Toe</p>
                    </div>
                </div>
                <div className='minigame'>
                    <img src={connect4_thumbnail} alt='' />
                    <div className='caption' onClick={() => {navigate('/minigames/connect4')}}>
                        <img src={play_icon} alt=''/>
                        <p>Connect Four</p>
                    </div>
                </div>      
            </div>
            <Outlet />
        </div>
    )
}

export default Minigames
