const mongoose = require('mongoose');
const Schema = mongoose.Schema;





const transportcompanySchema = new Schema({
    legalentityname: {type:String, required: true, trim:true, unique:true},     //nombre de la entidad jurídica
    nif:{type:String, required: true, trim:true, unique:true},                  //NIF de la empresa
    telephone:{type:Number, required: true, trim:true},                         //numero de telefono
    city:{type:String, required: true, trim:true},                              //ciudad donde se encuentra la sede central
    truck:[{ type: mongoose.Types.ObjectId, ref: 'Truck', default:""}]          //camiones que tienen a su disposición
    },
    {
        timestamps: true 
    }
);



module.exports = mongoose.model('Transportcompany',transportcompanySchema);