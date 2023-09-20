import { Request, Response } from "express";
import {
  GetAllGraph,
  checkBlockAccount,
  clinicList,
  getAllUnverifiedDoc,
  getAllcomplaints,
  getCurrentUser,
  updateComplaintById,
  updateDoctorVerification,
  usersList,
} from "../../usecases/userUsecase";
import { errorHandler } from "../../middlewares/errorMiddleware";

export interface AuthenticatedRequest extends Request {
  user?: { _id: string; email: string; accountType: string };
}
  export const currentUser = async (
    req: AuthenticatedRequest,
    res: Response
  ) => {
    try {
      if (req.user?.accountType === "admin") {
      
        const result = await getCurrentUser();
     
        res.send(result);
      }
    } catch (error: any) {
      errorHandler(error, req, res);
    }
  };
export const allUserDetail = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  try {
    if (req.user?.accountType === "admin") {
      const result = await usersList();
      res.send(result);
    }
  } catch (error: any) {
    errorHandler(error, req, res);
  }
};
export const allClinicDetail = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  try {
    if (req.user?.accountType === "admin") {
      const result = await clinicList();
      res.send(result);
    }
  } catch (error: any) {
    errorHandler(error, req, res);
  }
};
export const accountBlocking = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  try {
    if (req.user?.accountType === "admin") {
      const result = await checkBlockAccount(req.body);
      res.send(result);
    }
  } catch (error: any) {
    errorHandler(error, req, res);
  }
};
export const verficationDoctor = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  try {
    const verified = "pending";
    const result = await getAllUnverifiedDoc(verified);
    res.send(result);
  } catch (error: any) {
    errorHandler(error, req, res);
  }
};
export const verifiedProfile = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  try {
    const result = await updateDoctorVerification(req.body);
    res.send(result);
  } catch (error: any) {
    errorHandler(error, req, res);
  }
};

export const graphData = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  try {
    const result = await GetAllGraph();
    res.send(result);
  } catch (error: any) {
    errorHandler(error, req, res);
  }
};

// get complaints

export const getComplaints = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  try {

    const result = await getAllcomplaints();

    res.send(result);
  } catch (error: any) {
    errorHandler(error, req, res);
  }
  
};


export const updateComplaints = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  try {

const complaintId=req.body.complaintId

    const result = await updateComplaintById(complaintId);

    res.send(result);
  } catch (error: any) {
    errorHandler(error, req, res);
  }
  
};