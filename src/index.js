const express = require('express');
const path = require('path');
const morgan = require('morgan');
var handlebars = require('express-handlebars');
const route = require('./routes/index.route');
const cookieParser = require('cookie-parser');
// const bodyParser = require('body-parser');
const app = express();
const dotenv = require('dotenv');
dotenv.config();
const db = require('./config/db/index.db');
const { allowedNodeEnvironmentFlags } = require('process');

const {
    allowInsecurePrototypeAccess,
} = require('@handlebars/allow-prototype-access');
// HTTP Logger
app.use(morgan('combined'));

app.use(express.static(path.join(__dirname, 'public')));
app.use(
    express.urlencoded({
        extended: true,
    }),
);
app.use(express.json({ limit: '50mb' }));

// Template Engines
app.engine(
    'hbs',
    handlebars({
        // extname: change last name of handlebars is hbs
        extname: '.hbs',
    }),
);
app.set('view engine', 'hbs');

app.use(cookieParser());
// app.use(bodyParser.json()); //database

// app.use(
//     bodyParser.urlencoded({
//         extended: false,
//     }),
// );

app.set('views', path.join(__dirname, 'resources', 'views'));
// Route Init
route(app);

// Connect to DB
db.onConnection();

const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`App listening at http://localhost:${PORT}`);
});
