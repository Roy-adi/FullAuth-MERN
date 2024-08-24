import createTransporter from "./CreateTranspoter.js";
import { PASSWORD_RESET_REQUEST_TEMPLATE, VERIFICATION_EMAIL_TEMPLATE } from "./emailTemplates.js";



export const sendVerificationMail = (user,verificationToken) => {
 const transporter = createTransporter();

 const mailOptions = {
   from: 'test app <adityaroy2601@gmail.com>',
   to: user.email,
   subject: 'Verify your email',
   html: VERIFICATION_EMAIL_TEMPLATE(verificationToken)
  };

  transporter.sendMail(mailOptions, (error, info) => {
   if (error) {
    console.log("Error sending mail:", error);
  } else {
    console.log("Email sent:", info.response);
  }
});
};


export const sendPasswordResetEmail  = (user,resetURL) => {
  const transporter = createTransporter();
 
  const mailOptions = {
    from: 'test app <adityaroy2601@gmail.com>',
    to: user.email,
    subject: 'Verify your email',
    html: PASSWORD_RESET_REQUEST_TEMPLATE(resetURL)
   };
 
   transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
     console.log("Error sending mail:", error);
   } else {
     console.log("Email sent:", info.response);
   }
 });
 };





