import { Express } from "express";
import session from "express-session";
import Handlebars from "handlebars";
import cors from 'cors';

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

app.get('/', (req, res) => {
    res.render('index');
})

mongoose.connect('mongodb+srv://tratohecho02:oLA6zSP563yIhnnc@wiki-megami-tensei.vqrxszc.mongodb.net/', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('Conexión a MongoDB establecida'))
.catch(err => console.error('Error al conectar a MongoDB:', err));