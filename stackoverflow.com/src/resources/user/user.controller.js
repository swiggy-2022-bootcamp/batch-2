import { logger } from '../../utils/logger.js'
import User from './user.model.js'


export const me = (req, res) => {
    const methodName = '#me'
    logger.info(`${methodName} Request recieved to return details of user: ${JSON.stringify(req.user)}`)
    res.status(200).json({data: req.user})
}

export const updateMe = async (req, res) => {
    const methodName = '#updateMe'
    logger.info(`${methodName} Request recieved to update details of user: ${JSON.stringify(req.user)} with new body: ${JSON.stringify(req.user)}`)
    try{
        const user = await User.findByIdAndUpdate(req.user._id, req.body, {
            new: true
        })
        .lean()
        .exec()
        res.status(200).json({data: user})
    }catch(e){
        logger.error(`${methodName} Error encountered while updating details of user: ${JSON.stringify(req.user)} with new body: ${JSON.stringify(req.user)}`)
        return res.status(400).send({data: e});
    }
} 