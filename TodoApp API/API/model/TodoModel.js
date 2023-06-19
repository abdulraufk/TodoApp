const mongoose = require('mongoose')
const todos = new mongoose.Schema({
    title: {
        type: String,
    },
    discription: {
        type: String,
        required: true
    },
     status: {
         type: String,
         required: true
     },
     date: {
         type: Date,
         default: Date.now,
         timestamps: true
     },
    priority: {
        type: String,
        enum: ['Low', 'Medium', 'High'],
        default: 'Medium'
       },
      UserArray: [{
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Users'
      }]

}, );
const Todos_Model = mongoose.model('Todos', todos);

module.exports = Todos_Model;