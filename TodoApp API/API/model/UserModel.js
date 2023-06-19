const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const UsersSchema = new mongoose.Schema({
    firstname: {
        type: String,
    },
    lastname: {
        type: String,
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
     TodosArray: [{
         type: mongoose.Schema.Types.ObjectId,
         ref: 'Todos'
     }]


}, );

UsersSchema.pre('save', async function (next) {
    if (this.isModified('password')) {
        const gensalt = bcrypt.genSalt(10)
        this.password = await bcrypt.hash(this.password, parseInt(gensalt))
    }
    next()
})

const User_Model = mongoose.model('Users', UsersSchema);

module.exports = User_Model;