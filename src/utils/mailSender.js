const nodemailer = require('nodemailer');
const smtpTransport = require('nodemailer-smtp-transport');

const mailSender = async (email, title, body) => {
    try {
        // Create a Transporter to send emails
        let transporter = nodemailer.createTransport(smtpTransport({
            service: 'gmail',
            host: 'smtp.gmail.com',
            auth: {
                user: process.env.MAIL_USERNAME,
                pass: process.env.MAIL_PASSWORD,
            }
        }));
        // Send emails to users
        let info = await transporter.sendMail({
            from: 'vakil advice',
            to: email,
            subject: title,
            html: body
        });
        return info;
    } catch (error) {
        throw error;
    }
};
module.exports = mailSender;
