import { usersModel } from '../models/users.model.js';

export default class UsersManager {

    async createUser(user) {
        try {
            const newUser = await usersModel.create(user);
            return newUser
        } catch (error) {
            return error
        }

    }

    async findUser(username) {
        try {
            const user = await usersModel.findOne({username})
            return user
        } catch (error) {
            return error
        }
    }

    async findUserById(id){
        try {
            const user = await usersModel.findById(id)
            return user
        } catch (error) {
            return error
        }
    }

    async findUserEmail(email) {
        try {
            const user = await usersModel.findOne({email})
            return user
        } catch (error) {
            return error
        }
    }

}