const http = require('http');
const app = require('./app');
const server = http.createServer(app);

const {loadPlanetsData} = require('./models/planets.model');
const PORT = 5010;
async function startServer(){
    await loadPlanetsData(); 
    server.listen(PORT, ()=>{
        console.log(`Listening on port: ${PORT}`)
    });   
}
startServer();