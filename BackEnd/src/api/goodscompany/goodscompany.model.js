const mongoose = require('mongoose');
const Schema = mongoose.Schema;





const goodscompanySchema = new Schema({
    legalentityname: {type:String, required: true, trim:true, unique:true},  //nombre de la entidad jurídica
    nif:{type:String, required: true, trim:true, unique:true},               //NIF de la empresa
    telephone:{type:Number, required: true, trim:true},                      //numero de telefono
    city:{type:String, required: true, trim:true},                           //ciudad donde se encuentra la sede central
    goods:[{ type: mongoose.Types.ObjectId, ref: 'Goods', default:""}]       //material que tienen circulando o por circular
    },
    {
        timestamps: true 
    }
);



module.exports = mongoose.model('Goodscompany',goodscompanySchema);