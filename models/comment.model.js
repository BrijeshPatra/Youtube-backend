import mongoose from "mongoose";

const commentSchema=mongoose.Schema({
    text:{
        type: String,
        required: true,
    },
    video:{
        type: mongoose.Schema.Types.ObjectId, ref: 'User'
    },
    user:{
        type: mongoose.Schema.Types.ObjectId, ref: 'User'
    },
})

module.exports=mongoose.model('Comment',commentSchema)