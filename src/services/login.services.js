import UsersManager from "../persistencia/dao/managers/userManagerMongo.js";
import { hashData, compareData} from "../utils.js";

class LoginService {

    constructor() {
        this.login = new UsersManager();
    }

    createUser = async (userData) => {
        const { first_name, last_name, username, email, age, password } = userData;
        if (!first_name || !last_name || !username || !email || !age || !password) {
            throw new Error("Faltan datos");
        }
        const userDB = await this.login.findUser(username);
        if (userDB) {
            throw new Error("El usuario ya esta registrado");
        }
        const hashPassword = await hashData(password);
        const newUser = await this.login.createUser({ ...userData, password: hashPassword });
        return newUser;
    }

    loginUser = async (userData) => {
        const { username, password } = userData;
        if (!username || !password) {
            throw new Error("Faltan datos");
        }
        const userDB = await this.login.findUser(username);
        if (!userDB) {
            throw new Error('Registrate primero');
        }
        const passwordIncorrect = await compareData(password, userDB.password);
        if (!passwordIncorrect) {
            throw new Error('El usuario o la contraseña no son correctas');
        }
        return userDB;
    }

}

export default LoginService