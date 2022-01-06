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

    printUsers(){
        for(const user of this.userDirectory)
            console.log(JSON.stringify(user));
    }

    writeUsersToJSONFile() {
        const obj = [];

        for(const user of this.userDirectory.values())
            obj.push(user);

        fs.writeFile ("user.json", JSON.stringify(obj), function(err) {
            if (err) throw err;
            console.log('complete');
        });
    }
}

const authService = new AuthService();
module.exports = { authService };
