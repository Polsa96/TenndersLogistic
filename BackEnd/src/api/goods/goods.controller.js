const Goods = require('./goods.model')
const { setError } = require('../../utils/error/controller')

const postNewGoods = async (req, res, next) => {
    try {
        console.log('1.',req.body);
        const newGoods = new Goods(req.body)

        const goodsDB = await newGoods.save()
        return res.status(201).json(goodsDB)

    } catch (error) {
        console.log('Error')
        return next(setError(500, 'Goods not saved'))
    }
} 

const getAllGoods = async (req, res, next) => {
    try {
        const goodsDB = await Goods.find()
        console.log(goodsDB)
        res.status(200).json(goodsDB)
    } catch (error) {
        return next(setError(500, 'Goods failed server'))
    }
}

const getOneGood = async (req, res, next) => {
    try {
        const { id } = req.params
        //* Esto es si solamamente el mismo usuario puede ver su perfil
        // if(id != req.params.id) {
        //     return next(setError (403, 'Forbidden'))
        // }
        const goodsDB = await Goods.findById(id)
        if (!goodsDB) {
            return next(setError(404, 'Goods not found'))
        }
        return res.status(200).json(goodsDB)

    } catch (error) {
        return next(setError(404, 'User server fail'))
    }
}

const pullGoods = async (req, res, next) => {
    try {
        const { id } = req.params
        const patchGoods = new Goods(req.body)
        patchGoods._id = id
        
        
        const goodsDB = await Goods.findByIdAndUpdate(id,{$set:{goodscompany:patchGoods.goodscompany, truck:patchGoods.truck}})
        if (!goodsDB) {
           return next(setError(404, 'Goods not found'))
        }
        return res.status(200).json({ new: patchGoods, old: goodsDB })
        
       
        
        
    } catch (error) {
        return next(setError(500, 'Goods Patch server error'))
    }
}

const deleteGoods= async (req, res, next) => {
    try {
        const { id } = req.params
        const goodsDB = await Goods.findByIdAndDelete(id)
        if (!goodsDB) {
            return next(setError(404, 'Goods not found'))
        }
        if (goodsDB.img) deleteFile(goodsDB.img)
        return res.status(200).json(goodsDB)
    } catch (error) {
        return next(setError(500, 'Goods removed server error'))
    }
}

module.exports = {
    postNewGoods,
    getAllGoods,
    getOneGood,
    pullGoods,
    deleteGoods
}