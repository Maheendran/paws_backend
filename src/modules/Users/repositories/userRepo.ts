import { Types } from "mongoose";
import { verifyEmail } from "../../../services/MailSender";
import AddressModel, { AddressInterface } from "../entites/AddressModel";
import ClinicModel, { ClinicInterface } from "../entites/ClinicModel";
import DoctorModel, { DoctorInterface } from "../entites/DoctorModel";
import userModel, { UserInterface } from "../entites/userModel";
import { clinicDetail } from "../usecases/UserProfile";
import ClinicSlot from "../entites/ClinicSlot";
import PaymentModel, { PaymentInterface } from "../entites/PaymentModel";
import ClinicSlotModel from "../entites/ClinicSlot";
import adminModel from "../../Admin/entites/adminModel";
import ComplaintModel from "../entites/ComplaintModel";
// =============create new users=================
export const saveUser = async (
  data: UserInterface
): Promise<{
  status: string;
  message: string;
  data: UserInterface;
  mailStatus: string;
}> => {
  try {
    const user = new userModel({ ...data });
    await user.save();
    const mailStatus = await verifyEmail(data.email, data.otp);
    return {
      status: "success",
      message: "created account",
      data: user,
      mailStatus: mailStatus,
    };
  } catch (error) {
    throw new Error((error as Error).message);
  }
};

export const saveClinic = async (
  data: ClinicInterface
): Promise<{ status: string; message: string; data: ClinicInterface }> => {
  try {
    const user = new ClinicModel(data);
    await user.save();
    return { status: "success", message: "created account", data: user };
  } catch (error) {
    throw new Error((error as Error).message);
  }
};
//=========== google save ===================
export const googlesaveUser = async (
  data: UserInterface
): Promise<{
  status: string;
  message: string;
  data: UserInterface;
}> => {
  try {
    const user = new userModel({
      ...data,
      verified: true,
      createdBy: "google",
    });
    await user.save();

    return {
      status: "success",
      message: "created account",
      data: user,
    };
  } catch (error) {
    throw new Error((error as Error).message);
  }
};
export const googlesaveClinic = async (
  data: ClinicInterface
): Promise<{
  status: string;
  message: string;
  data: ClinicInterface;
}> => {
  try {
    const user = new ClinicModel({
      ...data,
      verified: true,
      createdBy: "google",
    });

    await user.save();

    return {
      status: "success",
      message: "created account",
      data: user,
    };
  } catch (error) {
    throw new Error((error as Error).message);
  }
};

// ==================find user by email and mobile verified false================
export const findUserByEmail = async (
  email: string,
  mobile: string
): Promise<UserInterface | null> => {
  try {
    return await userModel.findOne({ $or: [{ email }, { mobile }] }).exec();
  } catch (error) {
    throw new Error((error as Error).message);
  }
};
export const findClinicByEmail = async (
  email: string,
  mobile: string
): Promise<ClinicInterface | null> => {
  try {
    return await ClinicModel.findOne({ $or: [{ email }, { mobile }] }).exec();
  } catch (error) {
    throw new Error((error as Error).message);
  }
};
// ==================find user by email and mobile verified false================

export const forgotpassUser = async (
  email: string
): Promise<UserInterface | null> => {
  try {
    return await userModel
      .findOne({
        $and: [{ email }, { verified: true }, { createdBy: "manual" }],
      })
      .exec();
  } catch (error) {
    throw new Error((error as Error).message);
  }
};
export const forgotpassClinic = async (
  email: string
): Promise<ClinicInterface | null> => {
  try {
    return await ClinicModel.findOne({
      $and: [{ email }, { verified: true }, { createdBy: "manual" }],
    }).exec();
  } catch (error) {
    throw new Error((error as Error).message);
  }
};
// ========================find by id======================//
export const findPetOwnerById = async (
  userId: string
): Promise<UserInterface | null> => {
  try {
   
    return await userModel.findOne({ _id: userId });
  } catch (error) {
    throw new Error((error as Error).message);
  }
};
export const findClinicById = async (
  userId: string
): Promise<ClinicInterface | null> => {
  try {
    return await ClinicModel.findOne({ _id: userId });
  } catch (error) {
    throw new Error((error as Error).message);
  }
};
// ==============update user by id==================
type UpdateValues = {
  $set: {
    otp?: string;
    password?: string;
    username?: string;
  };
};
export const updateUserById = async (
  datas: string,
  values: UpdateValues
): Promise<UserInterface | null> => {
  try {
    return await userModel.findByIdAndUpdate(datas, values, { new: true });
  } catch (error) {
    throw new Error((error as Error).message);
  }
};
export const updateClinicById = async (
  datas: string,
  values: UpdateValues
): Promise<ClinicInterface | null> => {
  try {
    return await ClinicModel.findByIdAndUpdate(datas, values, { new: true });
  } catch (error) {
    throw new Error((error as Error).message);
  }
};
// ========================findOne in user model======================//
export const findOneInPetOwner = async (
  checkmodel: any
): Promise<UserInterface | null> => {
  try {
    return await userModel.findOne(checkmodel);
  } catch (error) {
    throw new Error((error as Error).message);
  }
};
export const findOneInClinic = async (
  checkmodel: any
): Promise<UserInterface | null> => {
  try {
    return await ClinicModel.findOne(checkmodel);
  } catch (error) {
    throw new Error((error as Error).message);
  }
};
// =======find by id and delete================//
export const findByIdDeleteUser = async (
  checkmodel: string
): Promise<UserInterface | null> => {
  try {
    return await userModel.findByIdAndDelete(checkmodel);
  } catch (error) {
    throw new Error((error as Error).message);
  }
};
export const findByIdDeleteClinic = async (
  checkmodel: string
): Promise<UserInterface | null> => {
  try {
    return await ClinicModel.findByIdAndDelete(checkmodel);
  } catch (error) {
    throw new Error((error as Error).message);
  }
};
// ===============update addres in addres model===========
export const updateAddress = async (
  _id: string,
  updateVale: Partial<AddressInterface>
): Promise<AddressInterface | null> => {
  try {
    return await AddressModel.findByIdAndUpdate(
      { _id },
      { ...updateVale },
      { new: true }
    );
  } catch (error) {
    throw new Error((error as Error).message);
  }
};
export const saveAddress = async (
  data: AddressInterface
): Promise<AddressInterface | null> => {
  try {
    const address = new AddressModel({ ...data });
    return await address.save();
  } catch (error) {
    throw new Error((error as Error).message);
  }
};
// ==========get address==================
export const getUseraddress = async (
  userId: string
): Promise<AddressInterface | null> => {
  try {
    return await AddressModel.findOne({ userId: userId });
  } catch (error) {
    throw new Error((error as Error).message);
  }
};
export const findservicesaddress = async (
  userId: string
): Promise<AddressInterface | null> => {
  try {
    return await AddressModel.findOne({ userId: userId });
  } catch (error) {
    throw new Error((error as Error).message);
  }
};

// ========= doctor CRUD===========

export const saveDoctor = async (
  data: DoctorInterface
): Promise<DoctorInterface | null> => {
  try {
    const doctor = new DoctorModel(data);
    return await doctor.save();
  } catch (error) {
    throw new Error((error as Error).message);
  }
};
export const findAlldoctors = async (clinicId: string) => {
  try {
    return await DoctorModel.find({ clinicId: clinicId });
  } catch (error) {
    throw new Error((error as Error).message);
  }
};
export const findAllVerifiedDoctors = async (
  clinicId: string,
  verified: string
) => {
  try {
    return await DoctorModel.find({ clinicId: clinicId, verified: verified });
  } catch (error) {
    throw new Error((error as Error).message);
  }
};
export const findByIdUpdatedDoctor = async (
  Id: String,
  updatedValue: Partial<DoctorInterface>
) => {
  try {
    return await DoctorModel.findByIdAndUpdate(
      Id,
      { ...updatedValue },
      { new: true }
    );
  } catch (error) {
    throw new Error((error as Error).message);
  }
};
export const findByIdUpdatedleave = async (
  Id: String,
  updatedValue: Partial<DoctorInterface>
) => {
  try {
    return await DoctorModel.findByIdAndUpdate(
      Id,
      { leave: updatedValue },
      { new: true }
    );
  } catch (error) {
    throw new Error((error as Error).message);
  }
};

export const deleteLeaveform = async (Id: String) => {
  try {
    return await DoctorModel.findByIdAndUpdate(
      Id,
      { leave: { startDate: "", endDate: "" } },
      { new: true }
    );
  } catch (error) {
    throw new Error((error as Error).message);
  }
};
export const LeaveHistory = async (data: any,doctorId:string) => {
  try {

    const datas= await DoctorModel.findByIdAndUpdate(
      doctorId,
      { $push: { leaveHistory:data} },
      { new: true }
    );
   
    return datas
  } catch (error) {
    throw new Error((error as Error).message);
  }
};

export const findByIdDeleteDoctor = async (doctorId: string) => {
  try {
    return await DoctorModel.findByIdAndDelete(doctorId);
  } catch (error) {
    throw new Error((error as Error).message);
  }
};

// ==============================service= pending==================================//
export const getAllClinic = async () => {
  try {
    const clinics = await ClinicModel.aggregate([
      {
        $match: { verified: true },
      },
      {
        $lookup: {
          from: "addresses",
          localField: "_id",
          foreignField: "userId",
          as: "address",
        },
      },
    ]);
    return clinics;
  } catch (error) {
    throw new Error((error as Error).message);
  }
};

//************* */ get clinic with check with address===============================
export const getAllClinicByAddress = async (value: any) => {
 
  try {
 const cityRegex = new RegExp(value.inputvalue, "i");

    if(value.search==='clinic'){
      throw new Error("error");
// const clinicNames=await ClinicModel.aggregate([
//   {$match:{clinicName:cityRegex}},
//   {
//     $lookup: {
//       from: "address",
//       localField: "_id",
//       foreignField: "userId",
//       as: "address",
//     },
//   },

// ])

//  return clinicNames;

    }
    else if(value.search==='place'){
    
        const matchingAddresses = await AddressModel.aggregate([
      { $match: { $or: [
        { city: { $regex: cityRegex } },
        { state: { $regex: cityRegex } },
        { addressLine: { $regex: cityRegex } },
      ]},},
      {
        $lookup: {
          from: "clinics",
          localField: "userId",
          foreignField: "_id",
          as: "clinicDetails",
        },
      },
      {
        $unwind: "$clinicDetails",
      },
      {
        $replaceRoot: { newRoot: "$clinicDetails" },
      },
      {
        $lookup: {
          from: "address",
          localField: "_id",
          foreignField: "userId",
          as: "address",
        },
      },
    ]);
  
return matchingAddresses;
    }
    else if(value.search==='doctor'){

        const doctorname=value.inputvalue
        const matchingdoctors = await DoctorModel.aggregate([
          { $match: {name:doctorname}},
          {
            $lookup: {
              from: "clinics",
              localField: "clinicId",
              foreignField: "_id",
              as: "clinicDetails",
            },
          },
          {
            $unwind: "$clinicDetails",
          },
   
          {
            $lookup: {
              from: "address",
              localField: "_id",
              foreignField: "userId",
              as: "address",
            },
          },
        ]);
        return matchingdoctors;
      }
  
  } catch (error) {
    throw new Error((error as Error).message);
  }
};

// =======GET DETAIL PAGE================//
export const findOneClinic = async (id: string) => {
  try {
    const ids = new Types.ObjectId(id);
    
    return await ClinicModel.aggregate([
      { $match: { _id: ids } },
      {
        $lookup: {
          from: "doctors",
          localField: "_id",
          foreignField: "clinicId",
          as: "doctorlist",
        },
      },
      {
        $lookup: {
          from: "addresses",
          localField: "_id",
          foreignField: "userId",
          as: "address",
        },
      },

      {
        $match: { "doctorlist.verified": "verified" },
      },
    ]);
  } catch (error) {
    throw new Error((error as Error).message);
  }
};

//=============get clinicslot==================
type optionValueType = {
  date: string;
  clinicId: string;
};
export const getClinicSlot = async (optionValue: optionValueType) => {
  try {
    return await ClinicSlot.aggregate([
      {
        $match: { ...optionValue },
      },
      {
        $lookup: {
          from: "users",
          localField: "Bookings.user_id",
          foreignField: "_id",
          as: "user",
        },
      },
    ]);
  } catch (error) {
    throw new Error((error as Error).message);
  }
};

export const saveClinicSlot = async (slotdata: any) => {
  try {
    const slot = new ClinicSlot({ ...slotdata });
    await slot.save();
  } catch (error) {
    throw new Error((error as Error).message);
  }
};
type optionValuetype = {
  date: string;
  clinicId: string;
  doctorId: string;
};
type updatevalueType = {
  user_id: string | undefined;
  time: string;
  status: string;
  reason: string;
};
export const updateClinicSlot = async (
  optionValue: optionValuetype,
  updatevalue: updatevalueType
) => {
  try {
    return ClinicSlot.updateOne(
      { ...optionValue },
      { $push: { Bookings: updatevalue } },
      { new: true }
    );
  } catch (error) {
    throw new Error((error as Error).message);
  }
};

// =======================cancel slot ==========================//
export const deleteClinicSlot = async (data: clinicDetail) => {
  try {
    return ClinicSlot.updateOne(
      {
        date: data.date,
        clinicId: data.clinicId,
        doctorId: data.doctorId,
        "Bookings._id": data.slotId,
      },
      {
        $set: {
          "Bookings.$.status": "cancelled",
          "Bookings.$.reason": data?.reason,
        },
      }
    );
  } catch (error) {
    throw new Error((error as Error).message);
  }
};

// get a slot

export const getSlot = async (data: clinicDetail) => {
  console.log(data,"data")
  try {
    return ClinicSlot.findOne(
      {
        date: data.date,
        clinicId: data.clinicId,
        doctorId: data.doctorId,
        "Bookings._id": data.slotId,
        "Bookings.status":'booked'
      } , { 'Bookings.$': 1 } 

      ).exec();

  
  } catch (error) {
    throw new Error((error as Error).message);
  }
};

// =============================payment===================================
export const saveNewPayment = async (data: PaymentInterface) => {
  try {
    const user = new PaymentModel({ ...data });
    await user.save();
  } catch (error) {
    throw new Error((error as Error).message);
  }
};
export const updateClinicAmount = async (
  creditedId: string,
  amount: number
) => {
  try {
    const updated = await ClinicModel.findByIdAndUpdate(
      creditedId,
      { $inc: { wallet: amount } },
      { new: true }
    );
    return updated;
  } catch (error) {
    throw new Error((error as Error).message);
  }
};
export const updatePetownerWallet = async (
  debited_id: string,
  amount: number
) => {
  try {
    const updated = await userModel.findByIdAndUpdate(
      debited_id,
      { $inc: { wallet: -amount } },
      { new: true }
    );
    return updated;
  } catch (error) {
    throw new Error((error as Error).message);
  }
};
// update admin wallet

export const updateAdminWallet = async (  commission: number
) => {
  try {
    const updated = await adminModel.findOneAndUpdate({},
      { $inc: { wallet: commission } },
      { new: true }
    );
    return updated;
  } catch (error) {
    throw new Error((error as Error).message);
  }
};

// cancel repo
export const updateUserAmount = async (creditedId: string, amount: number) => {
  try {
    const updated = await userModel.findByIdAndUpdate(
      creditedId,
      { $inc: { wallet: amount } },
      { new: true }
    );
    return updated;
  } catch (error) {
    throw new Error((error as Error).message);
  }
};
export const updateClinicWallet = async (
  debited_id: string,
  amount: number
) => {
  try {
    const updated = await ClinicModel.findByIdAndUpdate(
      debited_id,
      { $inc: { wallet: -amount } },
      { new: true }
    );
    return updated;
  } catch (error) {
    throw new Error((error as Error).message);
  }
};
// payment history

export const findallPaymentHistroy = async (userId: string | undefined) => {
  try {
    const payment = await PaymentModel.aggregate([
      {
        $match: {
          $or: [{ credited_id: userId }, { debited_id: userId }],
        },
      },
      {
        $sort: { date: -1, time: -1 },
      },
    ]);
    return payment;
  } catch (error) {
    throw new Error((error as Error).message);
  }
};

// find all booking history

export const findallBookingHistroy = async (userId: string | undefined) => {
  try {
    console.log(userId)
    const payment = await ClinicSlotModel.aggregate([
      {
        $match: {
          "Bookings.user_id": userId,
        },
      },
      {
        $addFields: {
          dateAsDate: {
            $toDate: "$date",
          },
        },
      },
      {
        $sort: {
          dateAsDate: -1,
        },
      },
      {
        $unwind: "$Bookings",
      },
      {
        $addFields: {
          clinicIdObjectId: {
            $toObjectId: "$clinicId",
          },
        },
      },
      {
        $addFields: {
          doctorIdObjectId: {
            $toObjectId: "$doctorId",
          },
        },
      },
      {
        $lookup: {
          from: "clinics",
          localField: "clinicIdObjectId",
          foreignField: "_id",
          as: "clinicInfo",
        },
      },
      {
        $lookup: {
          from: "doctors",
          localField: "doctorIdObjectId",
          foreignField: "_id",
          as: "doctorInfo",
        },
      },
    ]);
    return payment;
  } catch (error) {
    throw new Error((error as Error).message);
  }
};
export const findallClinicBooking = async (userId: string | undefined) => {
  try {
    console.log(userId)
    const payment = await ClinicSlotModel.aggregate([
      {
        $match: {
          "clinicId": userId,
        },
      },
      {
        $addFields: {
          dateAsDate: {
            $toDate: "$date",
          },
        },
      },
      {
        $sort: {
          dateAsDate: -1,
        },
      },
      {
        $unwind: "$Bookings",
      },
      {
        $addFields: {
          userIdObjectId: {
            $toObjectId: "$Bookings.user_id",
          },
        },
      },
      {
        $addFields: {
          doctorIdObjectId: {
            $toObjectId: "$doctorId",
          },
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "userIdObjectId",
          foreignField: "_id",
          as: "userInfo",
        },
      },
      {
        $lookup: {
          from: "doctors",
          localField: "doctorIdObjectId",
          foreignField: "_id",
          as: "doctorInfo",
        },
      },
    ]);
    return payment;
  } catch (error) {
    throw new Error((error as Error).message);
  }
};



// ============COMPLAINTS===============//


export const PushCompalint = async (data:any) => {
  try {
  const adddtaa= new ComplaintModel(data)
  const savedata=await adddtaa.save()
    return savedata;
  } catch (error) {
    throw new Error((error as Error).message);
  }
};
export const findAllCompalint = async (userId:string | undefined) => {
  try {
  
  const adddtaa= await ComplaintModel.find({userId:userId}).sort({createdAt:-1})
    return adddtaa;
  } catch (error) {
    throw new Error((error as Error).message);
  }
};

export const updateCompalint = async (complaintId:string) => {
  try {
  
  const udatedata= await ComplaintModel.findByIdAndUpdate(complaintId,{$set:{status:"cancelled"}},{new:true})
    return udatedata;
  } catch (error) {
    throw new Error((error as Error).message);
  }
};



