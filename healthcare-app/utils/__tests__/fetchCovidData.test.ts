import axios from 'axios';
import fetchCovidData, { CovidData } from '../fetchCovidData';

// Mock the axios.get method
jest.mock('axios');

describe('fetchCovidData', () => {
  const mockStateCode = 'CA'; // Example state code

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should fetch COVID data successfully', async () => {
    const mockResponse = {
      data: {
        population: 39538223,
        actuals: {
          newCases: 1500,
        },
        metrics: {
          testPositivityRatio: 0.05,
          vaccinationsCompletedRatio: 0.75,
        },
      },
    };

    // Mocking axios.get to return the mockResponse
    (axios.get as jest.Mock).mockResolvedValue(mockResponse);

    const result = await fetchCovidData(mockStateCode);

    expect(axios.get).toHaveBeenCalledWith(
      `https://api.covidactnow.org/v2/state/${mockStateCode}.timeseries.json?apiKey=${process.env.EXPO_PUBLIC_COVID_ACT_NOW_API_KEY}`
    );
    expect(result).toEqual<CovidData>({
      population: 39538223,
      newCases: 1500,
      testPositivityRatio: 0.05,
      vaccinationRatio: 0.75,
    });
  });

  it('should return null if there is an error in fetching COVID data', async () => {
    // Mocking axios.get to simulate an error
    (axios.get as jest.Mock).mockRejectedValue(new Error('Failed to fetch data'));

    const result = await fetchCovidData(mockStateCode);

    expect(result).toBeNull(); // The function should return null in case of an error
  });

  it('should return null if stateCode is empty or invalid', async () => {
    const result = await fetchCovidData(''); // Invalid stateCode

    expect(result).toBeNull(); // The function should return null for invalid stateCode
  });
});
