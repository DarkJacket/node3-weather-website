const path=require('path')
const express=require('express')
const hbs=require('hbs')

const geocode=require('./utils/geocode.js')
const forecast=require('./utils/forecast.js')
const app=express()



//setup path for express
const staticPath=path.join(__dirname,'../public')
const viewsPath=path.join(__dirname,'../templates/views')
const partialPath=path.join(__dirname,'../templates/partials')

//setup hbs and locationb of hbs
app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialPath)

//setup location of static files
app.use(express.static(staticPath))



app.get('',(req,res)=>{
res.render('index',{
    title: 'Weather app',
    name:'Abhijit Das'
})
})
app.get('/about',(req,res)=>{
    res.render('about',{
        title: 'About me',
        name:'Abhijit Das'
    })
    })
    app.get('/help',(req,res)=>{
        res.render('help',{
            title: 'Help Section',
            helptext:'This is some helpful text',
            name: 'Abhijit Das'
        })
        })

app.get('/weather',(req,res)=>{
    if(!req.query.address)
        return res.send({error: 'Need to send address!'})
    //res.send({address:req.query.address })
    geocode(req.query.address,(error,{latitude,longitude,location}={})=>{
        if(error)
        { 
            return res.send({error})
            //return console.log(error)
        }
        forecast(latitude,longitude,(error,Forecastdata)=>
    {
        if(error)
        { 
            return res.send({error})
            //return console.log(error)
        }
        res.send({forecast:Forecastdata,
                location,
            address:req.query.address})
        // console.log('location : '+location)
        // console.log(Forecastdata)
    
    })
    })
})
app.get('/help/*',(req,res)=>{
    res.render('error',{
        title: '404',
        name: 'Abhijit Das',
        errorMessage: 'Help article not found.'
    //name:'Abhijit Das'
})})

app.get('*',(req,res)=>{
    res.render('error',{
        title: '404',
        name: 'Abhijit Das',
    errorMessage: 'Page not found.'
    //name:'Abhijit Das'
})})

app.listen(3000,()=>{
    console.log('Server is up on port 3000')
})