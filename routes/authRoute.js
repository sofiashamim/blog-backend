const express= require ('express');
const{createUser,updateUser, deleteUser, loginUser, getAllusers}=require('../controllers/authController')
const router = express.Router()

// router.post('/regiter')
router.post('/register',createUser)
router.put('/:_id',updateUser)
router.delete('/delete/:_id',deleteUser)
router.post('/login',loginUser)
router.get('/getall',getAllusers)

module.exports= router;