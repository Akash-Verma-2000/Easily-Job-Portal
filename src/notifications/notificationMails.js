import nodemailer from 'nodemailer';

export default class NotificationMail {

    async jobConfirmationMail(applicantObj) {

        // CREATE A EMAIL TRANSPORTER
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'sctakashsikarvar1999@gmail.com',
                pass: 'svlt vmpt kqaj gkcu',
            },
        });
        // CONFIGURE EMAIL CONTENT 
        const mailOptions = {
            from: 'sctakashsikarvar1999@gmail.com',
            to: applicantObj.applicantEmail,
            subject: `Easily Update | Application Success`,
            text: `Dear ${applicantObj.applicantName}
     This email is to inform you that your job application for ${applicantObj.companyName} has been received and will be forwrded to the company we will keep you posted about your candidature.
     Meanwhile, test your preparation level and problem solving skills under pressure by practicing as much as possible
     Please feel free to reach us for any further queries 
     Best Regards 
     ${applicantObj.companyName}`,
        };
        // SEND THE EMAIL
        try {
            const result = await transporter.sendMail(mailOptions);
            console.log("Email has been sent successfuly");
        } catch (err) {
            console.log(err);
            console.log("Email could not sent due to above issue");
        };
    }

}
