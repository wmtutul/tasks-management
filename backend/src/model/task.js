const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema(
    {
        title: {type: String, required:true, unique:true},
        desc: {type: String, required:true, unique:true},
        important: {type: Boolean, default:false},
        complete: {type: Boolean, default:false},

    }, {timestamps:true}
    
)

 module.exports = mongoose.model("task", TaskSchema);

//const taskModel = mongoose.model('task', TaskSchema)
//module.exports = taskModel;

