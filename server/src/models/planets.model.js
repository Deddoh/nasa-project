const {parse} = require("csv-parse");
const fs = require('fs');
const path = require('path');
const planets = [];

function isHabitablePlanet(planet){
    return planet['koi_disposition'] === 'CONFIRMED' && planet['koi_insol'] > 0.36 && planet['koi_insol'] < 1.11 && planet['koi_prad'] < 1.6;
 
}

function loadPlanetsData(){
    const csvPath = path.join(__dirname, '..','..', 'data', 'kepler_data.csv');
   return new Promise((resolve, reject)=>{

    fs.createReadStream(csvPath)
    .pipe(parse({
        comment:'#',
        columns: true,
    }))
    // .on("data", (data)=>{isHabitablePlanet(data) ? planets.push(data) : console.log("No habitable planet found")})
    .on("data", (data)=>{planets.push(data)})
    .on("error", (err)=>{console.log("Exception: ", err); reject(err)})
    .on("end", ()=>{
       
        resolve();
        
    })
})
}


module.exports = {
    planets,
    loadPlanetsData
};