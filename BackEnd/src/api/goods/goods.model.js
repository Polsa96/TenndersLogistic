const mongoose = require('mongoose');
const Schema = mongoose.Schema;





const goodsSchema = new Schema({
    name: {type:String, required: true, trim:true},                                 //nombre de la carga
    type: {type:String, required: true, trim:true},                                 //tipo de material de la carga  
    from: {type:String, required: true, trim:true},                                 //punto de recogida del producto (ciudad)
    to: {type:String, required: true, trim:true},                                   //punto de dejada del producto (ciudad)
    whereabouts:{type:String, trim:true},                                           //donde se encuentra actualmente
    dates:[{type:Date, required: true, trim:true}],                                 //periodo del transporte en días
    truck:{ type: mongoose.Types.ObjectId, ref: 'Truck', default:null},               //camión que se ha utilizado
    goodscompany:{ type: mongoose.Types.ObjectId, ref: 'Goodscompany', default:null}  //empresa que alquila el transporte
    },
    {
        timestamps: true 
    }
);


const Goods = mongoose.model('Goods',goodsSchema);
module.exports = Goods;