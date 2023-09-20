import nodemailer, {
    Transporter,
    SendMailOptions,
    SentMessageInfo,
  } from "nodemailer";
  
  export const notificationEmail = async (
    email: string | undefined,
    reason: string,date: string,time:  string | undefined
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
        subject: "Booking cancelled",
        html: `<p> Your Booking slot is cancelled due to ${reason} date - ${date} and time - ${time}</p>`,
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
  