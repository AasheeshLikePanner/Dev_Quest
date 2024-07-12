import mongoose, {Schema} from 'mongoose'

const problemSchema  = new Schema({
    content:{
        type:String,
        required:true,
        trim:true,
    },
    title:{
        type:String,
        required:true,
        trim:true,
    },
    comment:[
        {
            type:Schema.Types.ObjectId,
            ref:"Comment"
        }
    ],
    solution:[
        {
            type:Schema.Types.ObjectId,
            ref:"Solution"
        }
    ]
},{timestamps:true})

export const Problem = mongoose.model("Problem", problemSchema);