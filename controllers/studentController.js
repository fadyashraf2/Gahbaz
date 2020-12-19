express = require("express");


// ====================== log in  ======================//
exports.logIn = async (req, res, next) => {
  try {
    const student = await Student.findByCredentials(
      req.body.code,
      req.body.password
    );
    const token = await student.generateAuthToken();

    res.send({ student, token });
  } catch (e) {
    res.status(400).send();
    console.log(e);
  }
};

// ====================== log out ======================//
exports.logOut = async (req, res, next) => {
  try {
    req.stduent.token = [];
    await req.admin.save();
    res.send("log out successfully");
  } catch (e) {
    res.status(500).send();
    console.log(e);
  }
};
