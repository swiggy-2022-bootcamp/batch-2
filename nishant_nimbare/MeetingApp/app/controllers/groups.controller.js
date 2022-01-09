const User = require("../models/user.model");
const { makeErr } = require("../utils/error.utils");
const { MongoError } = require('mongodb');

exports.createGroup =  async (req, res, next) => {
    let { email, name,  members} = req.body;
    let uniqueMember = new Set(members);
    uniqueMember.add(res.locals.user.email); // creator will be part of group 

    try {

        let newGrp = await User.create({
            email,
            name,
            admin:res.locals.user.email,
            members: [...uniqueMember], // remove duplicates
            isGroup:true
        });

        res.status(200).send(newGrp);

    } catch (err) {
        if (err instanceof MongoError && err.code === 11000) {
            // mongo duplication err, thrown when email is already in use
            return next(makeErr('Email already exist', 400));
        }
        next(err);
    }
}

exports.addGroupMembers = async (req, res, next) => {
    let {group, members} = req.body;
    if(!Array.isArray(members)){
        next(makeErr("members should be array"))
    }

    let result = await User.updateOne({ email: group, isGroup:true, admin:res.locals.user.email}, {
        $push: {
            members: {$each: members},
        },
    });
    console.log(result);
    if(result.matchedCount === 0) 
        next(makeErr("group doesn't exists or you are not authorized", 401));
    return res.status(200).send({message:"members added"}); 
} 

exports.removeGroupMembers = async (req, res, next) => {
    let {group, members} = req.body;
    if(!Array.isArray(members)){
        next(makeErr("members should be array"))
    }

    let result = await User.updateOne({ email: group, isGroup:true, admin:res.locals.user.email}, {
        $pullAll: {
            members: members,
        },
    });
    console.log(result);
    if(result.matchedCount === 0) 
        next(makeErr("group doesn't exists or you are not authorized", 401));
    return res.status(200).send({message:"members removed"}); 
} 


exports.viewGroups =  async (req, res, next) => {
    
    let result = await User.find({ isGroup:true, members: res.locals.user.email}).lean();

    let transformed = result.map(g => {
        delete g.__v;
        delete g.isGroup;
        return g;
    });

    return res.status(200).send(transformed);
}
