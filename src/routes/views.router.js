import UserDTO from '../persistencia/dto/user.dto.js';
import { Router } from 'express';
import ProductManager from "../persistencia/dao/managers/productManagerMongo.js"
import UsersManager from "../persistencia/dao/managers/userManagerMongo.js"
import { privateAcces, publicAcces, adminAccess, userAccess } from '../middlewares/middlewares.js'

const pm = new ProductManager()

const um = new UsersManager()

const router = Router()


router.get("/", async (req, res) => {
    res.render('login', {
        style: 'styles.css'
    })

})

router.get("/products", async (req, res) => {
    const listadeproductos = await pm.getProductsView()
    res.render("products", { listadeproductos, style: 'styles.css' })
})

router.get("/realtimeproducts", adminAccess, (req, res) => {
    res.render("realtimeproducts", { style: 'styles.css' })
})

router.get("/chat", privateAcces,userAccess, (req, res) => {
    res.render("chat", { style: 'chat.css' })
})

router.get("/register", publicAcces, (req, res) => {
    res.render("register", { style: 'styles.css' })
})

router.get("/login", publicAcces, (req, res) => {
    res.render("login", { style: 'styles.css' })
})

router.get('/current', privateAcces, async (req, res) => {
    const user = await um.findUser(req.session.username);
    const userDTO = new UserDTO(user);
    res.render('current', { user: userDTO, style: 'styles.css' });
});



export default router