const express = require("express")
const multer = require("multer")
const uploadImage = require("./services/storage.service")
const postmodel = require("./model/post.model")
const cors = require("cors")


const app = express();
app.use(cors())
app.use(express.json());    


const upload= multer({storage:multer.memoryStorage()})

app.post('/create_post', upload.single("image"),async(req,res)=>{
    
   await console.log(req.body)
   await console.log(req.file)
   const result = await uploadImage(req.file.buffer)



   const post= await postmodel.create({
    image:result.url,
    caption:req.body.caption,
   })
   return res.json({message:"post created successfully"})
   
})

app.get("/posts",async(req,res)=>{
    const post= await postmodel.find()
    
    res.status(200).json({
        message:"post fetched successfully",
        posts: post
    })
})

module.exports = app
