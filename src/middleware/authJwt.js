const jwt = require('jsonwebtoken');
const authconfig = require('../config/auth.json');

module.exports = (req, res, next) => {
    const authToken = req.headers['authorization']; //Esperando receber o token do headers

    //Validaçoes 
    if(authToken != undefined){ //Verificando se o token foi fornecido 

        const parts =  authToken.split(' ');// A função split divide a string em partes
        const token = parts[1]; // Aqui estou pegando a segunda parte do array parts*/

        jwt.verify(token, authconfig.secret,(err, data) => { // Verificando se o token e valido utilizando a função verify
            if(err){ // Verificando se o token e valido
                return res.status(401).json({message:"A autenticação com o token falhou."})
            }

            req.userLogged = data; //

            console.log(data)
            return next(); // Se for valido chama o next()
        }); 

    }else{
        res.status(401).json({error:true, message:"Token inválido"})
    }
   
}