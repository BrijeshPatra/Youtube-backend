const User=require('../models/video.model.js')

const vcontroller=async(req,res)=>{
    try {
        const {title,description}=req.body;
        const url=`/uploads/videos${req.file.filename}`

        const video=new Video({
            title,
            description,
            url,
            user: req.user._id
        })
        await video.save()
        res.status(201).json({message:'Video uploaded successfully'})
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

exports.getVideos=async(req,res)=>{
    try{
        const videos=await Video.find().populate('user','username')
        res.status(200).json(videos)
    }catch(error){
        res.status(400).json({error: error.message})
    }
}