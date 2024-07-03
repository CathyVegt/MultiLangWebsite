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

import React, { useState } from "react";
import '../styles/AddExercise.css';
import {addExercise} from './FetchExercise'

/**
 * Creates the React component that will render on the AddExercisePage that renders a form that the user can fill in for adding a new 
 * exercise to the database. The database has to be running on some local or online host for the addExercise function to work. 
 * @returns the object that is rendered into a browser page for the AddExercise component. 
 */
const AddExercise = () => {
  const [formData, setFormData] = useState({
    title: '',
    type: '',
    question_text: '',
    hint: '',
    strategy: '',
    language: '',
    material_type: '',
    material: '',
    difficulty: '',
    options: '',
    solution: ''
  });
  const [jsonRequest, setJsonRequest] = useState(null)

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(JSON.stringify(formData)) // to check if a json file would generate correctly 
    addExercise(formData) // add the exercise to database. 
  };

  return (
    <div>
        <div className="page-header">
            <h1>Add Exercise</h1>
        </div>
        <div className="page-body">
            <div className="form-container">
                {/*create the form that the user can use to add a new exercise */}
                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="title">Title:</label>
                        <input 
                            type="text" 
                            id="title" 
                            name="title" 
                            value={formData.title} 
                            onChange={handleChange} 
                            required 
                        />
                    </div>

                    <div>
                        <label htmlFor="type">Type:</label>
                        <select 
                            id="type" 
                            name="type" 
                            value={formData.type} 
                            onChange={handleChange} 
                            required
                        >
                            <option value="">Select exercise type</option>
                            <option value="1">Multiple choice (single)</option>
                            <option value="2">Multiple choice (with subquestions)</option>
                            <option value="3">Open question (single answer)</option>
                            <option value="4">Open question (multiple answers to submit)</option>
                            <option value="5">Connecting prompts and answers</option>
                        </select>
                    </div>

                    <div>
                        <label htmlFor="question_text">Question Text:</label>
                        <textarea 
                            id="question_text" 
                            name="question_text" 
                            value={formData.question_text} 
                            onChange={handleChange} 
                            required 
                        />
                    </div>

                    <div>
                        <label htmlFor="hint">Hint:</label>
                        <textarea 
                            id="hint" 
                            name="hint" 
                            value={formData.hint} 
                            onChange={handleChange} 
                        />
                    </div>

                    <div>
                        <label htmlFor="strategy">Strategy:</label>
                        <textarea 
                            id="strategy" 
                            name="strategy" 
                            value={formData.strategy} 
                            onChange={handleChange} 
                        />
                    </div>

                    <div>
                        <label htmlFor="language">Language:</label>
                        <input 
                            type="text" 
                            id="language" 
                            name="language" 
                            value={formData.language} 
                            onChange={handleChange} 
                            required 
                        />
                    </div>

                    <div>
                        <label htmlFor="material_type">Material Type:</label>
                        <select 
                            id="type" 
                            name="type" 
                            value={formData.material_type} 
                            onChange={handleChange} 
                            required
                        >
                            <option value="">Select exercise type</option>
                            <option value="text">Text</option>
                            <option value="image">Image</option>
                        </select>
                    </div>

                    <div>
                        <label htmlFor="material">Material (comma separated when using multiple, enter image path if you want to use an image (e.g. 'Websitevraagimage.png')):</label>
                        <input 
                            type="text" 
                            id="material" 
                            name="material" 
                            value={formData.material} 
                            onChange={handleChange} 
                        />
                    </div>

                    <div>
                        <label htmlFor="difficulty">Difficulty:</label>
                        <select 
                            id="type" 
                            name="type" 
                            value={formData.difficulty} 
                            onChange={handleChange} 
                            required
                        >
                            <option value="">Select exercise type</option>
                            <option value="mak">Makkelijk</option>
                            <option value="gem">Gemiddeld</option>
                            <option value="moe">Moeilijk</option>
                        </select>
                    </div>

                    <div>
                        <label htmlFor="options">Options (comma separated):</label>
                        <input 
                            type="text" 
                            id="options" 
                            name="options" 
                            value={formData.options} 
                            onChange={handleChange} 
                        />
                    </div>

                    <div>
                        <label htmlFor="solution">Solution (comma separated):</label>
                        <input 
                            type="text" 
                            id="solution" 
                            name="solution" 
                            value={formData.solution} 
                            onChange={handleChange} 
                        />
                    </div>

                    <button type="submit">Submit</button>
                </form>
            </div>
        </div>
    </div>
  );
};

export default AddExercise;
