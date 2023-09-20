import jwt from "jsonwebtoken";
import { AuthenticatedRequest } from "../interfaces/controllers/userController";

export const adminAuthentication = async (
  req: AuthenticatedRequest,
  res: any,
  next: any
) => {
  const token = req.header("x-auth-token");

  if (!token)
    return res
      .status(401)
      .send({ status: "error", message: "Access denied. Not authorized..." });
  try {
    const decoded = jwt.verify(token, "securityToken") as {
      _id: string;
      accountType: string;
      email: string;
    };
    req.user = decoded;

    if (decoded?.accountType === "admin" ) {
      next();
    }
    
  } catch (ex) {
    res.status(404).send({ status: "error", message: "Invalid auth token..." });
  }
};
module.exports = { adminAuthentication };
