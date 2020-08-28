const express = require('express')
const path = require('path')
const morgan = require('morgan')
var handlebars = require('express-handlebars')
const app = express()
const port = 3000

// HTTP Logger
app.use(morgan('combined'))

// Template Engines
app.engine('hbs', handlebars({
    extname: '.hbs'
}))
app.set('view engine', 'hbs')
app.set('views', path.join(__dirname, 'resources', 'views'))




app.get('/', (req, res) => {
    res.render('home')
})

app.get('/game', (req, res) => {
    res.render('game')
})

app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`)
})