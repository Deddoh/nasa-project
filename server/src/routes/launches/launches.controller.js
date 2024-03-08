const {getAllLaunches, deleteLaunch} = require('../../models/launches.model');
const {addNewLaunch, existsLaunchWithId} = require('../../models/launches.model');


function httpGetAllLaunches(req, res){
    return res.status(200).json(getAllLaunches());
}

function httpAddNewLaunch(req, res){
    const launch = req.body;
    if(!launch.mission || !launch.rocket || !launch.launchDate || !launch.target){
        return res.status(400).json({
            error: "Missing required launch property"
        });
    }
    launch.launchDate = new Date(launch.launchDate);
    launch.launchDate.toString() === 'Invalid Date' ? res.status(400).json({
        error: 'Invalid launch date'
    }) : true;
    addNewLaunch(launch);
    return res.status(201).json(launch)
// return res.status(200).json(addNewLaunch);
}

function httpDeleteLaunch(req, res){
    const launchId = Number(req.params.id);
    if(existsLaunchWithId(launchId)){
        deleteLaunch(launchId)
        return res.status(200).json();
    } else {
        return res.status(404).json({
            error: "Launch Not Found"
        })
    }
    

}

module.exports = {
    httpGetAllLaunches,
    httpAddNewLaunch,
    httpDeleteLaunch
}