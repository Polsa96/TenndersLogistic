const User = require('./user.model')
const { setError } = require('../../utils/error/controller')
const bcrypt = require('bcrypt')
const { generateSign, verifyJwt } = require('../../utils/jsonwebtoken/controller')

const postNewUser = async (req, res, next) => {
    try {
        const newUser = new User(req.body)

        const userExist = await User.findOne({email: newUser.email})
        if(userExist) {
            return next(setError(404,'This e-mail already exists'))
        }

        const userDB = await newUser.save()

        if(userDB.transportcompany!==null){
            return res.status(201).json({ name: userDB.name, email:userDB.email, phone: userDB.phone, company: userDB.transportcompany })
        }else{
            return res.status(201).json({ name: userDB.name, email:userDB.email, phone: userDB.phone, company: userDB.goodscompany })
        }
        
        

    } catch (error) {
        console.log('Error')
        return next(setError(500, 'User not saved'))
    }
} 

const getAllUser = async (req, res, next) => {
    try {
        const userDB = await User.find()
        console.log(userDB)
        res.status(200).json(userDB)
    } catch (error) {
        return next(setError(500, 'User failed server'))
    }
}

const getUser = async (req, res, next) => {
    try {
        const { id } = req.params
        // Esto es si solamamente el mismo usuario puede ver su perfil
        // if(id != req.params.id) {
        //     return next(setError (403, 'Forbidden'))
        // }
        const userDB = await User.findById(id)
        if (!userDB) {
            return next(setError(404, 'User not found'))
        }
        return res.status(200).json({ id:userDB._id, name: userDB.name, email: userDB.email ,
             phone: userDB.phone, transportcompany: userDB.transportcompany, gooodscompany: userDB.gooodscompany
        })

    } catch (error) {
        return next(setError(404, 'User server fail'))
    }
}

const loginUser = async (req, res, next) => {
    try {
        
        const userDB = await User.findOne({ email: req.body.email })
        if (!userDB) {
            return next(setError(404, 'User not found'))
        }
        if (bcrypt.compareSync(req.body.password, userDB.password)) {
            const token = generateSign(userDB._id, userDB.email)
            const email = userDB.email
            const user = userDB.name
            const phone = userDB.phone
            const goodscompany = userDB.goodscompany
            const transportcompany = userDB.transportcompany
            const id=userDB._id
            
            return res.status(200).json({token, user, email, goodscompany, transportcompany, phone, id})
        }
    } catch (error) {
        error.message = 'error Login'
        return next(error)
    }
}

const logoutUser = (req, res, next) => {
    try {
        const token = null;
        return res.status(200).json(token)
    } catch (error) {
        return next(error)
    }
}

const pullUser = async (req, res, next) => {
    try {
        const { id } = req.params
        const patchUser = new User(req.body)
        patchUser._id = id
        
        if(patchUser.transportcompany===null){
            const userDB = await User.findByIdAndUpdate(id,{$set:{goodscompany:patchUser.goodscompany}})
            if (!userDB) {
                return next(setError(404, 'User not found'))
            }
            return res.status(200).json({ new: patchUser, old: userDB })
            
        }
        if(patchUser.goodscompany===null){
            const userDB = await User.findByIdAndUpdate(id,{$set:{transportcompany:patchUser.transportcompany}})
            if (!userDB) {
                return next(setError(404, 'User not found'))
            }
            return res.status(200).json({ new: patchUser, old: userDB })
        }  
        
        
        
    } catch (error) {
        return next(setError(500, 'User Patch server error'))
    }
}

module.exports = {
    postNewUser,
    getAllUser,
    getUser,
    loginUser,
    logoutUser,
    pullUser
}