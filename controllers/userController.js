const UserUseCase = require('../usecases/userUseCase')

class UserController {
    async signup(req, res) {
        const response = await UserUseCase.createUser(req.body)
        if(!response.success){
            return res.status(400).json(response)
        }
        return res.status(201).json(response)
    }

    async login(req, res){
        const { email, password } = req.body
        const response = await UserUseCase.loginUser({ email, password})
        if(!response.success){
            return res.status(400).json(response)
        }
        return res.status(201).json(response)
    }

    async update(req, res){
        const {username, email, password } = req.body
        const {userId} = req.params
        const response = await UserUseCase.updateUser(userId, { username, email, password})
        if(!response.success){
            return res.status(400).json(response)
        }
        return res.status(200).json(response)
    }

    async delete(req, res){
        const {userId} = req.params
        const response = await UserUseCase.deleteUser(userId)
        if(!response.success){
            return res.status(400).json(response)
        }
        return res.status(204).send()
    }

    
}

module.exports = new UserController();
