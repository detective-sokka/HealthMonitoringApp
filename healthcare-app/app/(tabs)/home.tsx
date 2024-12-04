import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, ScrollView, SafeAreaView } from 'react-native';
import SearchBar from '../../components/SearchBar';
import Tile from '../../components/Tile';
import { Accuracy, LocationObject, getCurrentPositionAsync } from 'expo-location';
import requestLocationPermission from '../../utils/requestLocationPermission';
import fetchAirPollutionData, { AirPollutionData } from '../../utils/fetchAirPollutionData';
import fetchPollenData, { PollenData } from '../../utils/fetchPollenData';
import fetchLocationKeyData from '../../utils/fetchLocationKeyData';
import fetchCovidData, { CovidData } from '../../utils/fetchCovidData';
import { useAuth } from '../../context/AuthContext';
import fetchWaterQualityData, { WaterQualityData } from '../../utils/fetchWaterPollutionData';

const Home = () => {

  const { user } = useAuth();
  const username = user?.email?.split('@')[0] || 'User';
  
  const [location, setLocation] = useState<LocationObject | null>(null);
  
  const [airPollutionData, setAirPollutionData] = useState<AirPollutionData | null>(null);
  const [waterQualityData, setWaterQualityData] = useState<WaterQualityData | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [locationKey, setLocationKey] = useState(null); 
  const [stateCode, setStateCode] = useState('');

  const [pollenData, setPollenData] = useState<PollenData | null>(null);
  const [covidData, setCovidData] = useState<CovidData|null>(null);

  useEffect(() => {
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
      }).catch((error) => console.error('Error fetching air pollution data:', error));

      fetchWaterQualityData(
        location.coords.latitude,
        location.coords.longitude
      ).then((data) => {
        if (data) {
          setWaterQualityData(data);
        }
      }).catch((error) => console.error('Error fetching water quality data:', error));
    } 
  }, [location]);

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

  // Set Location Key and State Code based on co-ordinates
  useEffect(() => {
    fetchLocationKeyData(location).then((data) => {
      if (data)
      {
        setLocationKey(data.Key);
        setStateCode(data.AdministrativeArea.ID);
        console.log("Location key is : ", data.Key);
      }        
    }).catch((error) => console.error('Error in getLocation:', error));
  }, [location]);

  // Get Pollen Data based on co-ordinates
  useEffect(() => { 
    if (locationKey) {
      fetchPollenData(locationKey).then((data) => {
        if (data)
          setPollenData(data);
      }).catch((error) => console.error('Error in fetchPollenData :', error));
    }    
  }, [locationKey]);

  // Fetch COVID data based on State code
  useEffect(() => {
    if (stateCode)
    {
      fetchCovidData(stateCode).then((data) => {
        if (data)
          setCovidData(data);
      }).catch((error) => console.error('Error in fetchCovidData :', error));
    }
  }, [stateCode]);

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
            value={airPollutionData? airPollutionData?.pm10 : ""}
            description="Particulate matter up to 10 micrometers"
            backgroundColor="rgba(255, 160, 122, 0.8)"
          />
          <Tile
            label="PM2.5"
            value={airPollutionData? airPollutionData?.pm2_5 : ""}
            description="Fine particulate matter concentration"
            backgroundColor="rgba(32, 178, 170, 0.8)"
          />
          <Tile
            label="AQI"
            value={airPollutionData? airPollutionData?.aqi : ""}
            description="Overall air quality measurement"
            backgroundColor="rgba(255, 99, 71, 0.8)"
          />
          { pollenData ?
            <View>
              <Text>Tree Pollen: {pollenData.Tree}</Text>
              <Text>Grass Pollen: {pollenData.Grass}</Text>
              <Text>Ragweed Pollen: {pollenData.Ragweed}</Text>
              <Text>Mold: {pollenData.Mold}</Text>
            </View>
            :
            <></>
          }
          {
            covidData ? 
            <View>
              <Text>population: {covidData.population}</Text>
              <Text>newCases: {covidData.newCases}</Text>
              <Text>testPositivityRatio: {covidData.testPositivityRatio}</Text>
              <Text>vaccinationRatio: {covidData.vaccinationRatio}</Text>
            </View>
            :
            <View></View>
          } 
          {
            waterQualityData ? 
            <View>
              <Text>pH: {waterQualityData.pH}</Text>
              <Text>Lead: {waterQualityData.lead}</Text>
              <Text>E. Coli: {waterQualityData.eColi}</Text>
            </View>
            :
            <View></View>
          }          
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