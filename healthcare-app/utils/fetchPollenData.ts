import axios from "axios";

const API_KEY = process.env.EXPO_PUBLIC_ACCUWEATHER_API_KEY;

export interface PollenData {
    Grass: string;
    Mold: string;
    Ragweed: string;
    Tree:string;
  }
const fetchPollenData = async (locationKey:number | null) => {
    if (!locationKey)
        return null;

    try {
        const response = await axios.get(
          `http://dataservice.accuweather.com/forecasts/v1/daily/1day/${locationKey}?apikey=${API_KEY}&details=true`
        );
        const airAndPollenData = response.data.DailyForecasts[0].AirAndPollen;
        return {
            Grass: airAndPollenData[1].Category,
            Mold:airAndPollenData[2].Category,
            Ragweed:airAndPollenData[3].Category,
            Tree:airAndPollenData[4].Category
        };
    } catch (err) {
        console.error("Failed to fetch pollen data");
    }
}

export default fetchPollenData;