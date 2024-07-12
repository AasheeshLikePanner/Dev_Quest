import mongoose, {Schema} from 'mongoose'

const solutionSchema = new Schema({
    link:{
        type:String,
        required:true,
    },
    owner:{
        type:Schema.Types.ObjectId,
        ref:'User'
    },
    content:{
        type:String,
        trim:true
    },
    title:{
        type:String,
        required:true,
        trim:true
    },
    comment:[
        {
            type:Schema.Types.ObjectId,
            ref:'Comment'
        }
    ],
    likeCount: {
        type: Number,
        default: 0
    }

},{timestamps:true})



export const Solution = mongoose.model("Solution", solutionSchema);