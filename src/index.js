const express = require('express');
const path = require('path');
const morgan = require('morgan');
var handlebars = require('express-handlebars');
const route = require('./routes/index.route');
const app = express();
const port = 3000;
const db = require('./config/db/index.db');
// HTTP Logger
app.use(morgan('combined'));

app.use(express.static(path.join(__dirname, 'public')));
app.use(
    express.urlencoded({
        extended: true,
    }),
);
app.use(express.json());

// Template Engines
app.engine(
    'hbs',
    handlebars({
        // extname: change last name of handlebars is hbs
        extname: '.hbs',
    }),
);
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources', 'views'));

// Route Init
route(app);

// Connect to DB
db.connect();

app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
});
