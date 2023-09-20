import {
  findAlldoctors,
  findallClinic,
  findallUsers,
  updateClinicById,
  updatePetOwnerById,
  findByIdUpdatedDoctor,
  findadmin,
  findAllGraphDetail,
  findAllCompalint,
  updateCompalint,
} from "../repositories/userRepo";


export const getCurrentUser = async () => {
  try {
    const admindetail = await findadmin();
    return {
      status: "success",
      message: "admin data",
      admin: admindetail,
    };
  } catch (error) {
    throw new Error((error as Error).message);
  }
};
export const usersList = async () => {
  try {
    const allusers = await findallUsers();
    return {
      status: "success",
      message: "login success",
      usersList: allusers,
    };
  } catch (error) {
    throw new Error((error as Error).message);
  }
};
export const clinicList = async () => {
  try {
    const allusers = await findallClinic();
    return {
      status: "success",
      message: "login success",
      usersList: allusers,
    };
  } catch (error) {
    throw new Error((error as Error).message);
  }
};

//
interface blockAccount {
  id: string;
  accountType: string;
  blocked: boolean;
}
export const checkBlockAccount = async (data: blockAccount) => {
  try {
    if (data.blocked) {
      var values = { $set: { blocked: false } };
    } else {
      var values = { $set: { blocked: true } };
    }
    const id = data.id;
    let updatedaccount;
    if (data.accountType === "PetOwner") {
      updatedaccount = await updatePetOwnerById(id, values);
    } else if (data.accountType === "Clinic") {
      updatedaccount = await updateClinicById(id, values);
    }
    return {
      status: "success",
      message: "account blocked",
      account: updatedaccount,
    };
  } catch (error) {
    throw new Error((error as Error).message);
  }
};
// Get all unverified doctors
export const getAllUnverifiedDoc = async (verified: string) => {
  try {
    const result = await findAlldoctors(verified);
    return {
      status: "success",
      message: "doctors list",
      doctor: result,
    };
  } catch (error) {
    throw new Error((error as Error).message);
  }
};
export const updateDoctorVerification = async (data: any) => {
  try {
    const { doctorId, ...updateValue } = data;
    const doctor = await findByIdUpdatedDoctor(doctorId, updateValue);
    return {
      status: "success",
      message: "doctors list",
      doctor: doctor,
    };
  } catch (error) {
    throw new Error((error as Error).message);
  }
};
export const GetAllGraph = async () => {
  try {

    const user = await findAllGraphDetail();
  
  console.log(user,'user')
    return {
      status: "success",
      message: "graph list",
      user: user,
    };
  } catch (error) {
    throw new Error((error as Error).message);
  }
};

export const getAllcomplaints = async () => {
  try {
    const result = await findAllCompalint();
    return {
      status: "success",
      message: "get all history",
      allcomplaint: result,
    };
  } catch (error) {
    throw new Error((error as Error).message);
  }
};

export const updateComplaintById = async (complaintId:string ) => {
  try {
    const result = await updateCompalint(complaintId);
  
    return {
      status: "success",
      message: "complaint cancelled",
      allcomplaint: result,
    };
  } catch (error) {
    throw new Error((error as Error).message);
  }
};
