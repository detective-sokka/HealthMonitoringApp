import { View, Text } from 'react-native';
import React, { useState, useEffect } from 'react';
import { Accuracy, LocationObject, getCurrentPositionAsync } from 'expo-location';

import fetchAirPollutionData, { AirPollutionData } from '../../utils/fetchAirPollutionData';
import requestLocationPermission from '../../utils/requestLocationPermission';

const Home = () => {
  const [location, setLocation] = useState<LocationObject | null>(null);
  const [airPollutionData, setAirPollutionData] = useState<AirPollutionData | null>(null);

  useEffect(() => {
    const getLocation = async () => {
      const hasPermission = await requestLocationPermission();
  
      if (hasPermission) {
  
        try {
          const currentLocation = await getCurrentPositionAsync({
            accuracy: Accuracy.High,
          });

          setLocation(currentLocation); 
  
        } catch (error) {
          console.error('Error getting location:', error);
        }
      }
    };

    getLocation();

  }, []);

  useEffect(() => {

    if (location)
    {
      fetchAirPollutionData(
        location.coords.latitude,
        location.coords.longitude
      ).then((data) => {
        if (data) {
          setAirPollutionData(data);
        }
      }).catch((error) => console.error('Error in getLocation:', error));
    } 
  }, [location]);

  return (
    <View>
      <Text>Home</Text>
      {location ? (
        <Text>{`Location: Lat ${location.coords.latitude}, Lon ${location.coords.longitude}`}</Text>
      ) : (
        <Text>Fetching location...</Text>
      )}
      { airPollutionData ? 
          <Text>{`PM10 : ${airPollutionData.pm10}, PM2.5 : ${airPollutionData.pm2_5}, AQI : ${airPollutionData.aqi}`}</Text>
          :
          <Text> Fetching AQ data... </Text>
      }
    </View>
  );
};

export default Home;
