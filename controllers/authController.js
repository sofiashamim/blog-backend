let Auth= require('../models/Auth');
const bcrypt = require('bcrypt');


let createUser= async(req,res)=>{
    let {name,email,password,address}=req.body;

    try {
        let user= await Auth.findOne({email:email});
        if(!user){
            const salt = bcrypt.genSaltSync(10);
            const hashpassword = bcrypt.hashSync(password, salt);

         user= await new Auth({
            name:req.body.name,
            email:req.body.email,
            password:hashpassword,
            address:req.body.address,
        })
        await user.save()
         return res.status(200).json({success:true,msg:"user created successfully"})
    }
    else{
        return res.status(200).json({success:true,msg:"user already exists"})
    }
    } catch (error) {
        // res.send("error in creating user")
        return res.status(500).json({ success:false,msg:"error in register user",error:error.message})
    }
}

// update using id

let updateUser= async(req,res)=>{
    // let updatedUserpassword= req.body.password
    let {name,password,address}=req.body;
    let id= req.params._id;
    let hashpassword;
    try {
        if (password) {
            const salt= await bcrypt.genSaltSync(10)
            hashpassword= await bcrypt.hashSync(password,salt)
            
        } 
        console.log(id)
        let userExists= await Auth.findByIdAndUpdate(id,{$set:{address:address,name:name,password:hashpassword}})

        return res.status(200).json({success:true,msg:"user updated successfully"})

    } catch (error) {
        return res.status(500).json({success:false,msg:"error in updating user",error:error.message})
    }

}
    // await Auth.updateOne({email:email},{$set:{password:password}})
    // res.send("user email updated successfully")

    // in destructuring new variable cannot be written



// const updateUser= async(req,res)=>{
//     let {name,email,password}=req.body
//     let userexists= await Auth.findOne({email})
//     console.log(userexists)
//     if (userexists) {
//         let hashpassword;
//         if(password){
//             const salt= await bcrypt.genSaltSync(10)
//             hashpassword= await bcrypt.hashSync(password,salt)

//             let updatedUser= await Auth.updateOne({email:userexists.email},{$set:{name:name,password:hashpassword}})
//             return res.status(200).json({success:true,msg:"user updated successfully",updatedUser})
//         }
        
//     } else {
//         return res.status(200).json({success:false,msg:"user not valid or not found"})
//     }
// }



let loginUser= async(req,res)=>{
    let {email,password}= req.body
  try {
      let user= await Auth.findOne({email:req.body.email})
      if (user) {
        let comparePassword= bcrypt.compareSync(password,user.password); // true
        if(comparePassword){
           return res.json({success:true,msg:"user logged in successfully",user})
        }
        else{
            return res.json({success:false,msg:"Invalid password"})
        }
        
    } else {
        return res.json({success:false,msg:"invalid credentials or user not found"})
    }
  } catch (error) {
    res.json({success:false,msg:"error in logged in user"})
  }

}


let deleteUser= async(req,res)=>{
    try {
       let user= await Auth.findByIdAndDelete(req.params._id)
       res.status(200).json({success:true,msg:"user deleted "})
             
    } catch (error) {
       return res.status(500).json({success:false,msg:"error in deleting user"}) 
    }
// let deleteEmail= req.body.email
// let user= await Auth.findOne({email:deleteEmail})
// await Auth.deleteOne({email:deleteEmail})
// res.status().json({success:true,msg:"user deleted successfully"})
}

let getAllusers= async (req,res)=>{
    let allUser= await Auth.find({})
    if (allUser) {
        return res.status(200).json({success:true,msg:"users found",allUser})
    } else {
        return res.status(404).json({success:false,msg:"users not found"})
    }
}

module.exports ={
    createUser,
    updateUser,
    loginUser,
    deleteUser,
    getAllusers,
}
