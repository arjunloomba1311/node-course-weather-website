const path = require('path')
const express = require('express')
const hbs  = require('hbs')

const geocode = require('./utils/geocode.js')
const forecast = require('./utils/forecast.js')

const app = express()
const port = process.env.PORT || 3000


// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

//setup handlebars and views location
app.set('views', viewsPath)
app.set('view engine', 'hbs')
hbs.registerPartials(partialsPath)

//setup static directory
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        'title':'Weather App', 
        'name': 'Arjun',
    })
})

app.get('/about', (req,res) => {
    res.render('about', {
        'title':'Who am I?',
        'name': 'Arjun', 
    })
})

app.get('/help', (req,res) => {
    res.render('help', {
        'title': 'This is the title',
        'helpMessage': "Visit this page if you're in need of any help",
        'name':'Arjun'
    })
})


app.get('/weather', (req, res) => {

    if (!req.query.address) {
        return res.send({
            'error':'you must provide an address'
        })
    }

    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {

        if (error) {
            return res.send({error})
        } 
    
        forecast(latitude,longitude, (error, forecastData) => {
    
            if (error) {
                return res.send({error})
            }

            res.send({
                location, 
                forecast:forecastData,
                address:req.query.address
            })
    
          })
    })
            

})

app.get('/products', (req, res) => {


    if (!req.query.search) {
        return res.send({
            'error':'You must provide a search term'
        })
    }
    console.log(req.query.search)
    res.send({
        'products': []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404',  {
        'title': 'Help 404', 
        'errorMessage': 'Help Page not found',
        'name': 'Arjun'
    })
})

app.get('*', (req, res) => {
    res.render('404',{
        'title': '404 Error',
        'errorMessage': 'Page not found',
        'name': 'Arjun'
    })
})

app.listen(port, () => {
    console.log("server has been set up on port " + port)
})

