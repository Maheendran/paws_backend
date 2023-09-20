import { verifyEmail } from "../../../services/MailSender";
import { generateOTP } from "../../../services/OtpGenerator";
import { generateHash, matchPassword } from "../../../services/bycrpt";
import { ClinicInterface } from "../entites/ClinicModel";
import { UserInterface } from "../entites/userModel";
import {
  findClinicByEmail,
  findClinicById,
  findPetOwnerById,
  findUserByEmail,
  saveClinic,
  saveUser,
  updateUserById,
  updateClinicById,
  findOneInPetOwner,
  findOneInClinic,
  googlesaveUser,
  googlesaveClinic,
  forgotpassUser,
  forgotpassClinic,
  findByIdDeleteUser,
  findByIdDeleteClinic,
} from "../repositories/userRepo";
import jwt from "jsonwebtoken";

//========================create new account=================//

export const CreateUser = async (datas: UserInterface) => {
  try {
    const existingUser = await findUserByEmail(datas.email, datas.mobile);
    if (existingUser?.createdBy === "google") {
      return {
        status: "error",
        message: "Email already in use, please try another.",
      };
    }
    const otp = generateOTP();
    datas.otp = otp;
    const hashpass = await generateHash(datas.password);
    datas.password = hashpass;
    if (!existingUser) {
      return await saveUser(datas);
    }
    if (existingUser && existingUser.verified === false) {
      await findByIdDeleteUser(existingUser._id);
      return await saveUser(datas);
    } else {
      return {
        status: "error",
        message: "Email already in use, please try another.",
      };
    }
  } catch (error) {
    throw new Error((error as Error).message);
  }
};
export const ClinicUser = async (datas: ClinicInterface) => {
  try {
    const existingUser = await findClinicByEmail(datas.email, datas.mobile);
    if (existingUser?.createdBy === "google") {
      return {
        status: "error",
        message: "Email already in use, please try another.",
      };
    }
    const otp = generateOTP();
    datas.otp = otp;
    const hashpass = await generateHash(datas.password);
    datas.password = hashpass;

    if (!existingUser) {
      return await saveClinic(datas);
    }
    if (existingUser && existingUser.verified === false) {
      await findByIdDeleteClinic(existingUser._id);
      return await saveClinic(datas);
    } else {
      return {
        status: "error",
        message: "Email already in use, please try another.",
      };
    }
  } catch (error) {
    throw new Error((error as Error).message);
  }
};

// ========================login user=========================//

export interface loginInterface {
  email: string;
  password: string;
  accountType: string;
}
export const loginuser = async (datas: loginInterface) => {
  try {
    const checkmodel = { email: datas.email };
    const userExist = await findOneInPetOwner(checkmodel);
    if (userExist?.blocked) {
      return { status: "error", message: "Account temporarily blocked" };
    }

    if (userExist?.createdBy === "google") {
      return { status: "error", message: "Email not exist" };
    }
    if (userExist) {
      if (!userExist.verified) {
        return { status: "error", message: "Account not verified" };
      }

      const checkPassword = await matchPassword(
        datas.password,
        userExist.password
      );

      if (checkPassword) {
        const token = jwt.sign(
          {
            _id: userExist._id,
            name: userExist.username,
            email: userExist.email,
            accountType: datas.accountType,
          },
          "securityToken",
          {
            expiresIn: "2d",
          }
        );
        return {
          status: "success",
          message: "login success",
          data: userExist,
          token,
        };
      } else {
        return { status: "error", message: "password not exist" };
      }
    } else {
      return { status: "error", message: "email not exist" };
    }
  } catch (error) {
    throw new Error((error as Error).message);
  }
};
export const loginClinic = async (datas: loginInterface) => {
  try {
    const checkmodel = { email: datas.email };
    const userExist = await findOneInClinic(checkmodel);
    if (userExist?.blocked) {
      return { status: "error", message: "Account temporarily blocked" };
    }

    if (userExist?.createdBy === "google") {
      return { status: "error", message: "Email not exist" };
    }
    if (userExist) {
      if (!userExist.verified) {
        return { status: "error", message: "Account not verified" };
      }

      const checkPassword = await matchPassword(
        datas.password,
        userExist.password
      );

      if (checkPassword) {
        const token = jwt.sign(
          {
            _id: userExist._id,
            name: userExist.username,
            email: userExist.email,
            accountType: datas.accountType,
          },
          "securityToken",
          {
            expiresIn: "2d",
          }
        );
        return {
          status: "success",
          message: "login success",
          data: userExist,
          token,
        };
      } else {
        return { status: "error", message: "password not exist" };
      }
    } else {
      return { status: "error", message: "email not exist" };
    }
  } catch (error) {
    throw new Error((error as Error).message);
  }
};
//========================== otp verification=================//

export const PetOwnerOtp = async (data: UserInterface) => {
  try {
    const datas = await findPetOwnerById(data._id);

    if (datas?.otp === data.otp) {
      const values = { $set: { otp: "", verified: true } };

      const unverifiedAccount = await updateUserById(datas.id, values);

      if (unverifiedAccount) {
        return { status: "success", message: "correct otp" };
      }
    } else {
      return { status: "error", message: "incorrect otp" };
    }
  } catch (error) {
    throw new Error((error as Error).message);
  }
};
export const ClinicOwnerOtp = async (data: ClinicInterface) => {
  try {
    const datas = await findClinicById(data._id);
    if (datas?.otp === data.otp) {
      const values = { $set: { otp: "", verified: true } };

      const unverifiedAccount = await updateClinicById(datas.id, values);

      if (unverifiedAccount) {
        return { status: "success", message: "correct otp" };
      }
    } else {
      return { status: "error", message: "incorrect otp" };
    }
  } catch (error) {
    throw new Error((error as Error).message);
  }
};
//========================== resend otp=================//
export interface ReOtpInterface {
  id: string;
  accountType: string;
}
export const UserResendOtp = async (datas: ReOtpInterface) => {
  try {
    const newotp = generateOTP();
    const values = { $set: { otp: newotp } };
    await updateUserById(datas.id, values);
    return { status: "success", message: "Resend otp success" };
  } catch (error) {
    throw new Error((error as Error).message);
  }
};
export const ClinicResendOtp = async (datas: ReOtpInterface) => {
  try {
    const newotp = generateOTP();
    const values = { $set: { otp: newotp } };
    await updateClinicById(datas.id, values);
    return { status: "success", message: "Resend otp success" };
  } catch (error) {
    throw new Error((error as Error).message);
  }
};
//========================== resend otp=================//
export const googlePetOwner = async (datas: UserInterface) => {
  try {
    const existingUser = await findUserByEmail(datas?.email, datas?.mobile);
    if (existingUser?.blocked) {
      return { status: "error", message: "Account temporarily blocked" };
    }

    if (!existingUser) {
      const user: any = await googlesaveUser(datas);

      const token = jwt.sign(
        {
          _id: user.data._id,
          name: user.data.username,
          email: user.data.email,
          accountType: user.data.accountType,
        },
        "securityToken",
        {
          expiresIn: "2d",
        }
      );
      return {
        status: "success",
        message: "login success",
        token,
        userdata: user.accountType,
      };
    } else {
      const token = jwt.sign(
        {
          _id: existingUser._id,
          name: existingUser.username,
          email: existingUser.email,
          accountType: existingUser.accountType,
        },
        "securityToken",
        {
          expiresIn: "2d",
        }
      );
      return {
        status: "success",
        message: "login success",
        token,
        userdata: existingUser,
      };
    }
  } catch (error) {
    throw new Error((error as Error).message);
  }
};
export const googleClinic = async (datas: ClinicInterface) => {
  try {
    const existingUser: any = await findClinicByEmail(
      datas?.email,
      datas?.mobile
    );
    if (existingUser?.blocked) {
      return { status: "error", message: "Account temporarily blocked" };
    }

    if (!existingUser) {
      const user: any = await googlesaveClinic(datas);
      const token = jwt.sign(
        {
          _id: user.data._id,
          name: user.data.username,
          email: user.data.email,
          accountType: user.data.accountType,
        },
        "securityToken",
        {
          expiresIn: "2d",
        }
      );
      return {
        status: "success",
        message: "login success",
        token,
        userdata: user,
      };
    } else {
      const token = jwt.sign(
        {
          _id: existingUser._id,
          name: existingUser.username,
          email: existingUser.email,
          accountType: existingUser.accountType,
        },
        "securityToken",
        {
          expiresIn: "2d",
        }
      );
      return {
        status: "success",
        message: "login success",
        token,
        userdata: existingUser,
      };
    }
  } catch (error) {
    throw new Error((error as Error).message);
  }
};
//=========== forgot password otp
export interface forgotOtpInterface {
  id: string;
  accountType: string;
  email: string;
  password: string;
}
//============== forgot password otp resend===========================
export const forgotUserOtp = async (datas: forgotOtpInterface) => {
  try {
    const profileExist = await forgotpassUser(datas.email);

    if (profileExist) {
      const newotp = generateOTP();
      const values = { $set: { otp: newotp } };

      datas.id = profileExist?._id;
      const data = await updateUserById(datas.id, values);

      if (data) {
        const mailStatus = await verifyEmail(data.email, data.otp);
        return {
          status: "success",
          message: "Resend otp success",
          otpType: "forgotpassword",
          data: data,
        };
      }
    } else {
      return { status: "error", message: "Invalid email" };
    }
  } catch (error) {
    throw new Error((error as Error).message);
  }
};
export const forgotClinicOtp = async (datas: forgotOtpInterface) => {
  try {
    const profileExist = await forgotpassClinic(datas.email);

    if (profileExist) {
      const newotp = generateOTP();
      const values = { $set: { otp: newotp } };

      datas.id = profileExist?._id;
      const data = await updateClinicById(datas.id, values);

      if (data) {
        const mailStatus = await verifyEmail(data.email, data.otp);
        return {
          status: "success",
          message: "Resend otp success",
          otpType: "forgotpassword",
          data: data,
        };
      }
    } else {
      return { status: "error", message: "Invalid email" };
    }
  } catch (error) {
    throw new Error((error as Error).message);
  }
};

//==================== reset password otp resend===========================

export const resetPasswordUser = async (datas: forgotOtpInterface) => {
  try {
    const profileExist = await findPetOwnerById(datas.id);
    if (profileExist) {
      const hashpass = await generateHash(datas.password);
      const values = { $set: { password: hashpass } };

      datas.id = profileExist?._id;
      const data = await updateUserById(datas.id, values);

      if (data) {
        return { status: "success", message: "password updated", data: data };
      }
    } else {
      return { status: "error", message: "password not updated" };
    }
  } catch (error) {
    throw new Error((error as Error).message);
  }
};
export const resetPasswordClinic = async (datas: forgotOtpInterface) => {
  try {
    const profileExist = await findClinicById(datas.id);
    if (profileExist) {
      const hashpass = await generateHash(datas.password);
      const values = { $set: { password: hashpass } };

      datas.id = profileExist?._id;
      const data = await updateClinicById(datas.id, values);

      if (data) {
        return { status: "success", message: "password updated", data: data };
      }
    } else {
      return { status: "error", message: "password not updated" };
    }
  } catch (error) {
    throw new Error((error as Error).message);
  }
};
