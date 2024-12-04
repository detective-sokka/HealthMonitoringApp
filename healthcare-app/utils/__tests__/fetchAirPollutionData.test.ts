import axios from 'axios';
import fetchAirPollutionData, { AirPollutionData } from '../fetchAirPollutionData';

// Mock the axios.get method
jest.mock('axios');

describe('fetchAirPollutionData', () => {
  const mockLat = 40.7128;
  const mockLon = -74.0060;

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should fetch air pollution data successfully', async () => {
    const mockResponse = {
      data: {
        list: [
          {
            main: {
              aqi: 2, // Air Quality Index
            },
            components: {
              pm2_5: 12.34, // PM2.5 concentration
              pm10: 25.67,  // PM10 concentration
            },
          },
        ],
      },
    };

    // Mocking axios.get to return the mockResponse
    (axios.get as jest.Mock).mockResolvedValue(mockResponse);

    const result = await fetchAirPollutionData(mockLat, mockLon);

    expect(axios.get).toHaveBeenCalledWith(
      `http://api.openweathermap.org/data/2.5/air_pollution?lat=${mockLat}&lon=${mockLon}&appid=${process.env.EXPO_PUBLIC_OPENWEATHER_API_KEY}`
    );
    expect(result).toEqual<AirPollutionData>({
      aqi: 2,
      pm2_5: 12.34,
      pm10: 25.67,
    });
  });

  it('should return null if there is an error in fetching air pollution data', async () => {
    // Mocking axios.get to simulate an error
    (axios.get as jest.Mock).mockRejectedValue(new Error('Failed to fetch data'));

    const result = await fetchAirPollutionData(mockLat, mockLon);

    expect(result).toBeNull(); // The function should return null in case of an error
  });

  it('should return null if latitude or longitude is invalid', async () => {
    const result = await fetchAirPollutionData(null as any, null as any); // Invalid input

    expect(result).toBeNull(); // The function should return null for invalid coordinates
  });
});
