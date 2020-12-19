const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
// const multer = require('multer');
const adminAuth = require('../middlewares/adminAuth')

//========================= add new admin ============================// 
router.post('/admin/signUp',adminController.signUp);


//========================= login admin ============================// 
router.post('/admin/login',adminController.logIn);


//========================= logout admin ============================// 
router.post('/admin/logout', adminAuth ,adminController.logOut);




// //========================= get all users ===================//
// router.get('/admin/getAllUsers', adminAuth ,adminController.getAllUsers);

// //========================= delete an  user with all data and ads ===================//
// router.post('/admin/deleteUser/:id', adminAuth ,adminController.deleteAnUser);


//===================  create Group     ===================//
router.post('/admin/addGroup', adminAuth ,adminController.createGroup);

//===================  create student     ===================//
router.post('/admin/addStudent', adminAuth ,adminController.addStudent);




module.exports = router