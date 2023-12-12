//THIS CLASS IS FOR RECRUITERS DATA 
export default class UserModel {
    constructor(id, userName, userEmail, userPassword) {
        this.id = id;
        this.userName = userName;
        this.userEmail = userEmail;
        this.userPassword = userPassword;
    }

    //THIS FUNCTION CREATES AN OBJECT AND PUT IT INSIDE THE [userModelArray] 
    pushUserModelArray(userName, userEmail, userPassword) {
        const newUser = new UserModel(
            userModelArray.length + 1,
            userName,
            userEmail,
            userPassword
        );
        userModelArray.push(newUser);
    }

    //THIS FUNCTION RETURNS THE [userModelArray]
    getUserModelArray() {
        return userModelArray;
    }

    //THIS FUNCTION CHECK IF THE RECRUITERS CREDENTIALS ARE VALID WHEN THE RECRUITERS LOGS IN TO THE PORTAL
    isValidUser(userEmail, userPassword) {
        return userModelArray.find(u => u.userEmail == userEmail && u.userPassword == userPassword);
    }
}
// THIS IS ARRAY CONTAINS THE INFORMATION OF THE RECRUITERS 
const userModelArray = [
    //THIS ARRAYS WILL HAVE THE OBJECTS FOR EACH RECRUITER AS THE ARRAY ELEMENT
    //EACH OBJECT WILLHAVE THE DETAILS OF THE RECRUITERS 
];


