import axios from 'axios';

const API_KEY = process.env.EXPO_PUBLIC_OPENWEATHER_API_KEY;

/**
 * Fetches air pollution data from the OpenWeather API based on latitude and longitude.
 * @param {number} lat - The latitude of the location.
 * @param {number} lon - The longitude of the location.
 * @returns {Promise<number | null>} - Returns the data or null if there's an error.
 */

export interface AirPollutionData {
    aqi: number;
    pm2_5: number;
    pm10: number;
}
  
const fetchAirPollutionData = async (lat: number, lon: number): Promise<AirPollutionData | null> => {
  try {
    console.log(lat, " ", lon, " ", API_KEY)
    const response = await axios.get(
      `http://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${API_KEY}`
    );
    const data = response.data.list[0]; 
    return {
        aqi: data.main.aqi,          // Air Quality Index
        pm2_5: data.components.pm2_5, // PM2.5 concentration
        pm10: data.components.pm10,   // PM10 concentration
    };
  } catch (error) {
    console.error('Error fetching air quality data:', error);
    return null;
  }
};

export default fetchAirPollutionData;
