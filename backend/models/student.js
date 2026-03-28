const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
  name: {
    type:String,
    required:true
  },
  department: {
    type:String,
    required:true
  },
  level:{
    type:Number,
    required:true
  }
  
});

module.exports = mongoose.model("Student", studentSchema );