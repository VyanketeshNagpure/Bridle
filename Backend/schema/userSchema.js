 import mongoose from "mongoose";


const userSchema = mongoose.Schema({
        firstName: { type: String, required: true },
        lastName: { type: String },
        email: { type: String, unique: true, required: true },
        phone: {type:String},
        password: { type: String, required: true },
        designation: { type: String },
        location: { type: String },
        manager: { type: String }
      
})


const User = mongoose.model('User', userSchema);

export default User;