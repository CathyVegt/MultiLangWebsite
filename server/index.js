require("dotenv").config();
require('express-async-errors');

const pool = require("./db/connect");
const express = require("express");
const cors = require('cors')
const app = express();
const mainRouter = require("./routes/user");
const exerciseRoutes = require('./routes/exerciseRoute'); // add the router for getting the exercises only the main table, all others still have to be implemented. 


app.use(express.json());

app.use(cors())
app.use("/api/v1", mainRouter);
app.use('/api/v1', exerciseRoutes); // adding the route for fetching exercise data 


app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ msg: "Internal Server Error" });
});

const port = process.env.PORT || 3000;

const start = async () => {
    try {
        // Check PostgreSQL connection
        await pool.connect();
        console.log('Connected to PostgreSQL database');

        // Start server
        app.listen(port, () => {
        console.log(`Server is listening on port ${port}`);
        });
    } catch (error) {
        console.error('Error connecting to PostgreSQL database:', error);
        process.exit(1); // Exit with failure
    }
};

start();

