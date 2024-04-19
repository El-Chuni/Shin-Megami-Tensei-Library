import { Router } from "express";
import multer from "multer";
import passport from "passport";
import { summonDemons, summonDemonById, createDemon, createManyDemons, modifyDemon, destroyDemon } from "../Dao/DB/demon.service.js";
import customError from "../controllers/error.controller.js";

//Se define el router
const router = Router();

//Aplicamos el multer para que luego se puedan subir arrays en /post y /put
const storage = multer.memoryStorage();
const upload = multer({ storage });

//Lo mismo que /get pero con socket.io
router.get('/', summonDemons);

//Un aviso si la autentificación falla en ciertas funciones
router.get('/forbidden', async (req,res) => {
    res.send("No estás autorizado para ejecutar cambios acá.");
    customError(401, "No estás autorizado para ejecutar cambios acá.");
})

//Carga y muestra un producto en particular
router.get('/get/:pid', summonDemonById)


//Añade un producto al array
router.post('/post', passport.authenticate('forbiddenForCommonUser', { failureRedirect: '/api/cathedral/forbidden' }), upload.array(), createDemon);
  
//Se borra un producto especifico por ID
router.delete('/delete/:pid', passport.authenticate('forbiddenForCommonUser', { failureRedirect: '/api/cathedral/forbidden' }), destroyDemon);

//Se actualiza un producto por ID
router.put('/put/:pid', passport.authenticate('forbiddenForCommonUser', { failureRedirect: '/api/cathedral/forbidden' }), upload.array(), modifyDemon);


export default router;