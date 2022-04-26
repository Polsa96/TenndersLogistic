const Goodscompany = require('./goodscompany.model')
const { setError } = require('../../utils/error/controller')

const postNewGoodscompany = async (req, res, next) => {
    try {
        const newGoodscompany = new Goodscompany(req.body)

        const companyNifExist = await Goodscompany.findOne({nif: newGoodscompany.nif})
        const companyNameExist = await Goodscompany.findOne({legalentityname: newGoodscompany.legalentityname})
        if(companyNifExist || companyNameExist) {
            return next(setError(404,'Company already exists'))
        }

        const goodscompanyDB = await newGoodscompany.save()
        return res.status(201).json(goodscompanyDB)

    } catch (error) {
        console.log('Error')
        return next(setError(500, 'Company not saved'))
    }
} 

const getAllGoodscompany = async (req, res, next) => {
    try {
        const goodscompanyDB = await Goodscompany.find()
        console.log(goodscompanyDB)
        res.status(200).json(goodscompanyDB)
    } catch (error) {
        return next(setError(500, 'Goodscompany failed server'))
    }
}

const getGoodscompany = async (req, res, next) => {
    try {
        const { id } = req.params
        //* Esto es si solamamente el mismo usuario puede ver su perfil
        // if(id != req.params.id) {
        //     return next(setError (403, 'Forbidden'))
        // }
        const goodscompanyDB = await Goodscompany.findById(id)
        if (!goodscompanyDB) {
            return next(setError(404, 'Goodscompany not found'))
        }
        return res.status(200).json(goodscompanyDB)

    } catch (error) {
        return next(setError(404, 'User server fail'))
    }
}

module.exports = {
    postNewGoodscompany,
    getAllGoodscompany,
    getGoodscompany
    
}