const express = require("express");
const router = express.Router();
const Student = require("../models/Student");

// 1. GET ALL STUDENTS
router.get("/", async (req, res, next) => {
  try {
    const students = await Student.find().sort({ createdAt: -1 });
    res.status(200).json(students);
  } catch (error) {
    next(error);
  }
});

// 2. CREATE STUDENT
router.post("/create-student", async (req, res, next) => {
  try {
    const newStudent = await Student.create(req.body);
    res.status(201).json(newStudent);
  } catch (error) {
    next(error);
  }
});

// 3. GET SINGLE STUDENT FOR EDIT
router.get("/edit-student/:id", async (req, res, next) => {
  try {
    const student = await Student.findById(req.params.id);
    if (!student) return res.status(404).json({ message: "Student not found" });
    res.status(200).json(student);
  } catch (error) {
    next(error);
  }
});

// 4. UPDATE STUDENT
router.put("/update-student/:id", async (req, res, next) => {
  try {
    const updated = await Student.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true, runValidators: true },
    );
    if (!updated) return res.status(404).json({ message: "Student not found" });
    res.status(200).json(updated);
  } catch (error) {
    next(error);
  }
});

// 5. DELETE STUDENT
router.delete("/delete-student/:id", async (req, res, next) => {
  try {
    const deleted = await Student.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Student not found" });
    res
      .status(200)
      .json({ message: "Student deleted successfully", id: req.params.id });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
