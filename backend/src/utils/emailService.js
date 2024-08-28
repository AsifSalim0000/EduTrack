import nodemailer from 'nodemailer';

// Create a transporter object using SMTP transport
const transporter = nodemailer.createTransport({
    service: 'Gmail', // You can use other services like 'Yahoo', 'Outlook', etc.
    auth: {
        user: process.env.EMAIL_USER, // Your email address
        pass: process.env.EMAIL_PASS  // Your email password or app password
    }
});

/**
 * Send OTP email to the user.
 * @param {string} to - Recipient email address.
 * @param {string} otp - OTP code to be sent.
 */
const sendOtpEmail = async (to, otp) => {
    const mailOptions = {
        from: process.env.EMAIL_USER,  
        to, 
        subject: 'Your OTP Code',  
        text: `Your OTP code is ${otp}. It is valid for 10 minutes.`  
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log(`OTP sent to ${to}`);
    } catch (error) {
        console.error('Error sending OTP email:', error);
        throw new Error('Error sending OTP email');
    }
};

export default sendOtpEmail;
