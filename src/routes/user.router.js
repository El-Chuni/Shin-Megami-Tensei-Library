import express from 'express';
import userModel from '../Dao/DB/models/users.js';
import passport from 'passport';

const router = express.Router();

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
        res.status(201).json(req.user);
    } catch (error) {
        console.error('Error al registrar usuario:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
});
  
// Ruta para iniciar sesión
router.post('/login', passport.authenticate('login', { session: false }), async (req, res) => {
    try {
        res.json({ message: '¡Inicio de sesión exitoso!', user: req.user });
    } catch (error) {
        console.error('Error al iniciar sesión:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
});
  
export default router;