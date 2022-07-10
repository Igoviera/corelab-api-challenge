const mongoose = require('mongoose');


const Veiculo = mongoose.model('Veiculo', { 
    nome: {
        type:String,
        required: true,
    },
    marca: {
        type:String,
        required: true
    },
    cor: {
        type:String,
        required: true
    },
    ano: {
        type:Number,
        required: true
    },
    placa: {
        type: String,
        required: true
    },
    image: {
        type:String, 
    },
    valor: {
        type:Number,
        required: true
    },
    desc: {
        type: String
    }

});


module.exports = Veiculo;
