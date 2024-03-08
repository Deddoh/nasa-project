const express = require('express');
const path = require('path');
const cors = require('cors');
const client = require('prom-client');
// const morgan = require('morgan');
const planetsRouter = require('./routes/planets/planets.router');
const launchesRouter = require('./routes/launches/launches.router');
const app = express(); 
app.use(cors({
    origin:'http://localhost:3000'
}));
// Create a Registry which registers the metrics
const register = new client.Registry();
// add a default label to be added to all metrics
register.setDefaultLabels({
    app:'nasa-project'
});

// enable collection of default metrics
client.collectDefaultMetrics({register})
app.use('/metrics', (req, res)=>{
res.setHeader('Content-Type',register.contentType)
register.metrics()
.then((response)=>{
    res.end(response)
})
})
// app.use(morgan('combined'))
app.use(express.json());
//serve the frontend build on the server
app.use(express.static(path.join(__dirname, '..', 'public'))) 
app.use('/planets',planetsRouter);
app.use('/launches', launchesRouter);
// serve the index.html file as the root file
app.get('/*', (req, res)=>{
    res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
});
module.exports = app;