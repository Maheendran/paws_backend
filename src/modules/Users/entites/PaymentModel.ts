
import mongoose, { Document, Schema } from "mongoose";

export interface PaymentInterface extends Document {
  credited_id:string,
  debited_id:string,
  debited_name:string,
  credited_name:string,
  amount:number,
  paymentType:string,
  time:number,
  date:string,
  status:string,
  type:string
}

const paymentSchema: Schema = new Schema({
  credited_id: {
    type: String,
    required: true,
  },
  debited_id: {
    type: String,
    required: true,
  },
  debited_name: {
    type: String,
  
  },
  credited_name: {
    type: String,
   
  }
  ,
  amount: {
    type: Number,
    required: true,
  },
  paymentType: {
    type: String,
    required: true,
  }
  ,
  time: {
    type:Number,
    required: true,
  }
  ,
  date: {
    type: String,
    required: true,
  },
  status: {
    type: String,
   
  }
},{timestamps:true});

export default mongoose.model<PaymentInterface>("Payment", paymentSchema);
