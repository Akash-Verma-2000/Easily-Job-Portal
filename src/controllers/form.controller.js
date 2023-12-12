//IMPORTING THE [JobStructure] CLASS
import JobStructure from '../models/job.model.js';

//OBJECT OF [JobStructure] CLASS
let jobStructure = new JobStructure();

//IMPORTING THE [ApplicantRecord] CLASS
import ApplicantRecord from '../models/applicant.model.js';

//OBJECT OF [ApplicantRecord] CLASS
let applicantRecord = new ApplicantRecord();

//IMPORTING THE [UserModel] CLASS 
import UserModel from '../models/user.model.js';

//OBJECT OF [UserModel] CLASS
let userModel = new UserModel();

import NotificationMail from '../notifications/notificationMails.js'

//OBJECT OF [NotificationMail] CLASS
let notificationMail = new NotificationMail();

//THIS CLASS IS HANDLING FORMS 
export default class FormController {
    //THIS FUNCTION GETS THE DATA FROM THE CLIENT SIDE AND GIVE IT TO [pushJobStructureArray] FUNCTION IN [job.model.js] FILE 
    postCreateJob(req, res) {
        const recruiterEmail = req.session.userEmail;
        jobStructure.pushJobStructureArray(req.body,recruiterEmail);
        let jobStructureArray = jobStructure.getJobStructureArray();
        return res.render('job-list-page', { jobStructureArray, userEmail: req.session.userEmail });
    }

    //THIS FUNCTION GETS THE DATA FROM THE CLIENT SIDE AND GIVE IT TO [updateJob] FUNCTION IN [job.model.js] FILE 
    postUpdateJob(req, res) {
        const jobId = req.params.id;
        const recruiterEmail = req.session.userEmail;
        jobStructure.updateJob(req.body, jobId, recruiterEmail);
        const jobObj = jobStructure.getJobById(jobId);
        const numberOfApplicants = jobStructure.getJobStructureArray().length;
        return res.render('more-details-page', { jobObj, numberOfApplicants, userEmail: req.session.userEmail });
    }

    //THIS FUNCTIONS RENDERS THE [login-page.ejs] PAGE
    getLogIn(req, res) {
        return res.render('login-page.ejs', { userEmail: req.session.userEmail });
    }

    //THIS FUNCTIONS RENDERS THE [login-page.ejs] PAGE
    getRegister(req, res) {
        return res.render('register-page.ejs', { userEmail: req.session.userEmail });
    }

    //THIS FUNCTION COLLECTS ALL THE DATA FROM THE [register-page.ejs] FORM
    postRegister(req, res) {
        const { userName, userEmail, userPassword } = req.body;
        userModel.pushUserModelArray(userName, userEmail, userPassword);
        return res.render('login-page.ejs');
    }

    //THIS FUNCTION COLLECTS ALL THE DATA FROM THE [login-page.ejs] FORM
    postLogin(req, res) {
        const { userEmail, userPassword } = req.body;
        const validUser = userModel.isValidUser(userEmail, userPassword);
        if (!validUser) {
            return res.render('404.ejs');
        } else {
            req.session.userEmail = userEmail;
            return res.render('home-page.ejs', { userEmail: req.session.userEmail });
        }
    }

    //THIS FUNCTION RENDERS THE [create-job-page.ejs] PAGE
    getCreateJob(req, res) {
        return res.render('create-job-page.ejs', { userEmail: req.session.userEmail });
    }

    //THIS FUNCTION RENDERS THE [update-job-page.ejs] page
    getUpdateJob(req, res) {
        const jobId = req.params.id;
        const jobObj = jobStructure.getJobById(jobId);
        const loggedInRecruiter = req.session.userEmail;
        if (jobObj && jobObj.recruiterEmail === loggedInRecruiter) {
            res.render('update-job-page.ejs', { jobObj, userEmail: req.session.userEmail });
        } else {
            res.render('404.ejs');
        }

    }

    //THIS FUNCTION RENDERS THE [apply-form-page.ejs] PAGE
    getApplyJob(req, res) {
        const jobId = req.params.id;
        const jobObj = jobStructure.getJobById(jobId);
        return res.render('apply-form-page.ejs', { jobObj, userEmail: req.session.userEmail });
    }

    //THIS FUNCTION GETS THE DATA FROM THE [apply-form-page.ejs] and sends it to the respective pages
    postApplyJob(req, res) {
        const applicantObj = req.body;
        const resume = req.file.filename;
        const companyName = applicantObj.companyName;
        applicantRecord.createCompanyArray(companyName);
        applicantRecord.addResumePath(applicantObj, resume);
        applicantRecord.pushApplicantRecordObj(companyName, applicantObj);
        notificationMail.jobConfirmationMail(applicantObj);
        console.log(applicantObj.applicantEmail);
        return res.render('job-submitted-page', { applicantObj });
    }

    //THIS FUNCTION DESTROYS THE SESSION AND LOGSOUT THE RECRUITER
    getLogout(req, res) {
        //ON LOGOUT => DESTROY THE SESSION
        req.session.destroy((err) => {
            if (err) {
                console.log(err);
            } else {
                res.redirect('/login');
            }
        });
    }
}












