import {
  ComplaintDetail,
  addCreditAmount,
  adminWallet,
  cancelComplaintById,
  cancelCreditAmount,
  cancelDebitedAmount,
  getAllcomplaints,
  getBookingHistory,
  getClinicBookingHistory,
  getPaymentHistory,
  subDebitedAmount,
} from "./../../usecases/UserPayment";
import { Request, Response } from "express";
import { errorHandler } from "../../middlewares/errorMiddleware";
import { savePayment } from "../../usecases/UserPayment";
import { PetOwnerCurrentUser, clinicSlotCancel, findClinicSlot } from "../../usecases/UserProfile";
import { notificationEmail } from "../../../../services/NotificationMail";
import { findPetOwnerById } from "../../repositories/userRepo";

export interface AuthenticatedRequest extends Request {
  user?: { _id: string | undefined; email: string; accountType: string };
}

export const bookingPayment = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  try {
    // if (result.status === "success") {
    const actualAmount = req.body.amount;

    const commission = Math.floor((actualAmount * 10) / 100);
    const creditAmount = actualAmount - commission;

    const adminresult = await adminWallet(commission);

    if (adminresult.status === "success") {
      const creditedId = req.body.credited_id;
      const amount = creditAmount;
      const result = await addCreditAmount(creditedId, amount);
    }

    // }
    if (req.body.paymentType === "wallet") {
      const debited_id = req.body.debited_id;
      const amount = req.body.amount;
      const result = await subDebitedAmount(debited_id, amount);
    }
    if (req.body.paymentType === "wallet&online") {
      const debited_id = req.body.debited_id;
      const amount = req.body.enterAmount;
      const result = await subDebitedAmount(debited_id, amount);
    }
    const result = await savePayment(req.body);
    res.send(result);
  } catch (error: any) {
    errorHandler(error, req, res);
  }
};
// clinic cancel booking================
export const cancelBooking = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  try {
    const currentUserId=req.user

    if(currentUserId?._id===req.body.clinicId){

      const result = await findClinicSlot(req.body);

      const getUser=result?.result?.Bookings[0].user_id
      ||""
      
      const user = await findPetOwnerById(getUser);
      const emailUser=user?.email
      const reason=req.body.reason
      const date=req.body.date
      const time=result?.result?.Bookings[0].time


   const email=await notificationEmail(emailUser,reason,date,time)
   console.log(email,'eamil')
    }
    const result = await clinicSlotCancel(req.body);
    res.send(result);
  } catch (error: any) {
    errorHandler(error, req, res);
  }
};

export const cancelPaymentBooking = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  try {
    const result = await savePayment(req.body);

    const actualAmount = req.body.amount;

    const commission = -Math.floor((actualAmount * 10) / 100);
    const creditAmount = actualAmount - commission;

    const adminAmount = await adminWallet(commission);
    if (adminAmount.status === "success") {
      const creditedId = req.body.credited_id;
      const amount = creditAmount;
      const credted = await cancelCreditAmount(creditedId, amount);

      if (credted.status === "success") {
        const debited_id = req.body.debited_id;
        const amount = req.body.amount;
        const result = await cancelDebitedAmount(debited_id, amount);
      }
    }
    res.send(result);
  } catch (error: any) {
    errorHandler(error, req, res);
  }
};

// payment history

export const paymentHistory = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  try {
    const userId: string | undefined = req.user?._id;
    const history = await getPaymentHistory(userId);
    res.send(history);
  } catch (error: any) {
    errorHandler(error, req, res);
  }
};

// booking history==========
export const bookingHistory = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  try {
    const userId: string | undefined = req.user?._id;
if(req.user?.accountType==='Clinic'){
  const history = await getClinicBookingHistory(userId);
  res.send(history);
}else{
  const history = await getBookingHistory(userId);
  res.send(history);
}



  } catch (error: any) {
    errorHandler(error, req, res);
  }
  
};



// =========================COMPLAINTS=============================//
// ============ADD COMPLAINTS=====================
export const addComplaints = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  try {

const data=req.body

    const result = await ComplaintDetail(data);

    res.send(result);
  } catch (error: any) {
    errorHandler(error, req, res);
  }
  
};

export const getComplaints = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  try {
const userId: string | undefined=req.user?._id
    const result = await getAllcomplaints(userId);

    res.send(result);
  } catch (error: any) {
    errorHandler(error, req, res);
  }
  
};

export const cancelComplaints = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  try {

const complaintId=req.body.complaintId

    const result = await cancelComplaintById(complaintId);

    res.send(result);
  } catch (error: any) {
    errorHandler(error, req, res);
  }
  
};
