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

/**
 * Fetching an exercise from a certain path, this can either be the ones from PUBLIC folder (for testing) or from the server. 
 * Where to fetch from is handled by the other functions that uses this as a function call to perform the actual fetching. 
 * That is also the reason why this function is not exported. 
 * @param {string} path - the path from which the function has to fetch the data. 
 * @returns {object} {exercise, error, options}
 * and error if the fetching was unsuccessfull. Other wise an exercise response in a .json format with the following attributes: 
 *      - title (id, unique) - doesn't NEED to be displayed to a user, but is used for identifyin a question in the database
 *      - type : number - indicating the type of question.
 *      - question_text: [string] -  the question. 
 *      - hint: string - The hint to be displayed.  
 *      - strategy: string - The additional tip that is displayed when a question is previously answered incorrectly. 
 *      - language: string - The language which the question is about 
 *      - material_type: string - "image" or "text" which is used to determine if visual material has to be rendered. 
 *      - material: [string], text if the material is textual, and an array with the names of the images used for the exercise.   
 *      - difficulty: string - "mak", "gem", "moe" for the three difficulty levels. (a number might be better however.)
 *      - options: [string]/null - a list of options for multiple choice and connect questions. null if it's an open question, because there are no options in that case. 
 *      - solution: [string] - the solutions of the exercise, either singleton or multiple answers depending on the question. 
 */
function fetchExercise(path){
    const [exercise, setExercise] = useState(null);
    const [error, setError] = useState(null);
    const [options, setOptions] = useState(null); 

    /**
     * Checks if the exercise has "options", if not the options are simply set to null.
     * The only exercises that do not have the options are any exercise in the form of an "open" question, i.e. a question where the user has to input text as the answer. 
     * The function is not exported, because it only has to be used internally. 
     * @param {object} data - the data in a .json format that is returned by one of the fetching functions. 
     */
    function checkOptions(data){
        if(data.options != null){setOptions(data.options)} 
        else{setOptions(null)}
    }

    // useEffect neccessary to synchronize with external database
    useEffect(() => {
        const fetchExerciseFunc = async(path) => {
            try{
                // console.log('path', path)
                const response = await fetch(path)

                if (!response.ok){
                    throw new Error('Network response was not ok')
                }

                // parse json file. 
                const data = await response.json(); 
                console.log("Data", data)

                // Ensure 'solution' is always an array
                if (data && data.solution != null ) {
                  data.solution = Array.isArray(data.solution) ? data.solution : [data.solution];
                }

                setExercise(data)
                setOptions(data.options || null);

            }catch (error){
                console.error('Error fetching exercise: ', error)
                setError(error.message)
            }
        }

        fetchExerciseFunc(path)

    }, []); // with [], we ensure that it only runs once.

    return {exercise, error, options}
}

/**
 * Fetches an exercise that exists in the public folder as a json file. This is mostly for testing purposes for rendering/front-end. 
 * @param {number} type - a number denoting the exercise type. The following are possible: 
 *      - 1: Multiple choice (single) 
 *      - 2: Multiple choice (with subquestions) 
 *      - 3: Open question (single answer) 
 *      - 4: Open question (multiple answers to submit) 
 *      - 5: Connecting prompts and answers  
 * @returns {Object} {exercise, error, options} also see fetchExercise
 */
export function fetchTestExercise(type = null){
    // check if the type is valid. 
    if (type < 1 || type > 5){
        throw new Error("type number invalid, use a number in 1 - 5. You used", type)
    }
    // denotes the paths for the different exercise types. 
    const exercise_types = {
        1: "MultipleChoice.json",
        2: "MultipleMultipleChoice.json",
        3: "OpenQuestionSingle.json", 
        4: "OpenQuestionMultiple.json",
        5: "ConnectQuestion.json"
    }
    // console.log('type', exercise_types[type])

    // Construct the path we'll need to fetch from 
    let path = `/${exercise_types[type.toString()]}`;
    // console.log('path', path)

    return fetchExercise(path)
}

/**
 * fetch a random exercise from the database, either of a certain difficulty, or a completely random one
 * @param {string} difficulty - (optional) the difficulty of the question needed to fetch.  
 * @returns {object} {exercise, error, options} of a random exercise also see fetchExercise
 */
export function fetchRandomExercise(difficulty=""){
    console.log('fetrandom')
    const exerciseServerPath = 'http://localhost:3000/api/v1/exercises/random/mak' // modify if the server connection is modified.     
    console.log(difficulty)
    // check if the difficulty is valid. 
    if (difficulty != "moe" && difficulty != "mak" && difficulty != "gem"){
        console.log('wrong!')
        throw new Error("difficulty is invalid, should be either 'mak', 'gem', or 'moe'. You used: ", difficulty)
    }
    // Construct the path we'll need to fetch from 
    let path = exerciseServerPath//`${exerciseServerPath}random/${difficulty}`
    console.log('path', path)

    return fetchExercise(path)
}

/**
 * a function that can be used by components to try and save exercises to the database. 
 * @param {Object} exercise an object with the following attributes: 
 *      - title (id, unique) - doesn't NEED to be displayed to a user, but is used for identifyin a question in the database
 *      - type : number - indicating the type of question.
 *      - question_text: [string] -  the question. 
 *      - hint: string - The hint to be displayed.  
 *      - strategy: string - The additional tip that is displayed when a question is previously answered incorrectly. 
 *      - language: string - The language which the question is about 
 *      - material_type: string - "image" or "text" which is used to determine if visual material has to be rendered. 
 *      - material: [string], text if the material is textual, and an array with the names of the images used for the exercise.   
 *      - difficulty: string - "mak", "gem", "moe" for the three difficulty levels. (a number might be better however.)
 *      - options: [string]/null - a list of options for multiple choice and connect questions. null if it's an open question, because there are no options in that case. 
 *      - solution: [string] - the solutions of the exercise, either singleton or multiple answers depending on the question. 
 */
export async function addExercise(exercise){
    // get the server path in which the localhost runs 
    const exerciseServerPath = 'http://localhost:3000/api/v1/exercises'
    try{ 
        // connect to the exercise controller of the server and create a json response to send through HTTP
        const response = await fetch(exerciseServerPath, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(exercise) // parse the exercise in a json object 
        });

        if (!response.ok){
            throw new Error('Network response was not ok')
        }

        const data = await response.json()
    } catch(error){
        console.error('There was an error adding the exercise!', error)
    }

}