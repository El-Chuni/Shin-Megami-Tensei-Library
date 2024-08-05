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
router.post('/login', passport.authenticate('login', { failureRedirect: '/api/user/login' }), (req, res) => {
    res.redirect('/');
});


router.post('/logout', (req, res) => {
    req.logout((err) => {
      if (err) {
        return res.status(500).json({ message: 'Error interno del servidor' });
      }
      res.redirect('/');
    });
  });
  
export default router;