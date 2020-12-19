const mongoose = require("mongoose");
const secretKey = require("../config.json").adminSecretKey;
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')


const AdminSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
  },
  password: {
    type: String,
    required: true,
  },
  tokens: [
    {
      token: {
        type: String,
        required: true,
      },
    },
  ],
},{timestamps:true});




//=============== for hash password ===============//
AdminSchema.pre('save',async function(next){
  const admin =this 
  if(admin.isModified('password')){
      admin.password = await bcrypt.hash(admin.password,8)
  }
  next();

})

//============= for generate tokens ===========================//
AdminSchema.methods.generateAuthToken = async function () {
  const admin = this;
  const token = await jwt.sign({ _id: admin._id.toString() }, secretKey);

  admin.tokens = await admin.tokens.concat({ token });
  await admin.save();
  return token;
};



AdminSchema.post('save', function(error, doc, next) {
  if (error.name === 'MongoError' && error.code === 11000) {
    next('user name already existed');
  } else {
    next();
  }
});


//============== for login =======================///
AdminSchema.statics.findByCredentials = async(userName,password)=>{
  const admin = await Admin.findOne({ userName }); 
  console.log(admin)
  console.log(userName,password)
  if(!admin) {
      throw new Error('wrong username or password')
  }
        
  const isMatch = await bcrypt.compare( password ,admin.password);
  
  if(!isMatch){
      throw new Error('wrong username or password')
  }
  return admin
  
}


Admin = mongoose.model("Admin", AdminSchema);
// module.exports = Admin;
