import { View, Text } from 'react-native';
import React, { useState, useEffect } from 'react';
import { Accuracy, LocationObject, getCurrentPositionAsync } from 'expo-location';

import fetchAirPollutionData, { AirPollutionData } from '../../utils/fetchAirPollutionData';
import requestLocationPermission from '../../utils/requestLocationPermission';

const Home = () => {
  const [location, setLocation] = useState<LocationObject | null>(null);

  useEffect(() => {
    let isMounted = true; // Track whether the component is mounted

    const getLocation = async () => {
      const hasPermission = await requestLocationPermission();
      if (hasPermission) {
        try {
          const currentLocation = await getCurrentPositionAsync({
            accuracy: Accuracy.High,
          });
          if (isMounted) {
            setLocation(currentLocation);
          }
        } catch (error) {
          console.error('Error getting location:', error);
        }
      }
    };

    getLocation();

    // Cleanup function to set isMounted to false on component unmount
    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <View>
      <Text>Home</Text>
      {location ? (
        <Text>{`Location: Lat ${location.coords.latitude}, Lon ${location.coords.longitude}`}</Text>
      ) : (
        <Text>Fetching location...</Text>
      )}
    </View>
  );
};

export default Home;