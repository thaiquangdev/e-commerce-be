import nodemailer from "nodemailer";

const sendEmail = async (options) => {
  const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD,
    },
  });
  const mailOptions = {
    from: "Your Name <thaiquangqt2003@gmail.com>",
    to: options.email,
    subject: options.subject,
    text: options.text,
  };
  await transporter.sendMail(mailOptions);
};

export default sendEmail;
