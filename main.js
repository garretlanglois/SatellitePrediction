import * as satellite from 'satellite.js';
import { findSatellitePassOverPosition } from './satelliteUtils.js'; // Adjust this to the correct file path


const ISS_TLE = [
    '1 25544U 98067A   24303.66486354  .00043501  00000-0  74504-3 0  9990',
    '2 25544  51.6404   9.2721 0008807 114.5857 343.1704 15.50747685479401'
  ];

const tleLine1 = ISS_TLE[0];
const tleLine2 = ISS_TLE[1];

const satrec = satellite.twoline2satrec(tleLine1, tleLine2);

const now = new Date();

const targetPosition = [43.2628, -79.9177];

// Mock function to set pass time
const setPassTime = (passTime) => {
    console.log("Pass Time: ", passTime);
};

findSatellitePassOverPosition(satrec, now, targetPosition, setPassTime, 3);


