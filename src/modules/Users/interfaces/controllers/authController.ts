import { Request, Response } from "express";

import {
  ClinicUser,
  CreateUser,
  PetOwnerOtp,
  ClinicOwnerOtp,
  UserResendOtp,
  ClinicResendOtp,
  googlePetOwner,
  loginuser,
  loginClinic,
  googleClinic,
  forgotUserOtp,
  forgotClinicOtp,
  resetPasswordUser,
  resetPasswordClinic,
} from "../../usecases/userAuth";
import { errorHandler } from "../../middlewares/errorMiddleware";

export const userRegister = async (req: Request, res: Response) => {
  try {
    if (req.body.accountType === "PetOwner") {
      const user = await CreateUser(req.body);
      res.send(user);
    } else if (req.body.accountType === "Clinic") {
      const user = await ClinicUser(req.body);
      res.send(user);
    }
  } catch (error: any) {
    errorHandler(error, req, res);
  }
};

export const otpVerification = async (req: Request, res: Response) => {
  try {
    if (req.body.accountType === "PetOwner") {
      const user = await PetOwnerOtp(req.body);
      res.send(user);
    } else if (req.body.accountType === "Clinic") {
      const user = await ClinicOwnerOtp(req.body);
      res.send(user);
    }
  } catch (error: any) {
    console.error(error);
    errorHandler(error, req, res);
  }
};

export const resendOtp = async (req: Request, res: Response) => {
  try {
    if (req.body.accountType === "PetOwner") {
      const user = await UserResendOtp(req.body);
      res.send(user);
    } else if (req.body.accountType === "Clinic") {
      const user = await ClinicResendOtp(req.body);
      res.send(user);
    }
  } catch (error: any) {
    console.error(error);
    errorHandler(error, req, res);
  }
};

export const userLogin = async (req: Request, res: Response) => {
  try {
    if (req.body.accountType === "PetOwner") {
      const user = await loginuser(req.body);
      res.send(user);
    } else if (req.body.accountType === "Clinic") {
      const user = await loginClinic(req.body);
      res.send(user);
    }
  } catch (error: any) {
    console.error(error);
    errorHandler(error, req, res);
  }
};

// jwt check current user
export const googleSignIn = async (req: Request, res: Response) => {
  try {
    if (req.body.accountType === "PetOwner") {
      const user = await googlePetOwner(req.body);
      res.send(user);
    } else if (req.body.accountType === "Clinic") {
      const user = await googleClinic(req.body);
      res.send(user);
    }
  } catch (error) {
    errorHandler(error, req, res);
  }
};
// forgot password otp sending
export const forgotPasswordOtp = async (req: Request, res: Response) => {
  try {
    if (req.body.accountType === "PetOwner") {
      const user = await forgotUserOtp(req.body);
      res.send(user);
    } else if (req.body.accountType === "Clinic") {
      const user = await forgotClinicOtp(req.body);
      res.send(user);
    }
  } catch (error) {
    errorHandler(error, req, res);
  }
};
// pending===============
export const resetPassword = async (req: Request, res: Response) => {
  try {
    if (req.body.accountType === "PetOwner") {
      const user = await resetPasswordUser(req.body);
      res.send(user);
    } else if (req.body.accountType === "Clinic") {
      const user = await resetPasswordClinic(req.body);
      res.send(user);
    }
  } catch (error) {
    errorHandler(error, req, res);
  }
};
