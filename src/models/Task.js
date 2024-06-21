const mongoose = require('mongoose');


const TaskSchema = new mongoose.Schema({
    name:{
        type: String ,
        required: [true, 'must provide field'],   //validation check
        trim: true,       //validation check
        maxlength:[50, 'name cannot have more than 50 characters']   //validation check
    },
    completed:{
        type:  Boolean ,
        default: false 
    }
})

module.exports = mongoose.model('Task', TaskSchema);