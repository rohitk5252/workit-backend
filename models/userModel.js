const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcrypt')
const validator = require('validator')

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        unique: true
    }
})


// Static signup method 
userSchema.statics.signup = async function(email, password) {
    // Validation 
    if (!email || !password) {
        throw Error("All fields required !")
    }
    if(!validator.isEmail(email)) {
        throw Error(("Invalid emill type"))
    }

    if(!validator.isStrongPassword(password)) {
        throw Error('Password not strong emough')
    }

    const exists = await this.findOne({ email })

    if(exists) {
        throw Error("Email already exists")
    }

    // Salt is a random string
    const salt = await bcrypt.genSalt(10)
    // hashing the password
    const hash = await bcrypt.hash(password, salt)
    // saving to database
    const user = await this.create({ email, password: hash })
     
    return user
}

// static login method 
userSchema.statics.login = async function(email, password) {
    if (!email || !password) {
        throw Error("All fields required !")
    }
    
    const user = await this.findOne({ email })

    if(!user) {
        throw Error("User does not exists")
    }

    const match = await bcrypt.compare(password, user.password)

    if(!match) {
        throw Error("Incorrect password !")
    }

    return user
}

module.exports = mongoose.model('User', userSchema)
