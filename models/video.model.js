import mongoose from "mongoose";

const videoSchema=mongoose.Schema({
    title:{
        type: String,
        required: true,
        unique: true 
    },
    description:{
        type: String,
        required: true,
    },
    url:{
        type: String,
        required: true,
        unique: true 
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,ref: 'User'
    }
})

module.exports=mongoose.model('Video',videoSchema)