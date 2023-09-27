import mongoose from "mongoose";
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken';
const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true,
    },
},
{
    timestamps:true
}
)

//hashing the password before saving it to the database
userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
      next();
    }
    this.password = await bcrypt.hash(this.password, 10);
  });
  
  //checking if the password entered by the user is correct or not
  userSchema.methods.comparePassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
  };
  
  //generating jwt token for the user
  userSchema.methods.getjwtToken = function () {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET_KEY, {
      expiresIn: process.env.JWT_EXPIRE_TIME,
    });
  };
  

const User=mongoose.model('user',userSchema);
export default User;