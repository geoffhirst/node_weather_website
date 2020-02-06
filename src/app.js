const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

// Define paths for express config
const publicDirectoryPath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('views', viewsPath)
app.set('view engine','hbs')
hbs.registerPartials(partialsPath)

// Setup static directory 
app.use(express.static(publicDirectoryPath))

app.get('', (req,res) => {
    res.render('index',{
        title: 'Weather',
        name: 'Geoff Hirst'
    })
})

app.get('/about', (req,res) => {
    res.render('about',{
        title: 'About Me',
        name: 'Geoff Hirst'
    })
})

app.get('/help', (req,res) => {
    res.render('help',{message:'Help at Hogworts is always given to those who deserve it.',
    title: 'Help Page',
    name: 'Geoff Hirst'})
})

app.get('/weather', (req,res) => {
    var address = req.query.address

    if (!address)
    {
        return res.send({
            error: 'Please provide an address for a weather report.'
        })
    }

    geocode(address, (error, {latitude,longitude,location}={}) => {
        
        if (error) {
            return res.send({error})
        }

        forecast(latitude, longitude, (error, forecastdata) => {
            if (error)
            {
                return res.send({error})
            }

            res.send({
                forecast: forecastdata,
                location,
                address: address
            })
        })
    })
})

app.get('/products', (req,res)=> 
{
   if (!req.query.search)
    {
        return res.send({
            error: "You must provide a search term."
        })
    }
    
    res.send({
        products:[]
    })
})

app.get('/help/*', (req,res) => {
    res.render('notfound',{message: 'Help article not found.',
title:'Help Message',
name: 'Geoff Hirst'})
})

app.get('*', (req,res) => {
    res.render('notfound',{message: 'Page not found.',
        title:'404 Problem',
        name: 'Geoff Hirst'})

})

app.listen(3000, ()=> {
    console.log('Server is up on port 3000.')
})
