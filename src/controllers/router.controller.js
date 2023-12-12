//IMPORTING THE [JobStructure] CLASS
import JobStructure from '../models/job.model.js';

//OBJECT OF THE [JobStructure] CLASS
let jobStructure = new JobStructure();

//IMPORTING THE [ApplicantRecord] CLASS
import ApplicantRecord from '../models/applicant.model.js';

//OBJECT OF [ApplicantRecord] CLASS
let applicantRecord = new ApplicantRecord();

//THIS CLASS CONTAINS ALL THE ROUTER FUNCTIONS
export default class RouterController {
    //THIS FUNCTION RENDERS THE [layout.ejs] PAGE 
    getHomePage(req, res) {
        return res.render('home-page.ejs', { userEmail: req.session.userEmail });
    }

    
    //THIS FUNCTIONS RENDERS THE [job-list-page.ejs] PAGE
    getJobs(req, res) {
        let jobStructureArray = jobStructure.getJobStructureArray();
        //RENDERING [job-list-page] AND PASSING THE [jobStructureArray] to the [job-list-page.ejs] FILE
        return res.render('job-list-page', { jobStructureArray, userEmail: req.session.userEmail });
    }

    //THIS FUNCTION RENDERS THE [more-details-page.ejs] PAGE
    getMoreDetails(req, res) {
        const jobId = req.params.id;
        //GETTING THE OBJECT WHOSE ID WE HAVE GOT FROM CLIENT REQUEST
        const jobObj = jobStructure.getJobById(jobId);
        const numberOfApplicants = jobStructure.getJobStructureArray().length;
        //RENDRING [more-details-page.ejs] AND PASSING THE [job] OBJECT AND [numberOfApplicants] VARIABLE TO THE [more-details-page.ejs] FILE 
        return res.render('more-details-page.ejs', { jobObj, numberOfApplicants, userEmail: req.session.userEmail });
    }

    //THIS FUNCTION RENDERS THE [applicants-list-page.ejs] PAGE
    getApplicantsList(req, res) {
        const jobId = req.params.id;
        const jobObj = jobStructure.getJobById(jobId);
        const applicantArray = applicantRecord.getApplicantRecordObj()[jobObj.companyName];
        return res.render('applicants-list-page.ejs', { jobObj, applicantArray, userEmail: req.session.userEmail });
    }

    //THIS FUNCTION CALLS THE [deleteJob] FUNCTION TO DELETE THE JOB OBJECT
    getJobDelete(req, res) {
        const jobId = req.params.id;
        const jobObj = jobStructure.getJobById(jobId);
        const loggedInRecruiter = req.session.userEmail;

        if (jobObj && jobObj.recruiterEmail === loggedInRecruiter) {
            jobStructure.deleteJob(jobId);
            let jobStructureArray = jobStructure.getJobStructureArray();
            return res.render('job-list-page', { jobStructureArray });
        } else {
            res.render('404.ejs');
        }
    }

    //THIS FUNCTION RETURNS THE JSON OBJECT OF [jobStructureArray]
    getJobStructureArrayAPI(req, res) {
        const api = jobStructure.getJobStructureArray();
        return res.json({ data: api });
    }
}






