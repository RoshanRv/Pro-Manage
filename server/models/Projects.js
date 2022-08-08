const mongoose = require('mongoose')

const ProjectSchema = new mongoose.Schema({
    name:{
        type:String,
    },
    status:{
        type:String,
    },
    description:{
        type:String,
        enum:['Not Started','In Progress','Done']
    },
    clientId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Client '
    }
})

module.exports = mongoose.model('Project',ProjectSchema)