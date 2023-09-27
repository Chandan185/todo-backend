import mongoose, { mongo } from "mongoose";

const TaskSchema=new mongoose.Schema({
    description:{
        type:String,
        required:true,
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'User'
    },
    status:{
        type:String,
        required:true,
        status:"todo",
    }
},
{
    timestamps:true
}
)

const Task=mongoose.model('task',TaskSchema);
export default Task;