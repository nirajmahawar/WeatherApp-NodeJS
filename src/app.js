const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();
const port = process.env.PORT || 3000;

//Define Paths for Express Config
const publicPathDir = path.join(__dirname,'..','/public');
const viewsPath = path.join(__dirname,'..','/templates/views');
const partialsPath = path.join(__dirname,'..','/templates/partials');


//Setup Locations
app.set('view engine','hbs');
app.set('views',viewsPath);
hbs.registerPartials(partialsPath);

//Setup Static Dir to serve
app.use(express.static(publicPathDir));

app.get('/',(req,res) =>{
    res.render("index",{
        title : "Weather App",
        name : "Niraj Mahawar"
    });
});

app.get('/about',(req,res) =>{
    res.render("about",{
        title : "About Weather App",
        name : "Niraj Mahawar"
    });
});

app.get('/help',(req,res) =>{
    res.send("WE ARE HERE TO HELP U !!!!");
});


app.get('/weather',(req,res) =>{
    if(!req.query.address)
        return res.send({
            error : "Please enter the location."
        });

    //if address present

    geocode(req.query.address, (error, data1) => {
        if(error)
            return res.send({error});
        //console.log('Data : ', data)
        forecast(data1.latitude,data1.longitude, (error, data) => {
            if(error)
                return res.send({error});
            
            res.send({
                forecast : data,
                location : data1.location,
                address : req.query.address
            });
                 
        })
    });

    //end
});

app.get('/help/*',(req,res) =>{
    res.render("error",{
        title : "404",
        name : "Niraj Mahawar",
        errorMsg : "Help Aticle not Found."
    });
});

app.get('*',(req,res) =>{
    res.render("error",{
        title : "404",
        name : "Niraj Mahawar",
        errorMsg : "Page Not Found"
    });
});

app.listen(port,() => {
    console.log("Server is up and running in port 3000");
})