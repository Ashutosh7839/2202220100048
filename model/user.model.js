const mongoose = require("mongoose")


const userSchema = new mongoose.Schema({
    email: {required: true,type: String},
    name: {required: true,type: String},
    mobileNo: {required: true,type: String},
    githubUserName: {required: true,type: String},
    rollNo: {required: true,type: String},
    collegeName: {required: true,type: String},
    accessCode: {required: true,type: String},
    clientId: { type: String, required: true, unique: true },
    clientSecret: { type: String, required: true, unique: true },
},  {timestamps: true})

module.exports = mongoose.model("User",userSchema)


