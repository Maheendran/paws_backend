import { Router } from "express";
import { login } from "../controllers/authController";
import {
  allUserDetail,
  allClinicDetail,
  accountBlocking,
  verficationDoctor,
  verifiedProfile,
  currentUser,
  graphData,
  getComplaints,
  updateComplaints,
} from "../controllers/userController";
import { adminAuthentication } from "../../middlewares/authMiddleware";

const adminRoute = Router();

adminRoute.post("/login", login);
adminRoute.get("/current-User",adminAuthentication, currentUser);
adminRoute.get("/allPetOwners", adminAuthentication, allUserDetail);
adminRoute.get("/allClinic", adminAuthentication, allClinicDetail);
// account blocking
adminRoute.post("/account-Block", adminAuthentication, accountBlocking);
// verfication
adminRoute.get("/verfication-doctor", adminAuthentication, verficationDoctor);
// update verified or reject
adminRoute.post("/verified-profile", adminAuthentication, verifiedProfile);

adminRoute.get("/graph-data", adminAuthentication, graphData);
adminRoute.get("/complaints", adminAuthentication, getComplaints);
adminRoute.post("/update-complaint", adminAuthentication, updateComplaints);


export default adminRoute;
