import nodemailer from 'nodemailer';
import User from "@/models/userModel";
import bcryptjs from 'bcryptjs';


export const sendEmail = async ({ email, emailType, userId }: any) => {
    try {
        // create a hased token
        console.log('inside send email')
        console.log(userId);
        const hashedToken = await bcryptjs.hash(userId.toString(), 10)

        if (emailType === "VERIFY") {
            console.log('Verifying...')
            await User.findByIdAndUpdate(userId,
                { verifyToken: hashedToken, verifyTokenExpiry: Date.now() + 3600000 })
        } else if (emailType === "RESET") {
            console.log('Inside Reset..')
            await User.findByIdAndUpdate(userId,
                { forgotPasswordToken: hashedToken, forgotPasswordTokenExpiry: Date.now() + 3600000 })
            //{ verifyToken: hashedToken, verifyTokenExpiry: Date.now() + 3600000 })
        }

        var transport = nodemailer.createTransport({
            service: "gmail",

            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
                //TODO: add these credentials to .env file
            }
        });


        // const mailOptions = {
        //     from: 'usmanahsan79@gmail.com',
        //     to: email,
        //     subject: emailType === "VERIFY" ? "Verify your email" : "Reset your password",
        //     html: `<p>Click <a href="${process.env.DOMAIN}/verifyemail?token=${hashedToken}">here</a> to ${emailType === "VERIFY" ? "verify your email" : "reset your password"}
        //     or copy and paste the link below in your browser. <br> ${process.env.DOMAIN}/verifyemail?token=${hashedToken}
        //     </p>`
        // }
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: emailType === "VERIFY" ? "Verify your email" : "Reset your password",
            html: `<p>Click <a href="${process.env.DOMAIN}/verifyemail?token=${hashedToken}&type=${emailType.toLowerCase()}">here</a> to ${emailType === "VERIFY" ? "verify your email" : "reset your password"} or copy and paste the link below in your browser. <br> ${process.env.DOMAIN}/verifyemail?token=${hashedToken}&type=${emailType.toLowerCase()}</p>`,
        };

        const mailresponse = await transport.sendMail
            (mailOptions);
        console.log('mailresponse', mailresponse)
        return mailresponse;

    } catch (error: any) {
        throw new Error(error.message);
    }
}