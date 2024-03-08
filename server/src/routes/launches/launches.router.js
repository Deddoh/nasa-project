const express = require('express');
const launchesRouter = express.Router();
const {httpAddNewLaunch, httpGetAllLaunches, httpDeleteLaunch} = require('./launches.controller')

launchesRouter.get('/', httpGetAllLaunches); // the / means we are picking the root path name from where the launches router is mounted ie in app.js
launchesRouter.post('/', httpAddNewLaunch);
launchesRouter.delete('/:id', httpDeleteLaunch)
module.exports = launchesRouter