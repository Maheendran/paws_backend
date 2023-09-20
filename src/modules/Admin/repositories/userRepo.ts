import ClinicModel, { ClinicInterface } from "../../Users/entites/ClinicModel";
import ComplaintModel from "../../Users/entites/ComplaintModel";
import DoctorModel, { DoctorInterface } from "../../Users/entites/DoctorModel";
import userModel, { UserInterface } from "../../Users/entites/userModel";
import adminModel from "../entites/adminModel";


export const findadmin = async () => {
  return await adminModel.findOne();
};
export const findallUsers = async () => {
  return await userModel.find({ verified: true });
};
export const findallClinic = async () => {
  return await ClinicModel.find({ verified: true });
};

// ================block and unclock=============//
export const petOwnerAccount = async () => {
  return await ClinicModel.find({ verified: true });
};
type UpdateValues = {
  $set: {
    blocked?: boolean;
  };
};
export const updateClinicById = async (
  id: string,
  values: UpdateValues
): Promise<ClinicInterface | null> => {
  return await ClinicModel.findByIdAndUpdate(id, values, { new: true });
};
export const updatePetOwnerById = async (
  id: string,
  values: UpdateValues
): Promise<UserInterface | null> => {
  return await userModel.findByIdAndUpdate(id, values, { new: true });
};
export const findAlldoctors = async (verified: string) => {
  return await DoctorModel.find({ verified: verified });
};
export const findByIdUpdatedDoctor = async (
  Id: String,
  updatedValue: Partial<DoctorInterface>
) => {
  return await DoctorModel.findByIdAndUpdate(
    Id,
    { $set: { ...updatedValue } },
    { new: true }
  );
};
export const findAllGraphDetail = async (
) => {
// get users list
  const userResult = await userModel.aggregate([
    
    {
      $group: {
        _id: {
          $dateToString: {
            format: '%Y-%m-%d',
            date: '$createdAt',
          },
        },
       
        count: {
          $sum: 1,
        },
      },
    },
    {
      $project: {
        _id: 0,
        date: '$_id',
        count: 1,
      },
    },
    {
      $sort: {
        date: 1,
      },
    },
    {
      $limit: 5,
    },
  ]);

  // clinic
  const clinicResult = await ClinicModel.aggregate([
    
    {
      $group: {
        _id: {
          $dateToString: {
            format: '%Y-%m-%d',
            date: '$createdAt',
          },
        },
       
        count: {
          $sum: 1,
        },
      },
    },
    {
      $project: {
        _id: 0,
        date: '$_id',
        count: 1,
      },
    },
    {
      $sort: {
        date: 1,
      },
    },
    {
      $limit: 5,
    },
  ]);

return {userResult,clinicResult}

};


export const findAllCompalint = async () => {
  try {
  
  // const adddtaa= await ComplaintModel.find({status:'resolve'})
  const adddtaa= await ComplaintModel.aggregate([
{$match:{status:'resolve'}},
{
  $lookup: {
    from: "users",
    localField: "userId",
    foreignField: "_id",
    as: "user",
  },
},

  ])

    return adddtaa;
  } catch (error) {
    throw new Error((error as Error).message);
  }
};


export const updateCompalint = async (complaintId:string) => {
  try {
  
  const udatedata= await ComplaintModel.findByIdAndUpdate(complaintId,{$set:{status:"solve"}},{new:true})
    return udatedata;
  } catch (error) {
    throw new Error((error as Error).message);
  }
};