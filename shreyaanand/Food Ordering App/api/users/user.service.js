const pool = require("../../config/database");

module.exports = {
    create :(data, callBack) => {
        pool.query(
            `insert into registration(name, username, email, password, address, contact)
                values(?,?,?,?,?,?)`,
                [
                    data.name,
                    data.username,
                    data.email,
                    data.password,
                    data.address,
                    data.contact
                ],
                (error, results, fields) =>{
                    if(error) {
                        callBack(error);
                    }
                    return callBack(null, results);
                }
        );
    },
    getUsers: callBack => {
        pool.query(
            `select id, name, username, email, address, contact from registration`,
            [],
            (error, results, fields) =>{
                if(error){
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
    getUserById: (id, callBack) => {
        pool.query(
            `select id, name, username, email, address, contact from registration where id = ?`,
            [id],
            (error, results, fields) =>{
                if(error){
                    return callBack(error);
                }
                return callBack(null, results[0]);
            }
        )
    },
    updateUser :(data, callBack) => {
        pool.query(
            `update registration set name = ?, username = ?, email = ?, password = ?, address = ?, contact = ? where id = ?`,
                [ 
                    data.name, 
                    data.username,
                    data.email,
                    data.password,
                    data.address,
                    data.contact,
                    data.id,
                ],
                (error, results, fields) =>{
                    if(error) {
                        callBack(error);
                    }
                    return callBack(null, results);
                }
        );
    },
    deleteUser :(data, callBack) => {
        pool.query(
            `delete from registration where id = ?`,
            [data.id],
            (error, results, fields) =>{
                if(error){
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
    getUserByUsername: (username, callBack) => {
        pool.query(
            `select * from registration where username = ?`,
            [username],
            (error, results, fields) =>{
                if(error){
                    return callBack(error);
                }
                return callBack(null, results[0]);
            }
        )
    }

};