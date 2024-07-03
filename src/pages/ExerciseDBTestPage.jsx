

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

import React, { useEffect, useState } from 'react';
// import the functions responsible for fetching fetchTest exercise is the one for the exercises in the public folder!! 
// for the fetchRandomExercse you need the actual database running! 
import {fetchTestExercise, fetchRandomExercise, addExercise} from '../components/FetchExercise'


const ExerciseDBTestPage = () => {
  console.log('fetch')
  let type = 2; /* Multiple choice type question */ 
  const {exercise, error, options} = fetchRandomExercise('mak'); // fetch the exercise and keep in local constants. 

  /**
   * based on what type of material an exercise has (image or text), get the type of data that needs to be rendered to a page. 
   * @param {Object} exercise the exercise for which this needs to be done  
   * @returns html object that renders the material of the exercise based on the material type 
   */
  function renderMaterial(exercise){
    // return a container containing the image (note that this is only for a single image while an exercise can use multiple images)
    if (exercise.material_type == "image"){
      let path = `/images/${exercise.material}`
      return (
        <div>
          <img src = {path}/> 
        </div>
      )
    }else{ // if the material is "text" simply return a paragraph with the text 
      return (
        <p><strong>Material: </strong>{exercise.material}</p>
      )
    }
  }

  /**
   * Render the options of an exercise if there are multiple (such as in multiple choice), otherwise is an open question which naturally 
   * doesn't have any options to choose from. 
   * @param {Object} exercise the fetched exercise 
   * @returns The options in an html container, or that it is an open question 
   */
  function renderOptions(exercise){
    if (exercise.options != null){
      return (
        <p><strong>Options: </strong>{exercise.options}</p>
      )
    } else{
      return (
        <p> Open question, no options</p>
      )
    }
  }

  /**
   * Check if there are options for an exercise and set it in options. 
   * If a json response doesn't have options, it will return null after the fetch, but I did this to make sure and prevent errors. 
   * @param {Object} exercise the fetched exercise 
   */
  function checkOptions(exercise){
    if (exercise.options != null){
      setOptions(exercise.options)
    }
  }

  checkOptions({exercise});
  console.log("Options: ", options)
  
  // show all the attributes in an exercise on a page to check if all is fetched correctly. 
  // Of course, we wouldn't really use this in the application. This is mainly for testing purposes 
  return (
    <div>
      <div className='page-header' />
      <div className="exercise-container">
        <h1>Random Exercise</h1>
        {error ? (
          <p>Error: {error}</p>
        ) : (
          exercise && (
            <div className="exercise-card">
              <h2>{exercise.title}</h2>
              <p><strong>Type:</strong> {exercise.type}</p>
              <p><strong>Question:</strong> {exercise.question_text}</p>
              <p><strong>Hint:</strong> {exercise.hint}</p>
              <p><strong>Strategy:</strong> {exercise.strategy}</p>
              <p><strong>Language:</strong> {exercise.language}</p>
              <p><strong>Material Type:</strong> {exercise.material_type}</p>
              <p><strong>Material: </strong> {exercise.material}</p>
              {renderMaterial(exercise)}
              <p><strong>Difficulty:</strong> {exercise.difficulty}</p>
              {renderOptions(exercise)}
              <p><strong>Solution: </strong> {exercise.solution} </p>
            </div>
          )
        )}
      </div>
    </div>
  );

};


const TestWrite = () => {
  console.log('fetch')
  let type = 2

  const {exercise, options}  = fetchTestExercise(type)

  console.log(exercise)

  while( exercise== null){
    return(
      <div>Loading...</div>
    )
  }

  addExercise(exercise)


  return (
    <div><p>Nothing of import</p></div>
  )
}

export default ExerciseDBTestPage;