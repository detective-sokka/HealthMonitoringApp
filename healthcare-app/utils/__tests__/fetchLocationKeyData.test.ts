import axios from "axios";
import fetchLocationKeyData from "../fetchLocationKeyData";
import { LocationObject } from "expo-location";

// Mock the axios.get method
jest.mock('axios');

describe('fetchLocationKeyData', () => {
  const mockLocation: LocationObject = {
    coords: {
      latitude: 40.7128,
      longitude: -74.0060,
      altitude: 0,
      accuracy: 10,
      altitudeAccuracy: 5,
      heading: 0,
      speed: 0,
    },
    timestamp: Date.now(),
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return null if location is null', async () => {
    const result = await fetchLocationKeyData(null);
    expect(result).toBeNull();
  });

  it('should fetch location key data successfully', async () => {
    const mockResponse = {
      data: {
        Key: "12345",
        LocalizedName: "New York",
      },
    };

    // Mocking axios.get to return the mockResponse
    (axios.get as jest.Mock).mockResolvedValue(mockResponse);

    const result = await fetchLocationKeyData(mockLocation);

    expect(axios.get).toHaveBeenCalledWith(
      `http://dataservice.accuweather.com/locations/v1/cities/geoposition/search?apikey=${process.env.EXPO_PUBLIC_ACCUWEATHER_API_KEY}&q=${mockLocation.coords.latitude},${mockLocation.coords.longitude}`
    );
    expect(result).toEqual(mockResponse.data);
  });

  it('should return null if there is an error fetching location data', async () => {
    // Mocking axios.get to simulate an error
    (axios.get as jest.Mock).mockRejectedValue(new Error('Failed to fetch data'));

    const result = await fetchLocationKeyData(mockLocation);

    expect(result).toBeNull(); // The function should return null in case of an error
  });
});
