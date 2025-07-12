// utils/emailHelper.js

const nodemailer = require('nodemailer');

const sendEmail = async ({ to, subject, text }) => {
  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail', // or use "mailtrap.io" for dev
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const info = await transporter.sendMail({
      from: `"Swapsy" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      text,
    });

    console.log(`📤 Email sent: ${info.messageId}`);
  } catch (error) {
    console.error('❌ Email failed:', error.message);
  }
};

module.exports = sendEmail;
