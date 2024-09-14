const User = require('../models/User');

class UserRepository {
    async doesUserExist(email){
        const userExist = await User.findOne({email});
        return !!userExist;
    }

    async createUser(data) {
        return await User.create(data);
    }

    async loginUser(data) {
        const { email, password} = data;
        const user = await User.findOne({ email, password});
        if(!user) {
            return undefined;
        }
        return user;
    }

    async updateUser(userID, updateData){
        const {username, email, password} = updateData
        return await User.findByIdAndUpdate(
            userID, 
            { $set: {username, email, password} }, 
            { new: true }
        )
    }

    async deleteUser(userID) {
        return await User.findByIdAndDelete(userID);
    }
}

module.exports = new UserRepository();