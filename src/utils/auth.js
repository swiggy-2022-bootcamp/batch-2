
/*
This is a Generic Auth Controller.
*/

import jwt from 'jsonwebtoken'

const jwtSecret = 'swiggyi++'
const expirationSeconds = 60 * 60 * 24 * 7; // one week

const newToken = entity => { // Create a new JWT Token, by hashing the ID as payload
    return jwt.sign({id: entity._id}, jwtSecret, {
    expiresIn: expirationSeconds
  })
}

const verifyToken = token => { // Used to verify whether the jwt token is valid or not and retrieves back the creatorss ID
    return new Promise((resolve, reject) => {
        jwt.verify(token, jwtSecret, (err, payload) => {
            if (err) return reject(err)
            resolve(payload)
        })
    })
}

const signUp = model => async(req, res) => { // Creates new Entity and return the JWT Token
    if(!req.body.email || !req.body.password){
        return res.status(400).end({ message: 'Need email and Password' })
    }
    try {
        const entity = await model.create(req.body)

        const updatedDoc = await model
      .findOneAndUpdate(
        {
          _id: entity._id
        },
        { createdBy: entity._id },
        { new: true }
      )
      .lean()
      .exec()

    if (!updatedDoc) {
      return res.status(400).end()
    }

        const token = newToken(entity)
        return res.status(201).send({ token })
    } catch (e) {
        console.log(e)
        return res.status(500).end()
    }
}

const signIn = model => async(req, res) => { // Validates given Credentials and returns JWT Token
    if(!req.body.email || !req.body.password){
        return res.status(400).end({ message: 'Need email and Password' })
    }

    const invalid = { message: 'Invalid email and password combination' }

    try{
        let entity = await model.findOne({ email: req.body.email })
        .select('email password')
        .exec()
        console.log('entity', entity)
        if(!entity){
            return res.status(400).send(invalid)
        }

        const match = await entity.checkPassword(req.body.password)
        console.log('match', match)
        if(!match){
            return res.status(400).send(invalid)
        }
        const token = newToken(entity)
        return res.status(201).send({ token })

    }catch(e){
        console.log(e)
        res.status(500).end()
    }
}

export const protect = model => async(req, res, next) => { // Used to Validate JWT token
    let bearer = req.headers.authorization
    if (!bearer || !bearer.startsWith('Bearer ')) {
        return res.status(401).end()
    }
    const token = bearer.split('Bearer ')[1].trim()
    let payload
    try {
        payload = await verifyToken(token)
    } catch (e) {
        return res.status(401).end()
    }
    const entity = await model.findById(payload.id)
        .select('-password')
        .lean()
        .exec()

    if (!entity) {
        return res.status(401).end()
    }

    req.entity = entity
    next()
}

export const authControllers = (model) => {
    return {
        signIn: signIn(model),
        signUp: signUp(model),
        protect: protect(model)
    }
}