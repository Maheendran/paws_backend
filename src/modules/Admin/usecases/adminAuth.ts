import adminModel, { AdminInterface } from "../entites/adminModel";
import { findAdminByEmail } from "../repositories/adminRepo";
import jwt from "jsonwebtoken";

export const checklogin = async (data: AdminInterface) => {
  try {
    const exisiting = await findAdminByEmail(data.email);
    if (exisiting) {
      if (exisiting.password === data.password) {
        const token = jwt.sign(
          {
            _id: exisiting._id,
            email: exisiting.email,
            accountType: "admin",
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
        };
      } else {
        return {
          status: "error",
          message: "Password not matching, please try another.",
        };
      }
    } else {
      return {
        status: "error",
        message: "Email not exist, please try another.",
      };
    }
  } catch (error) {
    throw new Error((error as Error).message);
  }
};
