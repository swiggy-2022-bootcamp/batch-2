import User from './user.model.js'

console.log(User)

export const me = (req, res) => {
    console.log(req.user)
    res.status(200).json({data: req.user})
}

export const updateMe = async (req, res) => {
    try{
        const user = await User.findByIdAndUpdate(req.user._id, req.body, {
            new: true
        })
        .lean()
        .exec()
        res.status(200).json({data: user})
    }catch(e){
        return res.status(400).send({data: e});
    }
} 