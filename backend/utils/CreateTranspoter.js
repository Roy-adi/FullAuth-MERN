import nodemailer from 'nodemailer';

const createTransporter = () => {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    secure: true,
    port: 465,
    auth: {
      user: "adityaroy2601@gmail.com",
      pass: "vxtymeqnhnezjmnl", // Make sure there are no spaces in the password string
    },
  });
  return transporter;
};

export default createTransporter;
