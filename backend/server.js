const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const Todo = require("./models/Todo");
const Student = require("./models/student");

const app = express();
app.use(cors());
app.use(express.json());

// Connect MongoDB
console.log(process.env.MONGO_URI);
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));
// Routes

// GET all todos
app.get("/todos", async (req, res) => {
  const todos = await Todo.find();
  res.json(todos);
});

// ADD todo
app.post("/todos", async (req, res) => {
  const newTodo = new Todo({ text: req.body.text });
  await newTodo.save();
  res.json(newTodo);
});

// DELETE todo
app.delete("/todos/:id", async (req, res) => {
  await Todo.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
});



// this routes are used for the student

// GET all students
app.get("/students", async (req, res) => {
  const students = await Student.find();
  res.json(students);
});

// ADD student
app.post("/students", async (req, res) => {
  const newstudent = new Student({ name: req.body.name,
                                  department: req.body.department ,
                                  level: req.body.level 
  });
  await newstudent.save();
  res.json(newstudent);
});
app.put("/students/:id", async (req, res) => {
  try {
    const updated = await Student.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// DELETE student
app.delete("/students/:id", async (req, res) => {
  await Student.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
});

app.listen(5000, () => console.log("Server running on port 5000"));