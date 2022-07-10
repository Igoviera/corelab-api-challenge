const express = require('express'); 
const mongoose = require('mongoose'); 
const routerVeiculo = require('./src/controllers/veiculoController');  
const routerAuth = require('./src/controllers/authController'); 
const cors = require('cors'); 
const path = require('path');
const authToken = require('./src/middleware/authJwt') 

const app = express(); 

app.use(express.urlencoded({extended: false}));


// Conectando no Bando de dados local
mongoose.connect('mongodb://localhost:27017/apiVeiculos');


app.use('/uploads',express.static(path.join(__dirname,'./uploads')))


app.use(cors());
app.use(express.json());


//Rotas
app.use('/auth', routerAuth);
app.use('/', routerVeiculo); 


app.listen(4000, () => {
    console.log('Api rodando..')
});