import axios from 'axios';
import fetchPollenData, { PollenData } from '../fetchPollenData';

// Mock the axios.get method
jest.mock('axios');

describe('fetchPollenData', () => {
  const mockLocationKey = 12345;
  
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return null if locationKey is null', async () => {
    const result = await fetchPollenData(null);
    expect(result).toBeNull();
  });

  it('should fetch pollen data successfully', async () => {
    const mockResponse = {
      data: {
        DailyForecasts: [
          {
            AirAndPollen: [
              { Category: 'Low' }, // Placeholder for index 0 (not used)
              { Category: 'Moderate' }, // Grass
              { Category: 'High' }, // Mold
              { Category: 'Moderate' }, // Ragweed
              { Category: 'Low' }, // Tree
            ],
          },
        ],
      },
    };

    // Mocking axios.get to return the mockResponse
    (axios.get as jest.Mock).mockResolvedValue(mockResponse);

    const result = await fetchPollenData(mockLocationKey);

    expect(axios.get).toHaveBeenCalledWith(
      `http://dataservice.accuweather.com/forecasts/v1/daily/1day/${mockLocationKey}?apikey=${process.env.EXPO_PUBLIC_ACCUWEATHER_API_KEY}&details=true`
    );
    expect(result).toEqual<PollenData>({
      Grass: 'Moderate',
      Mold: 'High',
      Ragweed: 'Moderate',
      Tree: 'Low',
    });
  });

  it('should handle API failure gracefully', async () => {
    // Mocking axios.get to simulate an error
    (axios.get as jest.Mock).mockRejectedValue(new Error('Failed to fetch data'));

    const result = await fetchPollenData(mockLocationKey);

    expect(result).toBeNull(); // The function should return null in case of an error
  });
});
