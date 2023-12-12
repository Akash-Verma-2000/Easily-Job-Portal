//THIS FILE CONTAINS THE STRUCTURE OF THE JOB 

//EACH TIME WHEN A NEW JOB IS CREATED IT USES THE CONSTRUCTER OF THIS CLASS AND CREATES AN OBJECT OF THIS CLASS AND THEN THAT OBJECT WILL BE STORED IN A ARRAY [JobStructureArray] BELLOW

export default class JobStructure {
    constructor(id, jobCategory, jobDesignation, jobLocation, companyName, salaryRange, applyBy, skillsRequired, numberOfOpenings, recruiterEmail) {
        this.id = id;
        this.jobCategory = jobCategory;
        this.jobDesignation = jobDesignation;
        this.jobLocation = jobLocation;
        this.companyName = companyName;
        this.salaryRange = salaryRange;
        this.applyBy = applyBy;
        this.skillsRequired = skillsRequired;
        this.numberOfOpenings = numberOfOpenings;
        //**************** */
        this.recruiterEmail = recruiterEmail; //CHANGE
        //**************** */
    }


    //THIS FUNCTION ACCEPTS THE [req.body] OBJECT FROM [postCreateJob] FUNCTION FROM [form.conroller.js] file THEN CREATES AN OBJECT AND PUSH IT INTO THE [jobStructureArray] SO THAT THE LIST OF JOBS CAN BE UPDATED 
    pushJobStructureArray(formData,recruiterEmail) {
        const newJob = new JobStructure(
            jobStructureArray.length + 1,
            formData.jobCategory,
            formData.jobDesignation,
            formData.jobLocation,
            formData.companyName,
            formData.salaryRange,
            formData.applyBy,
            formData.skillsRequired,
            formData.numberOfOpenings,
            recruiterEmail,
        );

        jobStructureArray.push(newJob);
    }

    //THIS FUNCTION RETURN THE [jobStructureArray]
    getJobStructureArray() {
        return jobStructureArray;
    }

    //THIS FUNCTION IS RETURNING THE JOB OBJECT WITH SPECIFIC ID
    getJobById(Id) {
        return jobStructureArray.find(job => job.id === Number(Id));
    }

    //THIS FUNCTION UPDATES THE EXISTING JOB OBJECT IN THE ARRAY
    updateJob(jobObj, jobId,recruiterEmail) {
        const updatedJob = new JobStructure(
            Number(jobId),
            jobObj.jobCategory,
            jobObj.jobDesignation,
            jobObj.jobLocation,
            jobObj.companyName,
            jobObj.salaryRange,
            jobObj.applyBy,
            jobObj.skillsRequired,
            jobObj.numberOfOpenings,
            recruiterEmail
        );
        const index = jobStructureArray.findIndex((job) => job.id == jobObj.id);
        jobStructureArray[index] = updatedJob;
    }


    //THIS FUNCTION DELETS THE JOB OBJECT FROM THE [jobStructureArray]
    deleteJob(jobId) {
        const index = jobStructureArray.findIndex((job) => job.id == jobId);
        jobStructureArray.splice(index, 1);
    }

}

//THIS ARRAYS CONTAINS ALL THE OBJECTS OF THE JOBS CONSTRUCTED THROUGH [JobStructure] CLASS
let jobStructureArray = [
    new JobStructure(1, "Remote", "Backend Developer", "New Delhi", "Coding Ninjas", "16-18 LPA", "2023-11-23", "HTML, CSS, Javascript, Bootstrap", 19),

    new JobStructure(2, "Hybrid", "Frontend Developer", "New York, USA", "Google", "16-18 LPA", "2023-11-23", "HTML, CSS, Javascript, Bootstrap", 19),

    new JobStructure(3, "On-Site", "Full-Stack Developer", "Tokyo, Japan", "Microsoft", "16-18 LPA", "2023-11-23", "HTML, CSS, Javascript, Bootstrap", 19),


];




