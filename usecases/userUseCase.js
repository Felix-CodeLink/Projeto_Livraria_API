const userRepository = require('../repositories/userRepository');

class UserUseCase{
    async createUser(userData) {
        const userExists = await userRepository.doesUserExist(userData.email)
        if(userExists) {
            return {
                success: false,
                message: "Usuario já existe"
            }
        }
        const userCreated = await userRepository.createUser(userData);

        return {
            success: true,
            message: "Usuario criado com sucesso",
            data: {
                id: userCreated._id,
                name: userCreated.name,
                username: userCreated.username,
                email: userCreated.email,
                birthday: userCreated.birthday,
            }
        }
    }

    async loginUser(userData){
        const {email, password} = userData;

        const user = await userRepository.loginUser({email, password});

        if(!user){
            return {
                success: false,
                message: "Credenciais invalidas"
            }
        }

        return {
            success: true,
            message: "Login realizado com sucesso",
            data: {
                id: user._id,
                email: user.email,
            }
        }

    }

    async updateUser(userID, updateData){
        const updatedUser = await userRepository.updateUser(userID, updateData)
        
        if(!updatedUser){
            return {
                success: false,
                message: "Usuario não encontrado"
            }
        }

        return {
            success: true,
            message: "Usuário atualizado com sucesso",
            data: {
                id: updatedUser._id,
            }}
    }

    async deleteUser(userID){
        const deletedUser = await userRepository.deleteUser(userID);

        if(!deletedUser) {
            return {
                success: false,
                message: "Usuario não encontrado"
            }
        }
        return {
            success: true,
            message: "Usuário deletado com sucesso",
            data:  deletedUser
        };
       
    }



}
    
module.exports = new UserUseCase();


