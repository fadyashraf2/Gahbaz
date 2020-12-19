express = require("express");

// ====================== sign up ======================//
exports.signUp = async (req, res, next) => {
  const newAdmin = new Admin(req.body);
  try {
    await newAdmin.save();
    const token = await newAdmin.generateAuthToken();

    res.status(201).send({ newAdmin, token });
  } catch (e) {
    console.log(e);
    res.status(400).send(e);
  }
};

// ====================== log in  ======================//
exports.logIn = async (req, res, next) => {
  try {
    const admin = await Admin.findByCredentials(
      req.body.userName,
      req.body.password
    );

    const token = await admin.generateAuthToken();

    res.send({ admin, token });
  } catch (e) {
    res.status(400).send();
    console.log(e);
  }
};


// ====================== log out ======================//
exports.logOut = async (req, res, next) => {
  try {
    req.admin.tokens = req.admin.tokens.filter((token) => {
      return token.token !== req.token;
    });
    await req.admin.save();
    res.send();
  } catch (e) {
    res.status(500).send();
    console.log(e);
  }
};

// ====================== log out from all devices ======================//
exports.logOutAll = async (req, res, next) => {
  try {
    req.admin.tokens = [];
    await req.admin.save();
    res.send();
  } catch (e) {
    res.status(500).send();
    console.log(e);
  }
};

// ====================== create Group ======================//
exports.createGroup = async (req, res) => {
  try {
    console.log(req.body);
    const group = new Group(req.body);
    await group.save(req.body);
    res.send("group created successfully");
  } catch (e) {
    console.log(e);
    res.status(500).send(e);
  }
};


// ====================== add new student ======================//
exports.addStudent = async (req, res) => {
  try {
    console.log(req.body);
    const student = new Student(req.body);
    await student.save(req.body);
    res.send("student created successfully");
  } catch (e) {
    console.log(e);
    res.status(500).send(e);
  }
};

// ====================== get all users ======================//
exports.getAllStudents = async (req, res) => {
  try {
    const users = await Student.find({}, { password: 0, tokens: 0 });
    res.send(users);
  } catch (e) {
    res.status(500).send(e);
  }
};
