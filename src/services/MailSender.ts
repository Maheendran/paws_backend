import nodemailer, {
  Transporter,
  SendMailOptions,
  SentMessageInfo,
} from "nodemailer";

export const verifyEmail = async (
  email: string,
  otp: string
): Promise<string> => {
  try {
    const transporter: Transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "maheendrankp100@gmail.com",
        pass: "arqqrafzguvtivlv",
      },
    });

    const mailOptions: SendMailOptions = {
      from: "maheendrankp100@gmail.com",
      to: email,
      subject: "For reset Password",
      html: `<p> Your Paws registration one time password is ${otp} </p>`,
    };

    const info: SentMessageInfo = await transporter.sendMail(mailOptions);

    if (info.messageId) {
      return "success";
    } else {
      return "error";
    }
  } catch (error) {
    console.log(error);
    throw new Error("Error sending email");
  }
};
