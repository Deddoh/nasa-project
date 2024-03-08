const launches = new Map();
let latestFlightNumber = 100;
const launch = {
    flightNumber: 100,
    mission: "Kepler Exploration X",
    rocket: "Explorer IS1",
    launchDate: new Date('December 27, 2030'),
    destination: 'Kepler-442 b',
    customer: ['ZTM', 'NASA'],
    upcoming: true,
    success: true,
    target: "Space X"
}

launches.set(launch.flightNumber, launch);
// check if passed id exists
function existsLaunchWithId(launchId){
    return launches.has(launchId);
}

function getAllLaunches(){
    return Array.from(launches.values());
}
// add new launch to the launches Map
function addNewLaunch(launch){
    latestFlightNumber++;
    launches.set(latestFlightNumber, Object.assign(launch, {
        flightNumber: latestFlightNumber,
        upcoming: true,
        success: true,
        customers: ['Zero To Mastery', 'NASA']
    }));
}

function deleteLaunch(launchId){
    // instead of deleting the record, we archive it
    // by marking it as not upcoming
    const aborted = launches.get(launchId);
    aborted.upcoming = false;
    aborted.success = false;
    return aborted;
}
module.exports = {existsLaunchWithId, getAllLaunches, addNewLaunch, deleteLaunch};