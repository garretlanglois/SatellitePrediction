import * as satellite from 'satellite.js';
import { findSatellitePassOverPosition } from './satelliteUtils.js'; // Adjust this to the correct file path


const ISS_TLE = [
    '1 25994U 99068A   24306.85636306  .00002784  00000-0  58728-3 0  9997',
    '2 25994  98.0321   6.2139 0001120 316.2502 167.4642 14.60170341323250'
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

findSatellitePassOverPosition(satrec, now, targetPosition, setPassTime, 1);


