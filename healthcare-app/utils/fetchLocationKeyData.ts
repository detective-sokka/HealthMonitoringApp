import axios from "axios";
import { LocationObject } from "expo-location";

const API_KEY = process.env.EXPO_PUBLIC_ACCUWEATHER_API_KEY;

const fetchLocationKeyData = async (location:LocationObject | null)  => {
    if (!location)
        return null;
    try {
        const locationKey = await axios.get(
          `http://dataservice.accuweather.com/locations/v1/cities/geoposition/search?apikey=${API_KEY}&q=${location.coords.latitude},${location.coords.longitude}`
        );
        return locationKey.data;
      } catch (error) {
        console.log('Error fetching location data');
        return null;
      }
}

export default fetchLocationKeyData;