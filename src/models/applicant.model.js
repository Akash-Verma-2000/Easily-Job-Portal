//THIS CLASS WILL HANDLE ALL THE [companyObj] CLASS RELATED OPERATIONS 
export default class ApplicantRecord {

    //THIS FUNCTION CHECKS IF AN ARRAY OF GIVEN COMPANY IS PRESENT IN THE [applicantRecordObj] OBJECT OR NOT IF NOT THEN CREATES ONE
    createCompanyArray(companyName) {
        if (!applicantRecordObj[companyName]) {
            applicantRecordObj[companyName] = [];
        }
    }

    //THIS FUNCTION ADDS THE APPLICANT DETAULS OBJECT INTO THE CORRESPONDING ARRAY IN THE [applicantRecordObject]
    pushApplicantRecordObj(companyName, applicantObj) {
        applicantRecordObj[companyName].push(applicantObj);

    }

    //THIS FUNCTIONS RETURNS THE [applicantRecordObj]
    getApplicantRecordObj() {
        return applicantRecordObj;
    }

    //THIS FUNCTION ADDS THE [resumePath] PROPERTY TO THE [applicantObj]
    addResumePath(applicantObj, resume) {
        applicantObj['applicantResume'] = resume;
    }
}

const applicantRecordObj = {
    //THIS OBJECT WILL HAVE COMPANY NAMES AS KEY
    //EACH KEY WILL HAVE AN AARAY AS VALUES
    //EACH ARRAY WILL HAVE OBJECTS AS ELEMENTS
    //EACH OBJECT WILL HAVE APPLICANTS DETAILS 
}




