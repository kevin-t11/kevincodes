"use client";

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { calculateDistance } from '@/lib/calculateDistance';
import { getLocation } from '@/lib/getLocation';
import { getUserIp } from '@/lib/getUserIp';

// Hardcoded server coordinates
const SERVER_LAT = 21.3587; // Your latitude
const SERVER_LON = 70.0860; // Your longitude

const LocationDistance: React.FC = () => {
  const [distance, setDistance] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch the user's IP address
        const userIp = await getUserIp();

        // Fetch the user's location based on the IP address
        const userLocation = await getLocation(userIp);

        //@ts-ignore
        const latitude = userLocation.latitude;
        //@ts-ignore
        const longitude = userLocation.longitude;

        // Calculate the distance between the user's location and the server's fixed coordinates
        const distance = calculateDistance(latitude, longitude, SERVER_LAT, SERVER_LON);
        console.log("distance" + distance);

        // Update the distance state
        setDistance(distance);
      } catch (err: any) {
        // Handle errors and update the error state
        if (axios.isAxiosError(err)) {
          setError(`Failed to fetch location: ${err.message}`);
        } else {
          setError(`Unexpected error: ${err}`);
        }
      }
    };

    fetchData();
  }, []);

  // Render error message if there's an error
  if (error) {
    return <h1 className='dark:text-slate-400 text-slate-600'>Error: {error}</h1>;
  }

  // Render loading message if distance is still being calculated
  if (distance === null) {
    return <h1 className='dark:text-slate-400 text-slate-600'>Calculating.....</h1>;
  }

  // Render the calculated distance
  return <h1 className='dark:text-slate-400 italic text-sm text-slate-600'>{distance.toFixed(2)} km away! (straight-line distance, not based on road routes)</h1>;
};

export default LocationDistance;
