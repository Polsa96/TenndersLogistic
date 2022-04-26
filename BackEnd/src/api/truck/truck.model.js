const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const truckSchema = new Schema({
    truckplate: {type:String, required: true, trim:true, unique:true},                      //matricula del camión
    country: {type:String, required: true, trim:true},                                      //pais de matricula del camión
    trailervolume: {type:Number, required: true, trim:true},                                //volumen del producto que puede llevar el camion
    trailerweight:{type:Number, required: true, trim:true},                                 //peso del producto que puede llevar el camion
    trailerload:{type:String, required: true, trim:true},                                   //tipo de carga que puede llevar el camion
    notavailable:[{
        dates:[{type:Date, required: true, trim:true}],                                      //días en los que el camión está fuera de servicio
        cause:{type:String, required: true, trim:true},                                      //causa de inaccesibilidad (verano, en taller...)    
    }],
    transportcompany:{ type: mongoose.Types.ObjectId, ref: 'Transportcompany', default:null}, //empresa de transporte a la que pertenece
    goodsinformation:[{
        goods:{ type: mongoose.Types.ObjectId, ref: 'Goods', default:null},                    //producto que estan transportando
        dates:[{type:Date, required: true, trim:true, default:null}],                          //periodo del transporte en días
        from: {type:String, required: true, trim:true, default:null},                          //punto de recogida del producto (ciudad)                            
        to: {type:String, required: true, trim:true, default:null},                            //punto de dejada del producto (ciudad)
    }]                        

    },
    {
        timestamps: true 
    }
);

module.exports = mongoose.model('Truck',truckSchema);