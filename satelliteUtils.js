import { propagate, gstime, eciToGeodetic, degreesLat, degreesLong } from 'satellite.js';

export const findSatellitePassOverPosition = (
    satrec, 
    now, 
    targetPosition, // lat and long as an array of two numbers
    setPassTime, // function to set passover time
    tolerance = 0.5 // degrees tolerance
) => {

    let closestPassTime = null;
    let closestDistance = Number.MAX_VALUE;

    for (let i = 0; i < 14400; i++) { // loop over 24 hours
        const futureDate = new Date(now.getTime() + i * 60000); // increment time by one minute
        const futureGmst = gstime(futureDate);
        const futurePositionAndVelocity = propagate(satrec, futureDate);

        if (!futurePositionAndVelocity || !futurePositionAndVelocity.position) {
            console.error("Propagation failed at minute", i);
            continue;
        }

        const futurePositionEci = futurePositionAndVelocity.position;
        const futurePositionGd = eciToGeodetic(futurePositionEci, futureGmst);
        const futureLatitude = degreesLat(futurePositionGd.latitude);
        const futureLongitude = degreesLong(futurePositionGd.longitude);

        const distanceToTarget = Math.sqrt(
            Math.pow(futureLatitude - targetPosition[0], 2) + 
            Math.pow(futureLongitude - targetPosition[1], 2)
        );

        if (distanceToTarget < closestDistance) {
            closestDistance = distanceToTarget;
            closestPassTime = futureDate;
        }

        if (distanceToTarget <= tolerance) { 
            setPassTime(futureDate); // if we are within the tolerance, set this as the passover time
            return;
        }
    }

    // set the closest passover time, if no passover time is found
    setPassTime(closestDistance <= tolerance ? closestPassTime : null);
};
