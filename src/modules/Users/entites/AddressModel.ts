import mongoose, { Document, Schema } from "mongoose";

export interface AddressInterface extends Document {
    userId: string;
    name: string;
    mobile: string;
    adressLine: string;
    city: string;
    state: boolean;
    pincode: string;
    country: string;
    is_default: boolean;
    longitude:number | undefined,
    latitude:number| undefined
  }
const addressSchema = new mongoose.Schema({
  userId: {
    type:mongoose.Types.ObjectId,
        ref:'Clinic',
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  mobile: {
    type: String,
  },
  adressLine: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  pincode: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  is_default: {
    type: Boolean,
    required: false,
  },
  longitude: {
    type: Number,
  },
  latitude: {
    type: Number,
  },
},{timestamps:true});

export default mongoose.model<AddressInterface>("Address", addressSchema);
