import { User } from "../Model/User.js";
import bcrypt from 'bcryptjs';
export const register = async (req,res) => {
    const {name,password,email} = req.body;
   
    try{
        if(name === "" || email === "" || password === "") return res.json({message:"Please Fill All field",success: false});
        let user = await User.findOne({email});
        if(user) return res.json({message:"Already registerd please login1",success:false});
        const hashPass = await bcrypt.hash(password,10);
        user = await User.create({name,password:hashPass,email});
        res.json({message:"Register Successfully",success:true,user});
    }catch(err){
        res.json({message:err.message,success:false});
    }

}
export const login = async(req,res) =>{
    const {email,password} = req.body;
    try{
        let user = await User.findOne({email});
        if(!user) return res.json({message:"Please Registered First",success: false});
        const vaildPass =await bcrypt.compare(password, user.password);
        if(!vaildPass) return res.json({message:"Invaild Credential", success: false});
        res.json({message:"Login successFul", success:true, user});
    }
    catch(error){
        res.json({message:error.message,success:true})
    }
}

export const allUser = async(req,res) =>{

    try{
        let alluser = await User.find();
        res.json({message:"All Users",success:true,alluser });
    }
    catch(error){
        res.json({message:error.message, success:false});
    }
}