
const { Console } = require("console");
const express= require("express");
const https = require('https');
const PORT = process.env.PORT || 3000
const bodyParser = require("body-parser");
const { stringify } = require("querystring");


var query,unit,weatherData,temparature,weatherDescription,pressure,max,min,feel,humid;


const app = express(); 
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
app.use(express.json());
app.set('view engine', 'ejs');

app.get("/",(req,res)=>{

   res.sendFile(__dirname + "/index.html");    

})

app.get("/contact",(req,res)=>{

    res.sendFile(__dirname + "/contact.html");
})


app.get("/acknowledgment",(req,res)=>{

    res.sendFile(__dirname + "/acknowledgment.html");
})



app.get("/search",(req,res)=>{

    // res.sendFile(__dirname + "/search.html");
       res.render('search');
    
})

  app.post("/search",(req,res)=>{

    

      query=req.body.cityName;
      unit= req.body.Unit;

    const apikey="35b8cde73267200727c9c765ea4c16b7";
    const url= "https://api.openweathermap.org/data/2.5/weather?q="+query+"&units="+unit+"&appid="+apikey;

    https.get(url,function(response){

        console.log(response.statusCode);
        console.log(req.body.cityName);
        console.log(unit);
        
        response.on("data", function(data) {
             
         weatherData = JSON.parse(data)
         temparature = weatherData.main.temp;
         weatherDescription = weatherData.weather[0].description
         max=weatherData.main.temp_max;
         min=weatherData.main.temp_min;
         feel=weatherData.main.feels_like;
         humid=weatherData.main.humidity;
         pressure= weatherData.main.pressure;
         res.redirect("/results")
         
       

         
        })   
    })

  })

   app.get("/results",(req,res)=>{

    res.render('results',{city:query,temp:temparature,des:weatherDescription,feel:feel,max:max,min:min,humid:humid,u:unit,pressure:pressure});
        
             
    
    })
    
     


app.listen(PORT,()=>{

    console.log(`server started at port ${PORT}`);
})
