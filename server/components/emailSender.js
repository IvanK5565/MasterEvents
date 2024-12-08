const nodemailer = require('nodemailer');
const { login, pass } = require('./emailAuth')

const sendEmail = async (to, subject, text) => {
  try {
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      auth: {
        user: login, // Ваш email
        pass: pass, // Ваш пароль (или приложение-ключ)
      },
    });

    const mailOptions = {
      from: `"Events" <${login}>`,
      to,
      subject,
      text,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Email отправлен:', info.response);
  } catch (error) {
    console.error('Ошибка при отправке email:', error.message);
  }
};

module.exports = sendEmail;
