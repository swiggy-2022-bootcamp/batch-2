const fs = require('fs');
const User = require('../model/User');

class AuthService {
    constructor(){
        this.userDirectory = new Map();
    }

    addUser(user = new User()){
        if(this.userDirectory.has(user.getUserId)){
            console.log(`User already registered with email ${user.getUserId}`);
            return false;
        }

        this.userDirectory.set(user.getUserId, user);
        console.log(`User added successfully, emailId : ${user.getUserId}`);
        return true;
    }

    isValidUser(emailId, password)
    {
        if(this.userDirectory.has(emailId) == false)
            return false;
        const actualPassword = this.userDirectory.get(emailId).getPassword;
        if(actualPassword === password)
            return true;
        return false;
    }

    printUsers(){
        for(const user of this.userDirectory)
            console.log(JSON.stringify(user));
    }

    writeUsersToJSONFile() {
        const obj = [];

        for(const user of this.userDirectory.values())
            obj.push(user);

        fs.writeFile ("./data/user.json", JSON.stringify(obj), function(err) {
            if (err) throw err;
            console.log('complete');
        });
    }

    onstartUP(){
        var fs = require('fs');

        const data = JSON.parse(fs.readFileSync("./data/user.json"));
        // console.log(typeof(data));
        for(let i=0; i<data.length; i++){
            let user = Object.assign(new User(), data[i]);
            this.addUser(user);
        }
        // console.log(data)
    }
}

const authService = new AuthService();
authService.onstartUP();
module.exports = { authService };
