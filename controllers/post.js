const { response } = require('express');
let Post= require('../models/Post');

let createPost= async(req,res)=>{
    let {title,description, image,author}= req.body
// let author= params._id


    try {
        // jab new post use krte h data create krne k liy to await save krna padta hai.aur agar create use krte h tab save klrne ki jarurat ni
       let post=await new Post({
            title:title,
            image:image,
            description:description,
            author:author
        })
        await post.save()
        return res.status(200).json({success:true,msg:"post created successfully",post})
    } catch (error) {
        return res.status(500).json({success:false,msg:"error in post creation",error:error.message})
    }
}

let deletePost= async(req,res)=>{
    let id=req.params._id;
 try {
    await Post.findByIdAndDelete(id)
    return res.status(200).json({success:true,msg:"post deleted successfully"})
 } catch (error) {
return res.status(500).json({success:false,msg:"error in post deletion",error:error.message})
 }
}

const updatePost =async(req,res)=>{
    let {title,description,image}=req.body
    let id= req.params._id;
    try {
        let post= await Post.findByIdAndUpdate({_id:id},{$set:{title,description,image}},{new:true})
        res.status(200).json({success:true,msg:"post updated successfully"})
    } catch (error) {
        response.status(500).json({success:false,msg:"error in updating post",error:error.message})
    }
}

const singlePost= async(req,res)=>{
    let _id= req.params._id;
    try {
        let post= await Post.findById(_id)
        res.status(200).json({success:true,msg:"post fetched successfully",post})
    } catch (error) {
        response.status(500).json({success:false,msg:"error in getting post",error:error.message})
    }
}

const getallusersPost= async(req,res)=>{
    
    try {
        let allposts= await Post.find().populate({path:'author'});
        if (allposts) {
            return res.status(200).json({success:true,msg:"allposts fetched successfully",allposts})
            
        } else {
            return res.status(404).json({success:false,msg:"no posts found"})
        }
    } catch (error) {
     return res.status(500).json({success:false,msg:"error in fetching all users post",error:error.message})
    }
}

const getallPosts= async(req,res)=>{
    let _id= req.params._id;
    try {
        let allPost= await Post.find({author:_id})
        if (allPost.length) {
            res.status(200).json({success:true,msg:"fetched all post successfully",allPost})
            
        } else {
            return res.status(404).json({success:false,msg:"no posts found"})
        }
    } catch (error) {
        res.status().json({success:false,msg:"error in fetching all posts"})
    }
}

module.exports={
    createPost,
    deletePost,
    updatePost,
    singlePost,
    getallusersPost,
    getallPosts
}