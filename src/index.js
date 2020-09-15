const express = require('express');
const path = require('path');
const morgan = require('morgan');
var handlebars = require('express-handlebars');
const route = require('./routes/index.route');
const cookieParser = require('cookie-parser');
const methodOverride = require('method-override');
const app = express();
const dotenv = require('dotenv');
dotenv.config();
const db = require('./config/db/index.db');
const { helpers } = require('handlebars');
// const { allowedNodeEnvironmentFlags } = require('process');

// const {
//     allowInsecurePrototypeAccess,
// } = require('@handlebars/allow-prototype-access');
// HTTP Logger
app.use(morgan('dev'));

app.use(express.static(path.join(__dirname, 'public')));
app.use(
    express.urlencoded({
        extended: true,
    }),
);
app.use(express.json({ limit: '50mb' }));
app.use(methodOverride('_method'));

// Template Engines
app.engine(
    'hbs',
    handlebars({
        // extname: change last name of handlebars is hbs
        extname: '.hbs',
        helpers: {
            sum: (a, b) => a + b, // r gọi ra ở đâu?
        },
    }),
);
app.set('view engine', 'hbs');

app.use(cookieParser());

app.set('views', path.join(__dirname, 'resources', 'views'));
// Route Init
route(app);

// Connect to DB
db.onConnection();

const PORT = process.env.PORT;
app.listen(PORT || 8080, () => {
    console.log(`App listening at http://localhost:${PORT}`);
});
