import jwt from "jsonwebtoken";
import { AuthenticatedRequest } from "../interfaces/controllers/userProfileController";

export const checkIsUserAuthenticated = async (
  req: AuthenticatedRequest,
  res: any,
  next: any
) => {
  const token = req.header("x-auth-token");

  if (!token || token == undefined) {
    return res.send({
      status: "token",
      message: "Access denied. Not authorized...",
    });
  }
  try {
    const decoded = jwt.verify(token, "securityToken") as {
      _id: string;
      accountType: string;
      email: string;
    };

    req.user = decoded;

    if (decoded.accountType === "admin") {
      res
        .status(401)
        .send({ status: "error", message: "Unauthorized response.." });
    }
    next();
  } catch (ex) {
    res.status(404).send("Invalid auth token...");
  }
};
module.exports = { checkIsUserAuthenticated };
