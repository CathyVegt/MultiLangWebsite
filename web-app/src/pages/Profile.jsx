

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



import React, { useState } from 'react'
import ProfilePicture from '../assets/icons/Interface-Essential-Profile-Female--Streamline-Pixel.png'
import badgePicture from "../assets/icons/Star-Badge--Streamline-Sharp.png"
import '../styles/Profile.css'
import Sidebar from '../components/Sidebar';
import Logout from '../components/Logout';
/**
 * 
 * @returns Renders a screen containing the player's score subsection.
 */
const scoresView = () => {
  return (
    <>
      <div className='content-header'>
        Scores
      </div>
      <div className='content-body'>
        <div className='body-group'>
          <div className='body-group-header'>Rank</div>
          <dl>
            <dt>Game 1:</dt>
            <dd>4th / 100</dd> 
          </dl>
          <dl>
            <dt>Game 2:</dt>
            <dd>3rd / 100</dd> 
          </dl>
          <dl>
            <dt>Game 3:</dt>
            <dd>1st / 100</dd> 
          </dl>
        </div>
        <div className='body-group'>
          <div className='body-group-header'>Achievments</div>
          <dl>
            <li><img src={badgePicture}/>Badge 1</li>
            <li><img src={badgePicture}/>badge2</li>
            <li><img src={badgePicture}/>badge3</li>
          </dl>
        </div>
      </div>
    </>
  )
} 

/**
 * 
 * @returns  Renders a screen containing the settings subsection.
 */
const settingsView = () => {
  return(
    <>
      <div className='content-header'>
        Settings
      </div>
      <div className='content-body'>
        <div className='body-group'>
          <div className='body-group-header'>User Information</div>
          <dl>
            <dt>First name:</dt>
            <dd>user</dd>
          </dl>
          <dl>
            <dt>Last name:</dt>
            <dd>user</dd>
          </dl>
          <dl>
            <dt>Password:</dt>
            <dd>*********</dd>
          </dl>
          <dl>
            <dt>Email:</dt>
            <dd>user@ru.nl</dd>
          </dl>
        </div>
        <div className='body-group'>
          <div className='body-group-header'>Service information</div>
          <dl>
            <dt>Something 1</dt>
            <dd>Something else 1</dd>
          </dl>
          <dl>
            <dt>Something 1</dt>
            <dd>Something else 1</dd>
          </dl>
        </div>
      </div>
    </>
  )
}

/**
 * 
 * @returns Renders a screen containing the admin subsection.
 */
const adminPageView = () => {
  return (
    <div className='page'>
        <div className='dashboard'>
            <Sidebar />
            <div className="dashboard--content">
                <p> This page is intended to manage groups of students and teachers. This includes adding, removing, modifying 
                    and viewing information about students and teachers. This page is only accessible to users with the role of
                    'admin'.
                </p>
                <Logout />
            </div>
        </div>
    </div>
);
}

/**
 * 
 * @returns Renders a screen containing the profile section.
 */
const Profile = () => {
  const [viewIndex, setViewIndex] = useState(0)

  return (
    <div className='page'>
      <div className='page-header'>
        <img className='page-header-image' src={ProfilePicture}/>
        <span className='page-header-username'>Hello, User</span>
      </div>
      <div className='page-body'>
        <div className='sidebar'>
          <div className='menu'>
            <ul className='menu-list'>
              <li className='item' onClick={() => setViewIndex(0)}>Scores</li>
              <li className='item' onClick={() => setViewIndex(1)}>Settings</li>
              <li className='item' onClick={() => setViewIndex(2)}>Adming page</li>
            </ul> 
          </div>
        </div>
        <div className='content'>
          {viewIndex === 0 && scoresView()}
          {viewIndex === 1 && settingsView()}
          {viewIndex === 2 && adminPageView()}
        </div>
      </div>
    </div>
  )
}

export default Profile