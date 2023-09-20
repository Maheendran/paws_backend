import mongoose, { Document, Schema } from "mongoose";

export interface DoctorInterface extends Document {
clinicId:string,
name:string,
specialized:string,
qualification:string,
experience:string,
document:string,
verified:string
docVerified:boolean
startDate:string
endDate:string
doctorId:string
leaveHistory: LeaveEntry[];
}
interface LeaveEntry {
    startDate: string;
    endDate: string;
    days: number;
  }
const doctorSchema: Schema = new Schema({
    profileImage:{
        type:String,
    },
    clinicId:{
        type:mongoose.Types.ObjectId,
        ref:'Clinic',
        required:true
    },
    name:{
        type:String,
        required:true
    },
    specialized:{
        type:String,
        required:true
    },
    qualification:{
        type:String,
        required:true
    },
    experience:{
        type:String,
        required:true
    },
    document:{
        type:String, 
    },
    verified:{
        type:String,
        default:"pending"
    },
    leave: {
        type: Object,
        startDate: {
          type: String,
        },
        endDate: {
          type: String,
        },
      },
      fees:{
type:Number,
default:100
      },
      leaveHistory: [
        {
          startDate: {
            type: String,
           
          },
          endDate: {
            type: String,
            
          },
          days: {
            type: Number,
           
          },
        },]

},{timestamps:true});

export default mongoose.model<DoctorInterface>("Doctor", doctorSchema);
