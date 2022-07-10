const express = require('express');
const router = express.Router();
const upload = require('../multer/multer');
const path = require('path');
const veiculo = require('../models/veiculo');


//Listar todos os veiculos
router.get('/', async (req, res) => {
    try{
        const veiculos = await veiculo.find({}); 
        res.status(200).json({error:false, veiculos: veiculos}) 

    }catch(err) {res.json({error: true, message: err.message})}
});

router.get('/search/:key',async (req, res) => {
    const data = await veiculo.find(
        {
            "$or":[
                {nome:{$regex:req.params.key}},
                {marca:{$regex:req.params.key}},
            ]
        }
        
    )
    res.send(data)
})

// Buscar um veiculo pelo ID
router.get('/:id', async (req, res) => {
    try{
        const id = req.params.id 
        const veiculoo = await veiculo.findById(id) 
        res.json({error: false, veiculoo}) 

    }catch(err) {
        res.json({error: true, message: err.message})
    }
});


//Cadastrando um veiculo
router.post('/veiculo',upload.single('image'), async (req, res) => {
    try{
        const {nome,marca,cor,ano,placa,valor,desc,image} = req.body
        
        req.body.image = req.file.path
       
        // Validaçoes 
        if(!nome){ 
            return res.status(422).json({message:'O nome é obrigatorio'}) 
        }
        if(!marca){
            return res.status(422).json({message:'A marca é obrigatoria'})
        }
        if(!cor){
            return res.status(422).json({message:'A cor é obrigatoria'})
        }
        if(!ano){
            return res.status(422).json({message:'O ano é obrigatorio'})   
        }
        if(!placa){
            return res.status(422).json({message:'A placa é obrigatorio'})   
        }
        if(!valor){
            return res.status(422).json({message:'O valor é obrigatorio'})
        }
        

        // Salvando no banco
        const response = await veiculo.create(req.body); 
        res.status(200).json({error: false, veiculo: response, message:"veiculo cadastrado com sucesso"})

    }catch(err) {
        res.json({error: true, message: err.message, })
    }
   
});

//Atualizar um veiculo pelo ID
router.put('/:id', async (req, res) => {
    try{
        const id = req.params.id 
        const veiculoAtualizado = req.body //

        //
        const veiculoo = await veiculo.findByIdAndUpdate(id, veiculoAtualizado); 

        res.status(200).json({error: false, veiculoo})

    }catch(err){
        req.json({error:true, message: err.message})
    }
});


// Excluir um veiculo pelo ID
router.delete('/:id', async (req, res) => {
    try{
        const id = req.params.id //
        await veiculo.findByIdAndDelete(id) 
        res.status(200).json({error:false})

    }catch(err) {
        res.json({error:true, message: err.message})
    }
});

module.exports = router



