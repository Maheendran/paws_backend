import mongoose, { Document, Schema } from "mongoose";

export interface complaintSlotInterface extends Document {
    date: string;
    userId: string;
    message: string; 
    status:string
}

const complaintSlotSchema: Schema = new Schema({
   
    date:{
        type:String,
        // required:true
    },
    userId:{
        // type:String,
        // // required:true
        type:mongoose.Types.ObjectId,
        ref:'User',
        required:true
    },
    userName:{
        type:String,
        // required:true
    },
    message:{
        type:String,
        // required:true
    },
    status:{
        type:String,
        default:"resolve"
    },
    scrnshot:{
        type:String,
    }

},{timestamps:true});

export default mongoose.model<complaintSlotInterface>("Complaint", complaintSlotSchema);
