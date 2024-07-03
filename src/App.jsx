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



// import { RouterProvider, createBrowserRouter } from "react-router-dom";
// import AdminHomePage from './pages/AdminHomePage'
// import Login from './pages/Login'
// import { ToastContainer, toast } from 'react-toastify';

// const router = createBrowserRouter([
//     {
//       path: "/",
//       children: [
//         {
//           index: true,
//           element: <Login />,
//         },
//         {
//           path: "admin-home",
//           element: <AdminHomePage />,
//         },
//       ],
//     },
// ]);

// function App() {
//     return (
//       <>
//         <RouterProvider router={router} />
//         <ToastContainer position='top-center' />
//       </>
//     )
// }

//export default App //super little change 

import React from 'react'
import {Routes, Route} from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'

//import Login from './pages/Login'
import Home from './pages/Home'
import Minigames from './pages/Minigames'
import Profile from './pages/Profile'
import Settings from './pages/Settings'
import AdminHomePage from './pages/AdminHomePage'
import NoPage from './pages/NoPage'
import Connect4Page from './pages/Connect4Page'
import TicTacToePage from './pages/TicTacToePage'
import ExerciseDBTestPage from './pages/ExerciseDBTestPage'

import FlippingTiles from './pages/FlippingTiles_2playerVersion'
import OpenQuestion from './components/OpenQuestion'
import AddExercisePage from './pages/AddExercisePage'

const App = () => {
  return (
    <div className='container'>
      <Navbar/>
      <Routes>
        {/* Add all the possible pages here for routing */}
        <Route path='/' element={<Home/>}></Route>
        <Route path='/home' element={<Home/>}></Route>
        <Route path='/minigames' element={<Minigames/>}>
          <Route path='turningtiles' />
          <Route path='connectingterminals' />
        </Route>
        <Route path='/minigames/connect4' element={<Connect4Page/>}></Route>
        <Route path='/minigames/tictactoe' element={<TicTacToePage/>}/>
        <Route path='/minigames/FlippingTiles' element={<FlippingTiles/>}/>
        <Route path='/profile' element={<Profile/>}></Route>
        <Route path='/settings' element={<Settings/>}></Route>
        <Route path='/adminpage' element={<AdminHomePage/>}></Route>
        <Route path='/dbtest' element={<ExerciseDBTestPage/>}></Route>
        <Route path ='/openquestion' element={<OpenQuestion/>}></Route>
        <Route path = '/addexercise' element={<AddExercisePage/>}></Route>
        <Route path='*' element={<NoPage/>}></Route>
      </Routes>
      <Footer/>
    </div>
  )
}

export default App