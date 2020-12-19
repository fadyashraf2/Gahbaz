const mongoose = require("mongoose");

const GroupSchema = new mongoose.Schema({
  groupName: {
    type: String,
    required: true,
    unique: true,
  },
  // studentsIds: [
  //     {
  //       type:Schema.Types.ObjectId, 
  //       ref:'Student',
  //       unique:true
  //     }
  // ],
},{timestamps:true});


Group = mongoose.model("Group", GroupSchema);
