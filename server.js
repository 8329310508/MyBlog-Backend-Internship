const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");
const jwt = require("jsonwebtoken");
const authMiddleware = require("./middleware/authMiddleware");

const app = express();

// Render साठी PORT
const PORT = process.env.PORT || 3000;

const DB_FILE = path.join(__dirname, "db.json");

app.use(cors());
app.use(express.json());


// =========================
// DATABASE FUNCTIONS
// =========================

function readDB() {
  if (!fs.existsSync(DB_FILE)) {
    return {
      users: [],
      blogs: []
    };
  }

  return JSON.parse(
    fs.readFileSync(DB_FILE, "utf8")
  );
}

function writeDB(data) {
  fs.writeFileSync(
    DB_FILE,
    JSON.stringify(data, null, 2)
  );
}


// =========================
// HOME ROUTE
// =========================

app.get("/", (req, res) => {
  res.json({
    message: "MyBlog Backend API is running successfully",
    status: "success"
  });
});


// =========================
// REGISTER
// =========================

app.post("/api/register", (req, res) => {

  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({
      message: "All fields are required"
    });
  }

  const db = readDB();

  const existingUser = db.users.find(
    u => u.email.toLowerCase() === email.toLowerCase()
  );

  if (existingUser) {
    return res.status(409).json({
      message: "Email already registered"
    });
  }

  const user = {
    id: Date.now(),
    name: name,
    email: email,
    password: password
  };

  db.users.push(user);

  writeDB(db);

  res.status(201).json({
    message: "Registration successful",
    user: {
      id: user.id,
      name: user.name,
      email: user.email
    }
  });

});


// =========================
// LOGIN
// =========================

app.post("/api/login", (req, res) => {

  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      message: "Email and password are required"
    });
  }

  const db = readDB();

  const user = db.users.find(
    u =>
      u.email.toLowerCase() === email.toLowerCase() &&
      u.password === password
  );

  if (!user) {
    return res.status(401).json({
      message: "Invalid email or password"
    });
  }

  const token = jwt.sign(
    {
      id: user.id,
      name: user.name,
      email: user.email
    },
    process.env.JWT_SECRET || "mysecretkey"
  );

  res.json({
    message: "Login successful",
    token: token,
    user: {
      id: user.id,
      name: user.name,
      email: user.email
    }
  });

});


// =========================
// CREATE BLOG
// =========================

app.post("/api/blogs", authMiddleware, (req, res) => {

  const { title, content, author } = req.body;

  if (!title || !content || !author) {
    return res.status(400).json({
      message: "Title, content and author are required"
    });
  }

  const db = readDB();

  const blog = {
    id: Date.now(),
    title: title,
    content: content,
    author: author,
    createdAt: new Date().toISOString()
  };

  db.blogs.push(blog);

  writeDB(db);

  res.status(201).json({
    message: "Blog created successfully",
    blog: blog
  });

});


// =========================
// GET ALL BLOGS
// =========================

app.get("/api/blogs", authMiddleware, (req, res) => {

  const db = readDB();

  res.json(db.blogs);

});


// =========================
// GET BLOG BY ID
// =========================

app.get("/api/blogs/:id", (req, res) => {

  const db = readDB();

  const blog = db.blogs.find(
    b => b.id === Number(req.params.id)
  );

  if (!blog) {
    return res.status(404).json({
      message: "Blog not found"
    });
  }

  res.json(blog);

});


// =========================
// START SERVER
// =========================

app.listen(PORT, () => {

  console.log(
    `MyBlog Backend running on port ${PORT}`
  );

});
