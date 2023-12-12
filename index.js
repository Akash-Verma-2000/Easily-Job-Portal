//THIS IS THE ENTRY POINT OF THE APPLICATION
//IMPORTING THE [express] MODULE
import express from 'express';
//IMPORTING THE [LayoutController] CLASS WHICH IS CONTROLLING THE LAYOUT OF THE APP
import RouterController from './src/controllers/router.controller.js';
//IMPORTING THE [path] MODULE
import path from 'path';
//IMPORTING THE [epress-ejs-layouts] MODULE
import ejsLayouts from 'express-ejs-layouts';
//IMPORTING THE [FormController] CLASS WHICH IS CONTROLLING THE FORMS OF THE APP
import FormController from './src/controllers/form.controller.js';
//THIS MIDDLEWARE IS FOR RESUME UPLOADS
import { uploadFile } from './src/middlewares/file-upload.middleware.js';
//IMPORTING THE SESSION MIDDLEWARE 
import session from 'express-session';
import { auth } from './src/middlewares/auth.middleware.js';

//****************OBJECTS START**********************

//CREATING AN OBJECT OF [RouterController] CLASS TO GET IT'S FUNTIONS 
const routerController = new RouterController();

//CREATING AN OBJECT OF [FormController] CLASS TO GET IT'S FUNTIONS 
const formController = new FormController();

//****************OBJECTS END************************

//CREATING AN EXPRESS SERVER
const server = express();

//****************MIDDLEWARES START****************************

//CONFIGURING THE SEESION MIDDLEWARE
server.use(session({
    secret: 'SecretKey',
    resave: false,
    saveUninitialized: true,
    cookie: {
        secure: false
    },
}));

//VIEW ENGINE SETUP 
server.set('view engine', 'ejs');

//CONFIGURING THE PATH OF [ejs] TEMPLATES 
server.set('views', path.join(path.resolve(), 'src', 'views'));

//MIDDLEWARE FOR [express-ejs-layouts]
server.use(ejsLayouts);

//THIS MIDDLEWARE IS USED TO GET THE DATA FROM THE FORM IN JSON FORMATE
server.use(express.urlencoded({ extended: true }));

//GIVING THE ACCESS OF [views] FOLDER TO THE SERVER SO THAT IT CAN ACCESS THE REQUIRED FILE LIKE CSS AND OTHERS AND CONNECT THEN WITH RENDERED PAGE 
server.use(express.static('src/views'));

//GIVING THE ACCESS OF [public] FOLDER TO THE SERVER SO THAT IT CAN ACCESS THE REQUIRED FILE LIKE RESUMES AND OTHERS FILES 
server.use(express.static("public"));

//****************MIDDLEWARES ENDS****************************

//****************GET ROUTERS START****************************

//CALLING THE [getLayout] FUNCTION TO RENDER [layout.ejs] ON THE [DEFAULT] ROUT
server.get('/', routerController.getHomePage);

//CALLING THE [getJobs] FUNCTION TO RENDER [job-list-page.ejs] ON THE [/jobs] ROUT
server.get('/jobs', routerController.getJobs);

//CALLING THE [getLogIn] FUNCTION TO RENDER [login-page.ejs] ON THE [/login] ROUT
server.get('/login', formController.getLogIn);

//CALLING THE [getRegister] FUNCTION TO RENDER [register-page.ejs] ON THE [/register] ROUT
server.get('/register', formController.getRegister);

//CALLING THE [getCreateJob] FUNCTION TO RENDER [create-job-page.ejs] ON THE [/create-job] ROUT
server.get('/create-job', auth, formController.getCreateJob);

//CALLING THE [getMoreDetails] FUNCTION TO RENDER [more-details-page.ejs] ON THE [/more-details/:id] ROUT
server.get('/more-details/:id', routerController.getMoreDetails);

//CALLING THE [getUpdateJob] FUNCTION TO RENDER [update-job-page.ejs] ON THE [/update-job] ROUT
server.get('/update-job/:id', auth, formController.getUpdateJob);

//CALLING THE [getApplyJob] FUNCTION TO RENDER [apply-form-page.ejs] ON THE [/apply-job] ROUT
server.get('/apply-job/:id', formController.getApplyJob);

//CALLING THE [getApplicantsList] FUNCTION TO RENDER [apply-form-page.ejs] ON THE [/apply-job] ROUT
server.get('/applicants-list/:id', auth, routerController.getApplicantsList);

//CALLING THE [getLogout] funtion 
server.get('/logout', formController.getLogout);

server.get('/api/jobStructureArray', routerController.getJobStructureArrayAPI);

//**************** GET ROUTERS END****************************

//**************** POST ROUTERS END****************************

//CALLING THE [postUpdateJob] FUNCTION TO GET THE UPDATED FORM DATA
server.post('/update-job/:id', auth, formController.postUpdateJob);

//CALLING THE [getDeleteJob] FUNCTION TO DELETE THE JOB OBJECT
server.post('/delete-job/:id', auth, routerController.getJobDelete);

//CALLING THE [postCreateJob] FUNCTION TO GET THE FORM DATA 
server.post('/create-job', auth, formController.postCreateJob);

//CALLING THE [postApplyJob] FUNCTION TO POST THE FORM DATA
server.post('/apply-job/:id', uploadFile.single('applicantResume'), formController.postApplyJob);

//THIS FUNCTION CALLS THE [postRegister] FUNCTION AND SENDS THE FORM DATA TO THAT
server.post('/register', formController.postRegister)

//THIS FUNCTION CALLS THE [postLogin] FUNCTION AND SENDS THE FORM DATA TO THAT
server.post('/login', formController.postLogin);

//LISTENING TO THE SERVER AT PORT NUMBER 3600
server.listen(3600, () => {
    console.log('The server is listening the port number 3600');
});
