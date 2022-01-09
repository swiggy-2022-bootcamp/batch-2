import User from '../models/user.model.js'

console.log('[' + new Date().toLocaleString('en-US', {timeZone: 'Asia/Kolkata'}) + '] ', User)

/**
 * displayUserInfo : display user info
 */
export const displayUserInfo = (req, res) => {
    console.log('[' + new Date().toLocaleString('en-US', {timeZone: 'Asia/Kolkata'}) + '] ', req.user)
    res.status(200).json({ message: "User Info", data: req.user})
}

/**
 * updateUserInfo : update user info 
 */
export const updateUserIndo = async (req, res) => {
    try{
        const user = await User.findByIdAndUpdate(req.user._id, req.body, {
            new: true
        })
        .select("-updatedAt, -__v")
        .lean()
        .exec();
        
        res.status(200).json({message: "User Updated Successfull", data: user})
    }catch(e){
        return res.status(400).send({data: e});
    }
} 
