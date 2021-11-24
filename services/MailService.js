const nodemailer = require('nodemailer');

class MailService {

    constructor() {
        this.transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: process.env.SMTP_PORT,
            secure: false,
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASSWORD
            }
        })
    }

    async sendActivationMail(to, link) {
        await this.transporter.sendMail({
            from: process.env.SMTP_USER,
            to,
            subject: 'Активация аккаунта на ' + process.env.CLIENT_URL,
            text: '',
            html:
                `
                    <div>
                        <h1>Код для активации</h1>
                        <a>${link}</a>
                    </div>
                `
        })
    }

    async sendPasswordResetMail(to, link) {
        await this.transporter.sendMail({
            from: process.env.SMTP_USER,
            to,
            subject: 'Password Reset on ' + process.env.CLIENT_URL,
            text: '',
            html:
                `
                    <div >
                        <h1>Password Reset link</h1>
                        <a href='${link}'>${link}</a>
                    </div>
                `
        })
    }
}

module.exports = new MailService();