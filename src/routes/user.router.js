import { Router } from 'express';
import userModel from '../Dao/DB/models/users.js';
import passport from 'passport';

const router = Router();

router.get("/login", (req, res) => {
    res.render("login");
});

router.get("/faillogin", (req, res) => {
    alert("Wrong email and/or password, try again.")
    res.redirect("/api/user/login");
});

router.get("/signup", (req, res) => {
    res.render("signup");
});

// Ruta para registrar un nuevo usuario
router.post('/signup', passport.authenticate('signup', { session: false }), async (req, res) => {
    try {
        res.redirect('/');
    } catch (error) {
        console.error('Error al registrar usuario:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
});
  
// Ruta para iniciar sesión
router.post('/login', passport.authenticate('login', { session: false }), async (req, res) => {
    try {
        res.redirect('/');
    } catch (error) {
        console.error('Error al iniciar sesión:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
});

router.post('/logout', async (req, res) => {
    req.logout();
    res.redirect('/')
});
  
export default router;