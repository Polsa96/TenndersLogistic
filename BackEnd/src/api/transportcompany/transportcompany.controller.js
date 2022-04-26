const Transportcompany = require('./transportcompany.model')
const { setError } = require('../../utils/error/controller')

const postNewTransportcompany = async (req, res, next) => {
    try {
        const newTransportcompany = new Transportcompany(req.body)

        const companyNifExist = await Transportcompany.findOne({nif: newTransportcompany.nif})
        const companyNameExist = await Transportcompany.findOne({legalentityname: newTransportcompany.legalentityname})
        if(companyNifExist || companyNameExist) {
            return next(setError(404,'Company already exists'))
        }

        const transportcompanyDB = await newTransportcompany.save()
        return res.status(201).json(transportcompanyDB)

    } catch (error) {
        console.log('Error')
        return next(setError(500, 'Company not saved'))
    }
} 

const getAllTransportcompany = async (req, res, next) => {
    try {
        const transportcompanyDB = await Transportcompany.find()
        console.log(transportcompanyDB)
        res.status(200).json(transportcompanyDB)
    } catch (error) {
        return next(setError(500, 'Transportcompany failed server'))
    }
}

const getTransportcompany = async (req, res, next) => {
    try {
        const { id } = req.params
        //* Esto es si solamamente el mismo usuario puede ver su perfil
        // if(id != req.params.id) {
        //     return next(setError (403, 'Forbidden'))
        // }
        const transportcompanyDB = await Transportcompany.findById(id)
        if (!transportcompanyDB) {
            return next(setError(404, 'Transportcompany not found'))
        }
        return res.status(200).json({ id:transportcompanyDB._id, legalentityname: transportcompanyDB.legalentityname, nif: transportcompanyDB.nif ,
             telepohone: transportcompanyDB.telepohone, city: transportcompanyDB.city, truck: transportcompanyDB.truck
        })

    } catch (error) {
        return next(setError(404, 'User server fail'))
    }
}

module.exports = {
    postNewTransportcompany,
    getAllTransportcompany,
    getTransportcompany
    
}