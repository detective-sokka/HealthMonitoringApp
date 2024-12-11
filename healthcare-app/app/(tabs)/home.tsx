import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, SafeAreaView } from 'react-native';

import { Accuracy, LocationObject, getCurrentPositionAsync } from 'expo-location';
import requestLocationPermission from '../../utils/requestLocationPermission';
import fetchAirPollutionData, { AirPollutionData } from '../../utils/fetchAirPollutionData';
import fetchPollenData, { PollenData } from '../../utils/fetchPollenData';
import fetchLocationKeyData from '../../utils/fetchLocationKeyData';
import fetchCovidData, { CovidData } from '../../utils/fetchCovidData';
import { useAuth } from '../../context/AuthContext';
import fetchWaterQualityData, { WaterQualityData } from '../../utils/fetchWaterQualityData';
import Tile from '../../components/Tile';
import Section from '../../components/Section';

import { configureNotifications, registerForPushNotificationsAsync, sendNotification } from '../../utils/NotificationService';
import { checkThresholdsAndNotify } from '../../utils/AlertService';

const Home = () => {

  const { user } = useAuth();
  const username = user?.email?.split('@')[0] || 'User';
  
  const [location, setLocation] = useState<LocationObject | null>(null);
  const [airPollutionData, setAirPollutionData] = useState<AirPollutionData | null>(null);
  const [waterQualityData, setWaterQualityData] = useState<WaterQualityData | null>(null);
  const [locationKey, setLocationKey] = useState(null); 
  const [stateCode, setStateCode] = useState('');
  const [pollenData, setPollenData] = useState<PollenData | null>(null);
  const [covidData, setCovidData] = useState<CovidData|null>(null);

  const sendInitialStatusNotifications = async () => {
    if (airPollutionData) {
      await sendNotification(
        'Current Air Quality Status',
        `PM10: ${airPollutionData.pm10.toFixed(2)}\nPM2.5: ${airPollutionData.pm2_5.toFixed(2)}\nAQI: ${airPollutionData.aqi}`
      );
    }

    if (waterQualityData) {
      await sendNotification(
        'Current Water Quality Status',
        `pH: ${waterQualityData.pH}\nLead: ${waterQualityData.lead}\nE. Coli: ${waterQualityData.eColi}`
      );
    }

    if (pollenData) {
      await sendNotification(
        'Current Pollen Status',
        `Tree: ${pollenData.Tree}\nGrass: ${pollenData.Grass}\nRagweed: ${pollenData.Ragweed}\nMold: ${pollenData.Mold}`
      );
    }

    if (covidData) {
      await sendNotification(
        'Current COVID-19 Status',
        `New Cases: ${covidData.newCases}\nTest Positivity: ${(covidData.testPositivityRatio * 100).toFixed(2)}%\nVaccination Rate: ${(covidData.vaccinationRatio * 100).toFixed(2)}%`
      );
    }
  };

  const getLocation = async () => {
    const hasPermission = await requestLocationPermission();
    if (hasPermission) {
      try {
        const currentLocation = await getCurrentPositionAsync({ accuracy: Accuracy.High });
        setLocation(currentLocation);
      } catch (error) {
        console.error('Error getting location:', error);
      }
    }
  };

  // Initialize notifications
  useEffect(() => {
    configureNotifications();
    registerForPushNotificationsAsync();
  }, []);

  // Get location
  useEffect(() => {
    getLocation();
  }, []);

  // Fetch data based on location
  useEffect(() => {
    if (location) {
      fetchLocationKeyData(location).then((data) => {
        if (data) {
          setLocationKey(data.Key);
          setStateCode(data.AdministrativeArea.ID);
        }        
      }).catch((error) => console.error('Error in getLocation:', error));

      fetchAirPollutionData(
        location.coords.latitude,
        location.coords.longitude
      ).then((data) => {
        if (data) setAirPollutionData(data);
      }).catch((error) => console.error('Error fetching air pollution data:', error));

      fetchWaterQualityData(
        location.coords.latitude,
        location.coords.longitude
      ).then((data) => {
        if (data) setWaterQualityData(data);
      }).catch((error) => console.error('Error fetching water quality data:', error));
    } 
  }, [location]);

  // Get Pollen Data
  useEffect(() => { 
    if (locationKey) {
      fetchPollenData(locationKey).then((data) => {
        if (data) setPollenData(data);
      }).catch((error) => console.error('Error in fetchPollenData :', error));
    }    
  }, [locationKey]);

  // Get COVID data
  useEffect(() => {
    if (stateCode) {
      fetchCovidData(stateCode).then((data) => {
        if (data) setCovidData(data);
      }).catch((error) => console.error('Error in fetchCovidData :', error));
    }
  }, [stateCode]);

  // Send initial status notifications and check thresholds
  useEffect(() => {
    if (airPollutionData && waterQualityData && pollenData && covidData) {
      sendInitialStatusNotifications();
      checkThresholdsAndNotify({
        airPollutionData,
        waterQualityData,
        pollenData,
        covidData
      });
    }
  }, [airPollutionData, waterQualityData, pollenData, covidData]);


  const colorSchemes = {
    location: ['rgba(96, 125, 139, 0.8)'],
    airQuality: ['rgba(255, 87, 34, 0.8)', 'rgba(255, 138, 101, 0.8)', 'rgba(255, 183, 77, 0.8)'],
    pollen: ['rgba(76, 175, 80, 0.8)', 'rgba(129, 199, 132, 0.8)', 'rgba(165, 214, 167, 0.8)', 'rgba(200, 230, 201, 0.8)'],
    covid: ['rgba(147, 112, 219, 0.8)', 'rgba(138, 43, 226, 0.8)', 'rgba(153, 50, 204, 0.8)', 'rgba(186, 85, 211, 0.8)'],
    water: ['rgba(3, 169, 244, 0.8)', 'rgba(41, 182, 246, 0.8)', 'rgba(79, 195, 247, 0.8)']
  };

  const abbreviateNumber = (num: number) => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
    if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
    return num.toString();
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {location && (
          <View style={styles.fullWidthTile}>
            <Tile
              label="COORDINATES"
              value={`${location.coords.latitude.toFixed(2)}°, ${location.coords.longitude.toFixed(2)}°`}
              description="Your current geographical position"
              backgroundColor={colorSchemes.location[0]}
            />
          </View>
        )}
        {airPollutionData && Section('Air Quality', [
          { label: 'PM10', value: airPollutionData.pm10.toFixed(2), description: 'Particulate matter up to 10 micrometers' },
          { label: 'PM2.5', value: airPollutionData.pm2_5.toFixed(2), description: 'Fine particulate matter concentration' },
          { label: 'AQI', value: airPollutionData.aqi, description: 'Overall air quality measurement' }
        ].map((item, index) => ({ ...item, backgroundColor: colorSchemes.airQuality[index] })), colorSchemes.airQuality)}

        {pollenData && Section('Pollen Levels', [
          { label: 'Tree Pollen', value: pollenData.Tree, description: 'Tree pollen level' },
          { label: 'Grass Pollen', value: pollenData.Grass, description: 'Grass pollen level' },
          { label: 'Ragweed Pollen', value: pollenData.Ragweed, description: 'Ragweed pollen level' },
          { label: 'Mold', value: pollenData.Mold, description: 'Mold spore level' }
        ].map((item, index) => ({ ...item, backgroundColor: colorSchemes.pollen[index] })), colorSchemes.pollen)}

        {covidData && Section('COVID-19 Statistics', [
          { label: 'Population', value: abbreviateNumber(covidData.population), description: 'Total population in the area' },
          { label: 'New Cases', value: covidData.newCases.toLocaleString(), description: 'New COVID-19 cases reported' },
          { label: 'Test Positivity', value: `${(covidData.testPositivityRatio * 100).toFixed(2)}%`, description: 'Percentage of positive COVID-19 tests' },
          { label: 'Vaccination Rate', value: `${(covidData.vaccinationRatio * 100).toFixed(2)}%`, description: 'Percentage of population vaccinated' }
        ].map((item, index) => ({ ...item, backgroundColor: colorSchemes.covid[index] })), colorSchemes.covid)}

        {waterQualityData && Section('Water Quality (10-mile radius average)', [
          { label: 'pH Level', value: waterQualityData.pH, description: 'pH level of water' },
          { label: 'Lead', value: waterQualityData.lead, description: 'Lead concentration' },
          { label: 'E. Coli', value: waterQualityData.eColi, description: 'E. Coli concentration' }
        ].map((item, index) => ({ ...item, backgroundColor: colorSchemes.water[index] })), colorSchemes.water)}
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
  fullWidthTile: {
    width: '100%',
    marginBottom: 16,
  },
});

export default Home;