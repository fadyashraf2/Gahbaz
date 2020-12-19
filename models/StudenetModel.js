const mongoose = require("mongoose");
const secretKey = require("../config.json").adminSecretKey;
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const StudentSchema = new mongoose.Schema({
  code: {
    type: String,
    required: true,
    unique: true,
  },

  password: {
    type: String,
    required: true,
  },
  groupId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Group",
  },

  token: [
    {
      token: {
        type: String,

      },
    },
  ],
  name: {
    type: String,
  },
  grade: {
    type: String,
  },

  //   exams: [
  //       {
  //         type:Schema.Types.ObjectId,
  //         ref:'Student',
  //         unique:true
  //       }
  //   ],
},{timestamps:true});

//=============== for hash password ===============//
StudentSchema.pre("save", async function (next) {
  const student = this;
  if (student.isModified("password")) {
    student.password = await bcrypt.hash(student.password, 8);
  }
  next();
});

//============= for generate tokens ===========================//
StudentSchema.methods.generateAuthToken = async function () {
  const student = this;
  const token = await jwt.sign({ _id: student._id.toString() }, secretKey);
  student.token = [token];
  await student.save();
  return token;
};

Student = mongoose.model("Student", StudentSchema);
