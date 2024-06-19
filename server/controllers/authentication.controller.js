const UserModel = require('../models/authentication.model')
const bcrypt = require('bcrypt');


//LOGIN CONTROLLER
exports.loginUser = (req,res)=>{

    const {email, password} = req.body;

    UserModel.findUserByEmail(email)
    .then(result =>{
        if (result.length > 0){
            const user = result[0][0];
            //Empieza la logica para verificar contraseña:

            bcrypt.compare(password, user.password, (err, isMatch) =>{
                if(err){
                    res.status(500).send({message: "Error al verificar usuario", error:err.message});
                }else if (isMatch){
                    res.status(200).send({message: "Login exitoso", user:{id: user.id, email: user.email} })
                }else{
                    res.status(401).send({message: "Contraseña incorrecta"});
                }
            })

        } else{
            res.status(400).json({message: 'Usuario No Encontrado'})
        }
    }) .catch (error =>{
        res.status(500).json({message: 'Internal Server Error', error})
    });


}


//REGISTER CONTROLER

exports.createUser = async (req,res)=>{
    const { email, password } = req.body;

  //salt
  const salt = await bcrypt.genSalt(10);

  //hash
  const hashedPassword = await bcrypt.hash(password, salt);

  UserModel.createUser({email, password: hashedPassword})

  .then(result=>{
    res.status(201).send({id: result[0].insertId, message: "Usuario Creado Exitosamente"})
  })
  .catch(error =>{
    res.status(500).send({message: "Error al crear Usuario", error:error.message})
  })

}  