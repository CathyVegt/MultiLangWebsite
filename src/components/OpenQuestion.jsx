
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



import React, { useState } from 'react';
import '../styles/OpenQuestion.css';
import { FaSearchPlus, FaCheck, FaTimes } from 'react-icons/fa';
import { fetchTestExercise } from './FetchExercise';

function OpenQuestion({ onAnswered }) {
    const [isZoomed, setIsZoomed] = useState(false);
    const [userAnswer, setUserAnswer] = useState("");
    const [feedback, setFeedback] = useState("");
    const [showOverlay, setShowOverlay] = useState(false);
    const [isCorrect, setIsCorrect] = useState(null);

    const handleZoom = () => {
        setIsZoomed(!isZoomed);
    };

    const handleAnswerChange = (e) => {
        setUserAnswer(e.target.value);
    };

    const handleSubmit = () => {
        if (userAnswer.toLowerCase() === correctAnswer.toLowerCase()) {
            setFeedback("Correct!");
            setIsCorrect(true);
        } else {
            setFeedback("Incorrect!");
            setIsCorrect(false);
        }
        setShowOverlay(true);
    };

    const closeOverlay = () => {
        setShowOverlay(false);
        setUserAnswer("");
        setIsCorrect(null);
        onAnswered(isCorrect); // Notify parent component about the answer correctness
    };

    const handleKeyDown = (e) => {
        if (showOverlay == false && e.key === 'Enter') {
            handleSubmit();
        }

        if(showOverlay && e.key === 'Enter'){
            closeOverlay()
        }
    };

    const { exercise, error, options } = fetchTestExercise(3);

    if (exercise == null) {
        return <div>Loading...</div>;
    }

    const title = "Beantwoord de Vraag!";
    const exerciseQuestion = exercise.question_text;
    const imageUrl = `/images/${exercise.material[0]}`;
    const correctAnswer = exercise.solution[0];

    return (
        <div>
            <div className='page-header' />

            <div className="OpenQuestion">
                <header className="OpenQuestion-header">
                    <h1>{title}</h1>
                </header>

                <div className="page-body">
                    <div className={`OpenQuestion-image ${isZoomed ? 'zoomed' : ''}`}>
                        <img src={imageUrl} alt="Exercise" />
                        <FaSearchPlus className="zoom-icon" onClick={handleZoom} />
                    </div>

                    <div className="OpenQuestion-exercise">
                        <p>{exerciseQuestion}</p>
                        <input
                            type="text"
                            placeholder="Enter your answer here"
                            value={userAnswer}
                            onChange={handleAnswerChange}
                            onKeyDown={handleKeyDown}
                        />
                        <button onClick={handleSubmit}>Submit</button>
                    </div>
                </div>

                {showOverlay && (

                    <div className="overlay">
                        <div className="overlay-content">
                            {isCorrect ? (
                                <FaCheck className="icon correct" />
                            ) : (
                                <FaTimes className="icon incorrect" />
                            )}
                            <p>{feedback}</p>
                            <button onClick={closeOverlay}>Close</button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default OpenQuestion;
