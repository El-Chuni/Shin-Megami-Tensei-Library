import { Express } from "express";
import session from "express-session";
import Handlebars from "handlebars";
import cors from 'cors';
import MongoStore from "connect-mongo";
import config from "./config/config.js";
import searchRouter from "./routes/search.router.js";
import cathedralRouter from "./routes/secretCathedral.router.js";
import userRouter from "./routes/user.router.js";

const path = require('path');
const exphbs = require('express-handlebars');

const app = Express();
const SERVER_PORT = 8080;

const server = app.listen(SERVER_PORT, () => {
    console.log(`Welcome to the Cathedral of Shadows at ${SERVER_PORT}, where demons learn...`);
});

app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'views'));

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname+'/public'));

app.use('/api/search', searchRouter);
app.use('/api/cathedral', cathedralRouter);
app.use('/api/user', userRouter);

app.get('/', (req, res) => {
    res.render('index');
})

router.get('/forbidden', async (req,res) => {
  res.send("No estás autorizado para ejecutar cambios acá.");
  customError(401, "No estás autorizado para ejecutar cambios acá.");
})

app.use(session({
  store:MongoStore.create({
    mongoUrl: config.mongoUrl,
    mongoOptions:{useNewUrlParser: true, useUnifiedTopology: true},
    ttl:60
  }),
  secret: 'magatama',
  resave: true,
  saveUninitialized:true
}));

const connectMongoDB = async ()=>{
  try {
      await mongoose.connect(config.mongoUrl);
      console.log("Conectado con exito a MongoDB usando Moongose.");
  } catch (error) {
      console.error("No se pudo conectar a la BD usando Moongose: " + error);
      process.exit();
  }
};
connectMongoDB();