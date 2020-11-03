const path = require('path')//core node module
const express = require('express')//npm module
const hbs = require('hbs')
const geocode = require('./utils/geocode')//internal module
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

// console.log(__filename)//file path
// console.log(__dirname)//file directory
// console.log(path.join(__dirname, '../' + 'public'))

const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

app.set('view engine', 'hbs')//template engine called (handlebars) to rendre dynamic web pages using express
app.set('views', viewsPath) //hbs engine looking for hbs view in views folder by default but we can change it
hbs.registerPartials(partialsPath)//setting hbs partial path

app.use(express.static(publicDirectoryPath))//loading static assets like static html/javascript/css/images to serve by express

app.get('', (req, res) => {
    res.render('index',{
        title: 'Weather App.',
        name: 'Mostafa Sayed'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title:'About',
        name:'Mostafa Sayed'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        textDisplay:'Welcome in Help page.',
        title:'Help',
        name:'Mostafa Sayed'
    })
})
//root route
// app.get('', (req, res) => {
//     // res.send('Hello express!')
//     res.send('<h1>Weather</h1>')
// })

// app.get('/help', (req, res) => {
//     // res.send('Help page!')
//     // res.send({
//     //     name:'Mostafa',
//     //     age: 27
//     // })
//     res.send([
//         {
//             name:'Mostafa',
//             age: 27
//         },
//         {
//             name:'Ahmed',
//             age: 25
//         },
//         {
//             name:'Islam',
//             age: 33
//         },
//     ])
// })

// app.get('/about', (req, res) => {
//     // res('About page!')
//     res.send('<h1>About Page!</h1>')
// })

app.get('/weather', (req, res) => {
    // res.send('Weather page!');
    if(!req.query.address){
        return res.send({
            error: 'Please provide an address!'
        })
    }

    geocode.geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
        if(error){
            return res.send({
                // error: error//use short hand instead as the value is the same name as property
                error
            })
        }

        forecast.forecast(latitude, longitude, (error, forecastData) => {
            if(error){
                return res.send({
                    // error: error//use short hand instead as the value is the same name as property
                    error
                })
            }
            res.send({
                forecast: forecastData,
                // location: location,//use short hand instead as the value is the same name as property
                location,
                address: req.query.address
            })
        })
    })

    // res.send({
    //     forecast: `It's 29 degree now`,
    //     location: 'Helwan, Egypt.',
    //     address: req.query.address
    // })
})

app.get('/help/*', (req, res) => {
    // res.send('My 404 page')
    res.render('404',{
        errorMessage:`Can't find your help documents.`,
        title: '404',
        name:'Mostafa Sayed'
    })
})

// if none of the above routes matched with the incoming request rout, using wild card character *
// this rout should be the last one
app.get('*', (req, res) => {
    // res.send('My 404 page')
    res.render('404',{
        errorMessage:'404 Page not found.',
        title: '404',
        name:'Mostafa Sayed'
    })
})

// app.listen(3000, () => {
//     console.log('Server is up and running on port 3000')
// })
app.listen(port, () => {
    console.log('Server is up and running on port ' + port)
})