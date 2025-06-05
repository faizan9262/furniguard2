import transpoter from "../config/nodemailer.js"

export const sendMail = async (to,subject,html)=>{
    const mailOptions = {
        from:process.env.SENDER_EMAIL,
        to,
        subject,
        html,
    }
    await transpoter.sendMail(mailOptions)
}