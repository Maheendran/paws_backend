import { AddressInterface } from "../entites/AddressModel";
import { DoctorInterface } from "../entites/DoctorModel";
import {
  LeaveHistory,
  deleteClinicSlot,
  deleteLeaveform,
  findAlldoctors,
  findByIdDeleteDoctor,
  findByIdUpdatedDoctor,
  findByIdUpdatedleave,
  findClinicByEmail,
  findClinicById,
  findOneClinic,
  findPetOwnerById,
  findUserByEmail,
  findservicesaddress,
  getAllClinic,
  getAllClinicByAddress,
  getClinicSlot,
  getSlot,
  getUseraddress,
  saveAddress,
  saveClinicSlot,
  saveDoctor,
  updateAddress,
  updateClinicById,
  updateClinicSlot,
  updateUserById,
} from "../repositories/userRepo";
import cloudinary from "cloudinary";

export const PetOwnerCurrentUser = async (datas: any) => {
  try {
    const existingUser = await findPetOwnerById(datas);
    if (existingUser) {
      const address = await getUseraddress(existingUser._id);
      return {
        status: "success",
        message: "profile matching and address matching ",
        userdata: existingUser,
        address: address,
      };
    }
    return {
      status: "success",
      message: "profile matching",
      userdata: existingUser,
      address: {},
    };
  } catch (error) {
    throw new Error((error as Error).message);
  }
};
export const ClinicCurrentUser = async (datas: any) => {
  try {
    const existingUser = await findClinicById(datas);
    if (existingUser) {
      const address = await getUseraddress(existingUser._id);
      return {
        status: "success",
        message: "profile matching and address matching ",
        userdata: existingUser,
        address: address,
      };
    }
    return {
      status: "success",
      message: "profile matching",
      userdata: existingUser,
      address: {},
    };
  } catch (error) {
    throw new Error((error as Error).message);
  }
};
//===================== update profile pic===============
export const UserProfileUpdate = async (id: string, values: any) => {
  try {
    if (values?.email || values?.mobile) {
      const emailExisit = await findUserByEmail(values.email, values.mobile);
      if (emailExisit && emailExisit._id !== id && emailExisit.verified) {
        if (emailExisit.email === values.email) {
          return {
            status: "error",
            message: "Email already exisit",
          };
        }
        if (emailExisit.mobile == values.mobile) {
          return {
            status: "error",
            message: "Mobile already exisit",
          };
        }
      }
    }
    if (values?.image) {
      const uploadResponse = await cloudinary.v2.uploader.upload(values.image);
      values.profileImage = uploadResponse.url;
    }

    const value = { $set: { ...values } };

    const updaedUser = await updateUserById(id, value);
    return {
      status: "success",
      message: "profile updated",
      userdata: updaedUser,
    };
  } catch (error) {
    throw new Error((error as Error).message);
  }
};

export const ClinicProfileUpdate = async (id: string, values: any) => {
  try {
    if (values?.email || values?.mobile) {
      const emailExisit = await findClinicByEmail(values.email, values.mobile);
      
      if (emailExisit && emailExisit._id !== id && emailExisit.verified) {
        if (emailExisit.email === values.email) {
          return {
            status: "error",
            message: "Email already exisit",
          };
        }
        if (emailExisit.mobile == values.mobile) {
          return {
            status: "error",
            message: "Mobile already exisit",
          };
        }
      }
    }
    if (values?.image) {
      const uploadResponse = await cloudinary.v2.uploader.upload(values.image);
      values.profileImage = uploadResponse.url;
    }

    const value = { $set: { ...values } };
    const updaedUser = await updateClinicById(id, value);
    return {
      status: "success",
      message: "profile updated",
      userdata: updaedUser,
    };
  } catch (error) {
    throw new Error((error as Error).message);
  }
};

// ========== address===================
export const PetOwnerAddress = async (data: AddressInterface) => {
  try {

    const { _id, ...updateVale } = data;
 
    const result = await updateAddress(_id, updateVale);

    return {
      status: "success",
      message: "update address",
      address: result,
    };
  } catch (error) {
    throw new Error((error as Error).message);
  }
};
export const CreateNewAddress = async (datas: AddressInterface) => {
  try {
    datas.longitude=0
    datas.latitude=0
    const address = await saveAddress(datas);
    return {
      status: "success",
      message: "address created",
      address: address,
    };
  } catch (error) {
    throw new Error((error as Error).message);
  }
};
export const getserviceAddress = async (serviceId: string) => {
  try {
    const address = await findservicesaddress(serviceId);

    if (address) {
      return {
        status: "success",
        message: "address matching ",
        serviceAddress: address,
      };
    } else {
      return {
        status: "error",
        message: "not address matching",
        address: {},
      };
    }
  } catch (error) {
    throw new Error((error as Error).message);
  }
};

// ============== doctor CRUD===============
export const CreateDoctor = async (datas: DoctorInterface) => {
  try {
    const doctor = await saveDoctor(datas);
    return {
      status: "success",
      message: "New profile created",
      doctor: doctor,
    };
  } catch (error) {
    throw new Error((error as Error).message);
  }
};
export const GetallDoctor = async (datas: string) => {
  try {
    const doctor = await findAlldoctors(datas);
    return {
      status: "success",
      message: "doctors list",
      doctor: doctor,
    };
  } catch (error) {
    throw new Error((error as Error).message);
  }
};
export const UpdatecurrentDoctor = async (datas: DoctorInterface) => {
  try {
    const { _id, ...othervalue } = datas;

    const doctor = await findByIdUpdatedDoctor(_id, othervalue);
    return {
      status: "success",
      message: "Updated doctor",
      doctor: doctor,
    };
  } catch (error) {
    throw new Error((error as Error).message);
  }
};
export const UpdateDoctorLeave = async (datas: DoctorInterface) => {
  try {
    const { doctorId, ...othervalue } = datas;

    const doctor = await findByIdUpdatedleave(doctorId, othervalue);
    return {
      status: "success",
      message: "Updated doctor",
    };
  } catch (error) {
    throw new Error((error as Error).message);
  }
};

export const cancelDoctorLeave = async (data: DoctorInterface) => {
  try {
    const currentDate = new Date();
    const startDate = new Date(data.startDate);
    let endDate = new Date(data.endDate);

    if (currentDate > startDate) {

     const endDate = currentDate.toISOString().slice(0, 10);
      const timeDifference: number = currentDate.getTime() - startDate.getTime();
      const daysDifference: number = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));
      const form={
        startDate:data.startDate,
        endDate:endDate,
        days: daysDifference,
      }
      
      const newdoct = await LeaveHistory(form,data.doctorId);
    }
 
      const doctor = await deleteLeaveform(data.doctorId);
      return {
        status: "success",
        message: "Updated doctor",
      };

    

   
  } catch (error) {
    throw new Error((error as Error).message);
  }
};

export const Deletedoctor = async (doctorId: string) => {
  try {
    const doctor = await findByIdDeleteDoctor(doctorId);

    return {
      status: "success",
      message: "Deleted profile",
    };
  } catch (error) {
    throw new Error((error as Error).message);
  }
};

// ================================services======================================//
export const getNerestClinic = async () => {
  try {
    const clinic = await getAllClinic();
    return {
      status: "success",
      message: "all clinic data",
      searchdata: clinic,
    };
  } catch (error) {
    throw new Error((error as Error).message);
  }
};
// search by user for service
export const getsearchClinic = async (value: string,search:string) => {
  try {
    const values = {
      inputvalue: value,
      search
    };
    const clinic = await getAllClinicByAddress(values);
    return {
      status: "success",
      message: "all clinic data",
      searchdata: clinic,
    };
  } catch (error) {
    throw new Error((error as Error).message);
  }
};

// get a detailpage of clinic
export const getClinicdetail = async (id: string) => {

  try {
    const clinic = await findOneClinic(id);
    return {
      status: "success",
      message: "clinic data",
      detail: clinic,
    };
  } catch (error) {
    throw new Error((error as Error).message);
  }
};
// get time slots
type optionValueType = {
  date: string;
  clinicId: string;
  doctorId: string;
};
export const getDoctorTime = async (optionValue: optionValueType) => {
  try {
    const timeslots = await getClinicSlot(optionValue);
    if (timeslots.length > 0) {
      return {
        status: "success",
        message: "time data",
        timslots: timeslots,
      };
    } else {
      return {
        status: "success",
        message: "time data",
        timslots: [],
      };
    }
  } catch (error) {
    throw new Error((error as Error).message);
  }
};

// user booking slot
export type clinicDetail = {
  id: string;
  user_id: string;
  date: string;
  time: string;
  clinicId: string;
  doctorId: string;
  status: string;
  reason: string;
  slotId: string;
};

export const bookingClinic = async (
  data: clinicDetail,
  id: string | undefined
) => {
  try {
    const optionValue = {
      date: data.date,
      clinicId: data.clinicId,
      doctorId: data.doctorId,
    };

    const clinicSlot = await getClinicSlot(optionValue);

    if (clinicSlot.length > 0) {
      const updatevalue = {
        user_id: id,
        time: data.time,
        status: "booked",
        reason: "",
      };

      const slot = await updateClinicSlot(optionValue, updatevalue);

      return {
        status: "success",
        message: "clinic slot",
        slot: slot,
      };
    } else {
      const slotdata = {
        date: data.date,
        clinicId: data.clinicId,
        doctorId: data.doctorId,
        Bookings: [
          {
            user_id: id,
            time: data.time,
            status: "booked",
            reason: "",
          },
        ],
      };
      const slot = await saveClinicSlot(slotdata);

      return {
        status: "success",
        message: "clinic slot",
        slot: slot,
      };
    }
  } catch (error) {
    throw new Error((error as Error).message);
  }
};



// finc clinic clot
export const findClinicSlot = async (data: clinicDetail) => {
  try {
    const result = await getSlot(data);
    return {
      status: "success",
      message: "Slot cancelled",
      result:result
    };
  } catch (error) {
    throw new Error((error as Error).message);
  }
};
// cancel clinic slot

export const clinicSlotCancel = async (data: clinicDetail) => {
  try {
    const result = await deleteClinicSlot(data);
    return {
      status: "success",
      message: "Slot cancelled",
    };
  } catch (error) {
    throw new Error((error as Error).message);
  }
};
