import mongoose, { Document, Schema } from "mongoose";

export interface clinicSlotInterface extends Document {
    date: string;
    clinicId: string;
    doctorId: string;
    
    Bookings: {
      user_id: string;
      time: string;
      status: string;
      reason?: string;
    }[];
    
}

const clinicSlotSchema: Schema = new Schema({
   
    date:{
        type:String,
        required:true
    },
    clinicId:{
        type:String,
        required:true
    },
    doctorId:{
        type:String,
        required:true
    },
    Bookings:[
        {
            user_id:{
            type:String,
            required:true
        },
        time:{
            type:String,
            required:true
        },
          status:{
                type:String,
                required:true
            },
            reason:{
                type:String, 
            }

        }
        
    ],
    

},{timestamps:true});

export default mongoose.model<clinicSlotInterface>("ClinicSlot", clinicSlotSchema);
