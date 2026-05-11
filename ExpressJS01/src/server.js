require('dotenv').config();
const express = require('express');
const configViewEngine = require('./config/viewEngine');
// const webRoutes = require('./routes/web');
const apiRoutes = require('./routes/api');
const {connection} = require('./config/database');
const {getHomePage} = require('./controllers/homeController');
const cors = require('cors');



const app = express();
const port = Number(process.env.PORT) || 8080;

app.use(
  cors({
    origin: ['http://localhost:5173', 'http://127.0.0.1:5173'],
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

configViewEngine(app);

const webAPI = express.Router();
webAPI.get('/', getHomePage);
app.use('/', webAPI);
app.use('/api/v1', apiRoutes);

(async () => {
    try {
        await connection();
        console.log('Connected to the database');
            app.listen(port, () => {
            console.log(`Server is running on port ${port}`);
        });
    } catch (error) {
        console.log('Error connecting to the database:', error);
    }
})();

