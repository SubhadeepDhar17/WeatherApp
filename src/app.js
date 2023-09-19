// THIS JS FILE MANIPULATES THE BACK END
const path = require('path') //Core module, no need to install
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode.js')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

// Define paths for express confing
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs') //This tells express which folder to find the 'views' folder
app.set('views', viewsPath) // This tells express that views folder is in Templates folder
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('/about', (req, res) => {
    res.render('about' , {
        title: 'About Me',
        name: 'Subha'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        message: 'A helpful text',
        name: 'Subha'
    })
})

app.get('', (req,res) => {
    res.render('index', {
        title: 'Weather',
        message: 'Get real time weather updates',
        name: 'Subha'
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address) {
        return res.send({
            error: 'Please provide an address'
        })
    }
    
    geocode(req.query.address, (error, data) => {
        if (error) {
            return res.send({error}) //This error is coming from geocode.js
        }
        forecast(data.lat, data.long, (error, forecastData) => {
            if(error) {
                return res.send({error}) //This error is coming from forecast.js
            }
            res.send ({
                location: data.location,
                forecast: forecastData
            })
        })
    })
})

app.get('/products', (req, res) => {
    if (!req.query.search) { //This will give an error when there are no 'search term' in the url.
        return res.send({ //Eg- balconyvine.com/products?title=hoodie&rating=5 is proper URL format for this
            error: 'You must provide a search term'
        })
    }
    console.log(req.query.search) //This will run when above condition is not met
    res.send({ //But we dont have to use else here because we used return and program will end where it encounters return
        products: []
    })
})

// This is will show 404 for links like "app.com/help/whatever"
app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404 Error',
        message: 'This help article does not exists',
        name: 'Subha'
    })
})

//This needs to come at last so that express can compile from top to bottom
app.get('*', (req, res) => {  //* means any link thats not specified will be shown this
    res.render('404', {
        title: '404 Error',
        message: 'This page does not exists',
        name: 'Subha'
    })
})

app.listen(port, () => {
    console.log('Server running')
})