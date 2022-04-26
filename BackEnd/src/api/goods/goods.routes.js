const GoodsRoutes = require('express').Router()

const { postNewGoods,getAllGoods,getOneGood,pullGoods,deleteGoods} = require('./goods.controller')

GoodsRoutes.get('/', getAllGoods)
// GoodsRoutes.get('/:id', getGoods)
// GoodsRoutes.get('/filter/:type', getGoodsFilter)
GoodsRoutes.post('/', postNewGoods)
GoodsRoutes.get('/:id', getOneGood)
GoodsRoutes.patch('/pull/:id', pullGoods)
GoodsRoutes.delete('/delete/:id', deleteGoods)

module.exports = GoodsRoutes