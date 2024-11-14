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

  // Use useEffect to handle location permission and retrieval
  useEffect(() => {
    const getLocation = async () => {
      const hasPermission = await requestLocationPermission();
      if (hasPermission) {
        // Get the current position using expo-location
        const currentLocation = await Location.getCurrentPositionAsync({
          accuracy: Location.Accuracy.High,
        });
        setLocation(currentLocation);
      }
    };

    getLocation();
  }, []); // Empty dependency array ensures this runs once on component mount

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
