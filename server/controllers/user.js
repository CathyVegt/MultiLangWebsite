const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const pool = require("../db/connect");

const login = async (req, res) => {
  const { username, password } = req.body;

  // Check if username and password are provided
  if (!username || !password) {
    return res.status(400).json({
      msg: "Bad request. Please add username and password in the request body",
    });
  }

  try {
    let tableName;

    // Check different types of users: s for student, E for teacher, the rest for admin
    if (username.toLowerCase().startsWith("s")) {
      tableName = "students_acc";
    } else if (username.toLowerCase().startsWith("E")) {
      tableName = "teachers_acc";
    } else {
      tableName = "admin_acc";
    }

    const query = `SELECT * FROM ${tableName} WHERE username = $1`;
    const { rows } = await pool.query(query, [username]);

    // Check if username exists
    if (rows.length === 0) {
      return res.status(400).json({ msg: "Invalid username or password" });
    }

    const foundUser = rows[0];

    // Check admin password
    if (tableName === "admin_acc") {
      if (password === foundUser.passhash) {
        const token = jwt.sign(
          { id: foundUser.id, name: foundUser.username },
          process.env.JWT_SECRET,
          {
            expiresIn: "24h",
          }
        );

        return res.status(200).json({ msg: "User logged in", token });
      } else {
        return res.status(400).json({ msg: "Invalid username or password" });
      }
    }
    else 
    {
      // Check password for students and teachers
      const isMatch = await bcrypt.compare(password, foundUser.passhash);
      if (isMatch) {
        const token = jwt.sign(
          { id: foundUser.id, name: foundUser.username },
          process.env.JWT_SECRET,
          {
            expiresIn: "24h",
          }
        );

        return res.status(200).json({ msg: "User logged in", token });
      } else {
        return res.status(400).json({ msg: "Invalid username or password" });
      }
    }
  } catch (error) {
    console.error("Error during login:", error);
    return res.status(500).json({ msg: "Internal server error" });
  }
};

module.exports = {
  login,
};