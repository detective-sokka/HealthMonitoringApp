import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, ScrollView, SafeAreaView } from 'react-native';
import SearchBar from '../../components/SearchBar';
import Tile from '../../components/Tile';
import { Accuracy, LocationObject, getCurrentPositionAsync } from 'expo-location';
import requestLocationPermission from '../../utils/requestLocationPermission';

const Home = () => {
  const [location, setLocation] = useState<LocationObject | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    getLocation();
  }, []);

  const getLocation = async () => {
    const hasPermission = await requestLocationPermission();
    if (hasPermission) {
      try {
        setIsLoading(true);
        const currentLocation = await getCurrentPositionAsync({ accuracy: Accuracy.High });
        setLocation(currentLocation);
      } catch (error) {
        console.error('Error getting location:', error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleSearch = () => {
    console.log('Search:', searchQuery);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <SearchBar
          placeholder="Search for a location..."
          value={searchQuery}
          onChangeText={setSearchQuery}
          onSearch={handleSearch}
        />

        {/* Location Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Current Location</Text>
          {location ? (
            <Tile
              label="COORDINATES"
              value={`${location.coords.latitude.toFixed(2)}°, ${location.coords.longitude.toFixed(2)}°`}
              description="Your current geographical position"
              backgroundColor="rgba(96, 125, 139, 0.8)"
            />
          ) : (
            <ActivityIndicator size="large" color="#000" />
          )}
        </View>

        {/* Air Quality Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Air Quality</Text>
          <Tile
            label="PM10"
            value="45"
            description="Particulate matter up to 10 micrometers"
            backgroundColor="rgba(255, 160, 122, 0.8)"
          />
          <Tile
            label="PM2.5"
            value="30"
            description="Fine particulate matter concentration"
            backgroundColor="rgba(32, 178, 170, 0.8)"
          />
          <Tile
            label="AQI"
            value="80"
            description="Overall air quality measurement"
            backgroundColor="rgba(255, 99, 71, 0.8)"
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  scrollContent: {
    padding: 16,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1a1a1a',
    marginBottom: 12,
    paddingHorizontal: 4,
  },
});

export default Home;