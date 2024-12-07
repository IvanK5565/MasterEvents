const nodemailer = require('nodemailer');
const {login, pass} = require('./emailAuth')

const sendEmail = async (to, subject, text) => {
  let testEmailAccount = await nodemailer.createTestAccount();
    try {
      const transporter = nodemailer.createTransport({
        host: 'smtp.ethereal.email',
    port: 587,
    secure: false,
        auth: {
          user: testEmailAccount.user, // Ваш email
          pass: testEmailAccount.pass, // Ваш пароль (или приложение-ключ)
        },
      });
  
      const mailOptions = {
        from: login,
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
