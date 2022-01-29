const fs = require("fs")

const user = {
    name: "Pradyuman Agrawal",
    address: "Po Box City",
}

const jsonString = JSON.stringify(user,null,2)
fs.writeFile('./data.json', jsonString, err => {
    if (err) {
        console.log('Error writing file', err)
    } else {
        console.log('Successfully wrote file')
    }
})