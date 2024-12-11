const nodemailer = require('nodemailer');
const { login, pass } = require('./emailAuth')

const sendEmail = async (to, subject, text) => {
  try {
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      auth: {
        user: login,
        pass: pass,
      },
    });

    const mailOptions = {
      from: `"Events" <${login}>`,
      to,
      subject,
      text,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Email відправлено:', info.response);
  } catch (error) {
    console.error('Помилка під час відправки email:', error.message);
  }
};

module.exports = sendEmail;
