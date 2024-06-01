const express= require ('express');
const{createPost,deletePost, updatePost, singlePost, getallusersPost, getallPosts}=require('../controllers/post')
const router = express.Router()

router.post('/create',createPost)
router.delete('/delete/:_id',deletePost)
router.put('/update/:_id',updatePost)
router.get('/single/:_id',singlePost)
router.get('/getalluserspost',getallusersPost)
router.get('/getallposts/:_id',getallPosts)

module.exports= router;