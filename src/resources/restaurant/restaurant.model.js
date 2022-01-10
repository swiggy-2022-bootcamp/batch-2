import mongoose from 'mongoose'
import bcrypt from 'bcrypt'

const restaurantSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true,
            trim: true,
            match: [/^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/, 'Please fill a valid email address']
        },
        phone: {
            type: Number,
            required: true,
            match: [/^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/, 'Please fill a valid phone number']
        },
        password: {
            type: String,
            required: true
        },
        address: {
            type: String,
            required: true
        },
        city: {
            type: String,
            required: true
        },
        website: String,
        about: String,
        avgRating: {
            type: Number,
            default: 0
        },
        createdBy: {
            type: mongoose.SchemaTypes.ObjectId,
            // required: true,
            ref: 'restaurant'
        }

    },
    {timestamps: true}
)

restaurantSchema.pre('save', function(next){
    if(!this.isModified('password')) return next()
    if(this.isModified('password')){
        bcrypt.hash(this.password, 8, (err, hash) => {
          if (err) {
            return next(err)
          }

          this.password = hash
          next()
        })
    }
})

restaurantSchema.pre('update', function(next){
    if(!this.isModified('password')) return next()
    if(this.isModified('password')){
        bcrypt.hash(this.password, 8, (err, hash) => {
          if (err) {
            return next(err)
          }

          this.password = hash
          next()
        })
    }
})

restaurantSchema.methods.checkPassword = function(password) {
  const passwordHash = this.password
  return new Promise((resolve, reject) => {
    bcrypt.compare(password, passwordHash, (err, same) => {
      if (err) {
          console.log(err)
        return reject(err)
      }
      resolve(same)
    })
  })
}

export const Restaurant = mongoose.model('restaurant', restaurantSchema)