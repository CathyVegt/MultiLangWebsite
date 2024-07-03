

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
import '../styles/DragdropWindow.css';
import DropZone from './DropZone';
import {fetchTestExercise} from '../components/FetchExercise'

/**
 * Creating the window with drag drop areas, populated with exercise data.
 */
function DragdropWindow() {

  const { exercise, error, options } = fetchTestExercise(5);
  const [draggedItem, setDraggedItem] = useState(null);
  const [dropZones, setDropZones] = useState({
    1: [],
    2: [],
    3: [],
    4: [],
  });
  const [result, setResult] = useState(null); // State to store the validation result

  useEffect(() => {
    if (exercise && exercise.material && options) {
      const initialItems = exercise.material.map((url, index) => ({
        id: index + 1,
        url,
      }));

      setDropZones({
        1: initialItems,
        2: [],
        3: [],
        4: [],
      });
    }
  }, [exercise]);

  /**
 * OnDragStart function to set the current dragged item state to the item and its dragged zone.
 */
  const onDragStart = (item, fromZoneId) => {
    setDraggedItem({ item, fromZoneId });
  };

   /**
  * OnDrop function to place the dragged item into the new zone by checking if the item exists within the zone, and deleting the item from its old zone.
  */
  const onDrop = (toZoneId) => {
    if (draggedItem) {
      const { item, fromZoneId } = draggedItem;
      
      // Checks if the item is already in the zone to avoid making duplicates
      if (dropZones[toZoneId].some(i => i.id === item.id)) {
        setDraggedItem(null);
        return;
      }

      // Remove item from its original zone
      const newFromZoneItems = dropZones[fromZoneId].filter((i) => i.id !== item.id);

      // Add item to the new zone
      const newToZoneItems = [...dropZones[toZoneId], item];

      setDropZones(prevDropZones => ({
        ...prevDropZones,
        [fromZoneId]: newFromZoneItems,
        [toZoneId]: newToZoneItems,
      }));

      setDraggedItem(null);
    }
  };

  /**
   * Sumbit button onClick function to check if the provided placement of items in columns are correct to the exercise solution.
   */
  const handleSubmit = () => {
    if (exercise && exercise.solution) {
      let correct = true;
      
      console.log("Drop zones:", dropZones)
      for (const zoneId in dropZones) {
        if (zoneId === 0) {
          continue
        }
        console.log("Zone id:", zoneId)
        const items = dropZones[zoneId] //.map(item => item.id);
        console.log("Zone items:", items)
        const correctItems = exercise.solution[zoneId - 1]; // Assuming solution is zero-indexed
        
        if (items.length !== correctItems.length) {
          correct = false;
          console.log('Items have different length')
          console.log(items)
          console.log(correctItems)
          break;
        }

        for (const itemId of items) {
          if (!correctItems.includes(itemId)) {
            correct = false;
            console.log('Solution does not include item')
            break;
          }
        }

        if (!correct) break;
      }

      setResult(correct ? 'Correct!' : 'Incorrect. Please try again.');
    }
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!exercise || !options) {
    return <div>Still loading...</div>;
  }

  return (
    <div>
      <div className='task-body'>
        <div className='task-choices-header'>
          <div className='task-question'>{exercise.question_text}</div>
          <div className='task-instructions'>*Place each image to its respectful column*</div>
        </div>
        <div className='task-materials'>
          <DropZone
            className='task-choice'
            key={1}
            zoneId={1}
            items={dropZones[1]}
            onDragStart={onDragStart}
            onDrop={() => onDrop(1)}
          />
        </div>
        <div className='task-columns'>
          {options.map((option, index) => (
              <div className="task-column" key={index}>
                <div className="task-header">{option}</div>
                <DropZone
                  className="task-choice"
                  key={`zone-${index + 2}`}
                  zoneId={index + 2}
                  items={dropZones[index + 2]}
                  onDragStart={onDragStart}
                  onDrop={() => onDrop(index + 2)}
                />
              </div>
            ))}
        </div>
        <div className='button' onClick={handleSubmit}>
          Submit
        </div>
        {result && <div className="result">{result}</div>}
      </div>
    </div>
  );
}

export default DragdropWindow;