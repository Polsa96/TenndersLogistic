const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');
const {validationPassword} = require('../../utils/validation/controller');
const {setError} = require('../../utils/error/controller');

const userSchema = new Schema({
    name: {type:String, required: true, trim:true},                                             //nombre usuario
    email: {type:String, required: true, trim:true, unique:true},                               //email del usuario
    password:{type:String, required:true, trim:true},                                           //contraseña usuario
    phone:{type:Number, trim:true},                                                             //telefono usuario

    //!Solo se elige una de las dos propiedades
    transportcompany:{ type: mongoose.Types.ObjectId, ref: 'Transportcompany', default:null},     //empresa de transporte a la que pertenece el usuario
    goodscompany:{ type: mongoose.Types.ObjectId, ref: 'Goodscompany', default:null}              //empresa de bienes físicos a la que pertenece el usuario
    },
    {
        timestamps: true 
    }
);

userSchema.pre("save", function (next) {
    if (!validationPassword(this.password)) {
        return next(setError(400, 'La contraseña no tiene los minimos requeridos'))
    }
    this.password = bcrypt.hashSync(this.password, 10);
    next();
});

module.exports = mongoose.model('User',userSchema);