const express = require('express'); 
const UserModel = require('../models/user'); 
const router = express.Router(); 
const bcrypt = require('bcryptjs') 
const jwt = require('jsonwebtoken') 
const authconfig = require('../config/auth.json') 


//Registrando usuario
router.post('/register', async (req, res) => {

    try{
        const {nome,email,password} = req.body 

        // Validações 
        if(!nome){
            return res.status(422).json({message:'O nome é obrigatorio'})
        };

        // Validando se o email já existe
        if(await UserModel.findOne({email})){
           return res.status(400).json({error: true, message:'E-mail já cadastrado'})   
        };

        if(!email){
            return res.status(422).json({message:'O email é obrigatorio'})
        };

        if(!password){
            return res.status(422).json({message:'A senha é orbigatoria'})
        };



        //Criptografando a senha
        const hash = bcrypt.hashSync(password,8)


        //Salvando usuario no banco de dados
        const User = await UserModel.create({
            nome: nome,
            email: email,
            password: hash
        });
        
        //Gerando Token no cadastro, para quando o usuario se cadastrar ele já poder acessar a aplicação
        const token = jwt.sign({
            id: User.id,
            email: User.email

        },authconfig.secret, { 
            expiresIn: 86400 
        });
    
        return res.json({User,token})
           

    }catch(err){
        res.status(500).json({error:true, message:error.message})
    }
});



//Fazer login
router.post('/login', async (req, res) => {

    const {email, password} = req.body 

    //Validaçoes
    if(!email){
        return res.status(400).json({message:'O email é obrigatorio'});
    }
    if(!password){
        return res.status(400).json({message:'A senha é obrigatoria'})
    }

    const User =  await UserModel.findOne({email}) 

    if(!User){ 
        return res.status(404).json({message:'Usuário não encontrado'})
    }
    if(!await bcrypt.compare(password, User.password)){ 
        return res.status(400).json({message:'Senha invalida'})
    }


    //Gerando token
    const token = jwt.sign({
        id: User._id,
        email: User.email

    },authconfig.secret, { 
        expiresIn: 86400 
    });
    // Retornando o token e o usuario
    return res.status(200).json({message:"Autenticação realizada com sucesso", User,token})

})



module.exports = router; 