/**
 * The file for the module that controls the database queries and handles the request 
 * and responses of the server. 
 */

const db = require('../db/connect'); // adjust the path to your db connection file


/**
 * @description Send in a request to the database to fetch all the exercises from the main table. 
 * @param {Express.Request} req - the HTTP request automatically passed by express framework
 * @param {Express.Response} res - the HTTP response automatically passed by express framework
 */
const getAllExercises = async (req, res) => {
    try {
      const result = await db.query('SELECT * FROM exercises');
      console.log('Database result:', result.rows); // Log the data being sent for possible debugging purposes
      res.setHeader('Content-Type', 'application/json');
      res.json(result.rows);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Database query failed' });
    }
  };

/**
 * @description Send in a request to fetch a random exercise. The parameters passed are the ones from the fetch statement 
 * where the fetch is used. In this case, this is for the difficulty. 
 * @param {Express.Request} req - the HTTP request automatically passed by express framework
 * @param {Express.Response} res - the HTTP response automatically passed by express framework
 */
const getRandomExerciseByDifficulty = async (req, res) => {
  const difficulty = req.params.difficulty;
  try {
    const result = await db.query(
      `SELECT 
        e.*, 
          array_agg(DISTINCT em.material) AS material, -- Replace with actual columns from exercise_materials
          array_agg(DISTINCT eo.option) AS options,   -- Replace with actual columns from exercise_options
          array_agg(DISTINCT es.solution) AS solution--, -- Replace with actual columns from exercise_solutions
        FROM exercises e
        LEFT JOIN exercise_materials em ON e.title = em.title
        LEFT JOIN exercise_options eo ON e.title = eo.title
        LEFT JOIN exercise_solutions es ON e.title = es.title
        WHERE e.difficulty = $1
        GROUP BY e.title, e.type, e.question_text, e.hint, e.strategy, e.language, e.material_type, e.difficulty -- Add all columns from exercises table here
        ORDER BY RANDOM()
        LIMIT 1;
`,
      [difficulty]
    );
    res.setHeader('Content-Type', 'application/json');
    res.json(result.rows[0]); // Send the first (and only) result
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Database query failed' });
  }
};

/**
 * Query the database to save an exercise to database. For each individual table in database, we check if it already exists, or do not add it. 
 * Some additional feedback to the user should be added in this case. 
 * @param {Express.Request} req - the HTTP request automatically passed by express framework
 * @param {Express.Response} res - the HTTP response automatically passed by express framework
 */
const addExercise = async (req, res) => {
  
  const {
    title,
    type,
    question_text,
    hint,
    strategy,
    language,
    material_type,
    material,
    difficulty,
    options,
    solution
  } = req.body;

  try{

    // enter the exercise if it doesn't exist yet
    var checkTitleQuery = `SELECT * FROM exercises WHERE title=$1`
    var checkResult = await db.query(checkTitleQuery, [title])
    if (checkResult.rows.length <= 0 ){
      const insertExerciseQuery = `
      INSERT INTO exercises (title, type, question_text, hint, strategy, language, material_type, difficulty) 
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING title;`
      await db.query(insertExerciseQuery, [title, type, question_text, hint, strategy, language, material_type, difficulty]);

    }

    // enter the material if it doesn't exist yet
    var checkTitleQuery = `SELECT * FROM exercise_materials WHERE title=$1`
    var checkResult = await db.query(checkTitleQuery, [title])
    if (checkResult.rows.length <= 0){
      // Insert materials into exercise_materials table
      const insertMaterialsQuery = `
        INSERT INTO exercise_materials (title, amount, material) 
        VALUES ($1, $2, unnest($3::text[]));
        `;
        await db.query(insertMaterialsQuery, [title, material.length, material]);
    }else{throw new error('the title of this exercise is already in the database! ')}
    
    //enter the options if it doesn't exists yet 
    var checkTitleQuery = `
      SELECT * FROM exercise_options WHERE title = $1`
    var checkResult = await db.query(checkTitleQuery,[title])
    if (checkResult.rows.length <= 0 ){
      // Insert options into exercise_options table
      const insertOptionsQuery = `
      INSERT INTO exercise_options (title, option_text) 
      VALUES ($1, unnest($2::text[]));
      `
      await db.query(insertOptionsQuery, [title, options]);
    }else{throw new error('the title of this exercise is already in the database! ')}
    
    // enter the solutions if it doesn't exist yet 
    var checkTitleQuery = `
      SELECT * FROM exercise_solutions WHERE title = $1`
    var checkResult = await db.query(checkTitleQuery,[title])
    if (checkResult.rows.length <= 0 ){
      // Insert solutions into exercise_solutions table
      const insertSolutionsQuery = `
      INSERT INTO exercise_solutions (title, solution) 
      VALUES ($1, unnest($2::text[]));
      `;

      await db.query(insertSolutionsQuery, [title, solution]);
    }else{throw new error('the title of this exercise is already in the database!')}
    
    res.status(201).json({ message: 'Exercise added successfully' });
  } catch (err){
    res.status(500).json({error: err.message})
  }
}


  
// export the functions, so that these can be used. 
module.exports = {
  getAllExercises,
  getRandomExerciseByDifficulty,
  addExercise,
};
  