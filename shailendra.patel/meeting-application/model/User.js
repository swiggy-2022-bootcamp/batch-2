class User{
    constructor(fullName=null, emailId=null, password=null){
        this.fullName = fullName;
        this.emailId = emailId;
        this.password = password;
    }

    get getFullName(){
        return this.fullName;
    }

    get getUserId(){
        return this.emailId;
    }

    get getPassword(){
        return this.password;
    }

    set setFullName(fullName){
        if(fullName === undefined || fullName === null)
            return;
        this.fullName = fullName;
    }

    set setEmailId(userId){
        if(userId === undefined || userId === null)
            return;
        this.emailId = userId;
    }

    set setPassword(password){
        if(password === undefined || password === null)
            return;
        this.password = password;
    }
}

module.exports = User;