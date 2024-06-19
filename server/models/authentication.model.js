//models/authentication.model.js
const db = require('../config/db.config');


//LOGIN
 exports.findUserByEmail = (email) =>{
    return db.query('SELECT * FROM Usuarios WHERE email = ?', [email]);
 }

 //REGISTER
 exports.createUser = (userData)=>{
    return db.query('INSERT INTO Usuarios(email,password) VALUES (?,?)', [
        userData.email,
        userData.password
    ])
 }