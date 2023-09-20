import otpGenerator from "otp-generator";

export function generateOTP(length = 4) {
  const otp = otpGenerator.generate(length, {
    digits: true,
    specialChars: false,
  });
  return otp;
}
