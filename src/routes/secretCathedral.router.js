import { Router } from "express";
import multer from "multer";
import { isAuthenticated } from "../config/auth/auth.js";
import { summonDemons, summonDemonById, createDemon, createManyDemons, modifyDemon, destroyDemon } from "../Dao/DB/demon.service.js";

//Se define el router
const router = Router();

//Aplicamos el multer para que luego se puedan subir arrays en /post y /put
const storage = multer.memoryStorage();
const upload = multer({ storage });

//Lo mismo que /get pero con socket.io
router.get('/demonCreation', async (req, res) => {  
    res.render('demonCreator');
});


//Carga y muestra un producto en particular
router.get('/get/:pid', async (req, res) => {
    const id = req.params.pid;
  
    try {
      const summonDemon = summonDemonById(id);
      res.render('demon', { demon: summonDemon });
    } catch (error) {
      console.error('Error al buscar el demonio:', error);
      res.status(500).send('Error interno del servidor');
    }
});

//Añade un producto al array
router.post('/post', isAuthenticated, upload.array(), createDemon);
  
//Se borra un producto especifico por ID
router.delete('/delete/:pid', isAuthenticated, destroyDemon);

//Se actualiza un producto por ID
router.put('/put/:pid', isAuthenticated, upload.array(), modifyDemon);


export default router;