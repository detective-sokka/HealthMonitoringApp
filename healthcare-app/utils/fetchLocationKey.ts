import axios from "axios";
import { LocationObject } from "expo-location";

const API_KEY = process.env.EXPO_PUBLIC_ACCUWEATHER_API_KEY;

const fetchLocationKey = async (location:LocationObject | null) => {
    if (!location)
        return null;
    try {
        console.log("ACCU KEY is : ", API_KEY);
        const locationKey = await axios.get(
          `http://dataservice.accuweather.com/locations/v1/cities/geoposition/search?apikey=${API_KEY}&q=${location.coords.latitude},${location.coords.longitude}`
        );
        return locationKey.data.Key;
      } catch (error) {
        console.error('Error fetching location data:', error);
        return null;
      }
}

export default fetchLocationKey;