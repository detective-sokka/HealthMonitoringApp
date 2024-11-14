import { View, Text } from 'react-native';
import React, { useState, useEffect } from 'react';
import * as Location from 'expo-location';

const requestLocationPermission = async () => {
  try {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status === 'granted') {
      console.log('You can use Geolocation');
      return true;
    } else {
      console.log('You cannot use Geolocation');
      return false;
    }
  } catch (err) {
    console.error('Error requesting location permission:', err);
    return false;
  }
};

const Home = () => {
  const [location, setLocation] = useState<Location.LocationObject | null>(null);

  useEffect(() => {
    let isMounted = true; // Track whether the component is mounted

    const getLocation = async () => {
      const hasPermission = await requestLocationPermission();
      if (hasPermission) {
        try {
          const currentLocation = await Location.getCurrentPositionAsync({
            accuracy: Location.Accuracy.High,
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