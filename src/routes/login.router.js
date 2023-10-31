import { Router } from 'express';
import LoginController from '../controllers/login.controller.js';
import passport from 'passport';

const router = Router()
const lc = new LoginController();


router.get('/'), async (req, res) => {
    res.redirect('/register');
}

router.post('/register', lc.createUser )

router.post('/login', lc.loginUser)

router.get('/logout', lc.LogoutUser)

router.get(
    "/githubSignup",
    passport.authenticate("github", { scope: ["user:email"] })
);


router.get(
    "/github",
    passport.authenticate('github', { failureRedirect: '/login' }),
    function(req, res) {
      // Successful authentication, redirect home.
      req.session['username'] = req.user.username
      res.redirect('/current');
    });



export default router