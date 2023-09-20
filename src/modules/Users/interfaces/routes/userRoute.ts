import { Router } from "express";
import {
  userRegister,
  otpVerification,
  resendOtp,
  userLogin,
  googleSignIn,
  forgotPasswordOtp,
  resetPassword,
} from "../controllers/authController";
import { checkIsUserAuthenticated } from "../../middlewares/authMiddleware";
import {
  AccountVerify,
  currentUser,
  updateAddress,
  UpdatecurrentUser,
  createAddress,
  addDoctor,
  getDoctors,
  updateDoctor,
  deleteDoctors,
  nerestService,
  searchByUser,
  serviceDetail,
  clinicBooking,
  doctorTimeslot,
  getAddress,
  updateDoctorleave,
  cancelLeave,
} from "../controllers/userProfileController";
import {  addComplaints, bookingHistory, bookingPayment, cancelBooking, cancelComplaints, cancelPaymentBooking, getComplaints, paymentHistory } from "../controllers/paymentController";

const userRoute = Router();
userRoute.post("/register", userRegister);
userRoute.post("/verify-otp", otpVerification);
userRoute.post("/resend-otp", resendOtp);
userRoute.post("/login", userLogin);
userRoute.post("/google-signIn", googleSignIn);
userRoute.post("/forgot-password", forgotPasswordOtp);
userRoute.post("/reset-password", resetPassword);
userRoute.post("/account-verification",checkIsUserAuthenticated, AccountVerify);
// ===============user profile================//
userRoute.get("/current-User", checkIsUserAuthenticated, currentUser);
userRoute.patch("/UpdatecurrentUser",checkIsUserAuthenticated, UpdatecurrentUser);
// update profile================
userRoute.patch("/UpdateProfilepic",checkIsUserAuthenticated,UpdatecurrentUser);
userRoute.patch("/update-address", checkIsUserAuthenticated, updateAddress);
userRoute.post("/create-address", checkIsUserAuthenticated, createAddress);


// not working address=*************
userRoute.get( "/get-service-address/:serviceId", checkIsUserAuthenticated, getAddress);
//===================== clinic doctors add============================//
userRoute.post("/add-doctor", checkIsUserAuthenticated, addDoctor);
userRoute.get("/get-doctors", checkIsUserAuthenticated, getDoctors);
userRoute.patch("/update-doctor", checkIsUserAuthenticated, updateDoctor);
userRoute.patch("/update-leave", checkIsUserAuthenticated, updateDoctorleave);
userRoute.patch("/leave-cancel", checkIsUserAuthenticated, cancelLeave);
userRoute.post("/delete-doctor", checkIsUserAuthenticated, deleteDoctors);

// // ==============================services==============================//
userRoute.get("/nerest-services",nerestService);
userRoute.get("/searching", searchByUser);
userRoute.get("/service-detail/:id",serviceDetail);
//============ get doctor time slot==============
userRoute.post("/doctor-timeslot", doctorTimeslot);

// payment for booking========================

userRoute.post("/booking-payment", checkIsUserAuthenticated, bookingPayment);
userRoute.post("/cancel-payment", checkIsUserAuthenticated, cancelPaymentBooking);
// ===========booking clinic===========
userRoute.post("/booking-clinic", checkIsUserAuthenticated, clinicBooking);

// ==========cancel clinic booking======
userRoute.post("/cancel-booking", checkIsUserAuthenticated, cancelBooking);

// payment history=================

userRoute.get("/payment-history", checkIsUserAuthenticated, paymentHistory);

// booking history
userRoute.get("/booking-history", checkIsUserAuthenticated, bookingHistory);
// add complaints
userRoute.post("/add-complaint", checkIsUserAuthenticated, addComplaints);

userRoute.get("/get-complaints", checkIsUserAuthenticated, getComplaints);

userRoute.post("/cancel-complaint", checkIsUserAuthenticated, cancelComplaints);

export default userRoute;
