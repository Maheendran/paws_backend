import {
  PushCompalint,
  findAllCompalint,
  findallBookingHistroy,
  findallClinicBooking,
  findallPaymentHistroy,
  saveNewPayment,
  updateAdminWallet,
  updateClinicAmount,
  updateClinicWallet,
  updateCompalint,
  updatePetownerWallet,
  updateUserAmount,
} from "../repositories/userRepo";
import cloudinary from "cloudinary";

export const savePayment = async (datas: any) => {
  try {
    const payment = await saveNewPayment(datas);

    return {
      status: "success",
      message: "payment updated",
      payment: payment,
    };
  } catch (error) {
    throw new Error((error as Error).message);
  }
};
// amount add to admin walet
export const adminWallet = async (commission: number) => {
  try {
    const payment = await updateAdminWallet(commission);
    
    return {
      status: "success",
      message: "amount credited in in admin",
      payment: payment,
    };
  } catch (error) {
    throw new Error((error as Error).message);
  }
};

// update wallet amount in credited account
export const addCreditAmount = async (creditedId: string, amount: number) => {
  try {
    const payment = await updateClinicAmount(creditedId, amount);
    return {
      status: "success",
      message: "amount credited in wallet",
      payment: payment,
    };
  } catch (error) {
    throw new Error((error as Error).message);
  }
};

export const subDebitedAmount = async (debited_id: string, amount: number) => {
  try {
    const payment = await updatePetownerWallet(debited_id, amount);
    return {
      status: "success",
      message: "amount credited in wallet",
      payment: payment,
    };
  } catch (error) {
    throw new Error((error as Error).message);
  }
};

// canceled amount need to credit and debit from wallet
export const cancelCreditAmount = async (
  creditedId: string,
  amount: number
) => {
  try {
    const payment = await updateUserAmount(creditedId, amount);
    return {
      status: "success",
      message: "amount credited in wallet",
      payment: payment,
    };
  } catch (error) {
    throw new Error((error as Error).message);
  }
};

export const cancelDebitedAmount = async (
  debited_id: string,
  amount: number
) => {
  try {
    const payment = await updateClinicWallet(debited_id, amount);
    return {
      status: "success",
      message: "amount credited in wallet",
      payment: payment,
    };
  } catch (error) {
    throw new Error((error as Error).message);
  }
};

// history

export const getPaymentHistory = async (userId: string | undefined) => {
  try {
    const payment = await findallPaymentHistroy(userId);
    return {
      status: "success",
      message: "amount credited in wallet",
      history: payment,
    };
  } catch (error) {
    throw new Error((error as Error).message);
  }
};

// booking history

export const getBookingHistory = async (userId: string | undefined) => {
  try {
    const history = await findallBookingHistroy(userId);
    return {
      status: "success",
      message: "get all history",
      history: history,
    };
  } catch (error) {
    throw new Error((error as Error).message);
  }
};

export const getClinicBookingHistory = async (userId: string | undefined) => {
  try {
    const history = await findallClinicBooking(userId);
 
    return {
      status: "success",
      message: "get all history",
      history: history,
    };
  } catch (error) {
    throw new Error((error as Error).message);
  }
};




// =========================COMPLAINTS=========================//

export const ComplaintDetail = async (data:any) => {
  try {
    if (data?.scrnshot!=="") {
      const uploadResponse = await cloudinary.v2.uploader.upload(data.scrnshot);
      data.scrnshot = uploadResponse.url;
    }
    const result = await PushCompalint(data);
    return {
      status: "success",
      message: "get all history",
      complaint: result,
    };
  } catch (error) {
    throw new Error((error as Error).message);
  }
};

export const getAllcomplaints = async (userId:string | undefined) => {
  try {
    const result = await findAllCompalint(userId);
    return {
      status: "success",
      message: "get all history",
      allcomplaint: result,
    };
  } catch (error) {
    throw new Error((error as Error).message);
  }
};

export const cancelComplaintById = async (complaintId:string ) => {
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