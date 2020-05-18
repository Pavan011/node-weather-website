const express = require('express');
const path = require('path')
const hbs = require('hbs')

//Define paths for expess config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewspath = path.join(__dirname, '../templates/views')
const partialpaths = path.join(__dirname, '../templates/partials')
const weather = require('./utils/weather')
const geocode = require('./utils/geocode')

//setup static directory to serve
const app = express()

const port = process.env.PORT || 3000
app.use(express.static(publicDirectoryPath))
hbs.registerPartials(partialpaths)

//setup handlebars and views location
app.set('view engine', 'hbs')
app.set('views', viewspath)

app.get('', (req,res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'pavan varma',
    })
})

app.get('/about', (req,res) => {
    res.render('about', {
        title: 'About Me',
        name: 'pavan varma',
    })
})

app.get('/help', (req,res) => {
    res.render('help', {
        msg: 'here to help you out',
        title: 'help Me',
        name: 'pavan varma',
    })
})
app.get('/weather', (req,res) => {
    if(!req.query.address) {
        return res.send({
            error: "you must provide address"
    })
}
var data = req.query.address;
geocode(data, (error, {lat,long,location}= {}) => {
    if(error)
    {
        return res.send({
            Error: error
        });
    }
    weather(lat,long, (error, forecastData)=> {
        if(error)
    {
        return res.send({
            Error: error
        });
    }
        res.send({ 
        CityName: location,
        WeatherInformation: forecastData});
    })
})
})

app.get('/products', (req,res) => {
    if(!req.query.search) {
       return res.send({
            error: "you must provide search"
        })
    }
    console.log(req.query);
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404page', {
        name: 'pavan varma',
        title: 'help article not found'
    })
})

app.get('*', (req, res) => {
    res.render('404page', {
        name: 'pavan varma',
        title: 'page not found'
    })
})


app.listen(port, () => {
    console.log('Server is up in port'+port)
})