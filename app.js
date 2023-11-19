import 'dotenv/config'; 
import express from 'express';
import exphbs from 'express-handlebars';
import Pokedex from 'pokedex-promise-v2';
import bodyParser from 'body-parser';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import routes from './routes/routes.js';

const app = express();
const PORT = process.env.PORT || 3000;
const P = new Pokedex(); 

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('public'));
app.use('/node_modules', express.static('node_modules'));
app.use('/', routes);

app.set('view engine', 'hbs');
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
app.set('views', join(__dirname, 'views'));

app.listen(PORT, () => {
    console.log(`Server listening. Port: ${PORT}`);
});

