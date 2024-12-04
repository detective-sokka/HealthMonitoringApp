import requestLocationPermission from '../requestLocationPermission';
import { requestForegroundPermissionsAsync } from 'expo-location';

// Mocking the expo-location requestForegroundPermissionsAsync function
jest.mock('expo-location', () => ({
  requestForegroundPermissionsAsync: jest.fn(),
}));

describe('requestLocationPermission', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return true when permission is granted', async () => {
    // Mocking the response of requestForegroundPermissionsAsync
    (requestForegroundPermissionsAsync as jest.Mock).mockResolvedValue({
      status: 'granted',
    });

    const result = await requestLocationPermission();

    expect(result).toBe(true);
    expect(requestForegroundPermissionsAsync).toHaveBeenCalled();
  });

  it('should return false when permission is denied', async () => {
    // Mocking the response of requestForegroundPermissionsAsync
    (requestForegroundPermissionsAsync as jest.Mock).mockResolvedValue({
      status: 'denied',
    });

    const result = await requestLocationPermission();

    expect(result).toBe(false);
    expect(requestForegroundPermissionsAsync).toHaveBeenCalled();
  });

  it('should return false if there is an error while requesting permission', async () => {
    // Mocking the request to throw an error
    (requestForegroundPermissionsAsync as jest.Mock).mockRejectedValue(
      new Error('Permission request failed')
    );

    const result = await requestLocationPermission();

    expect(result).toBe(false);
    expect(requestForegroundPermissionsAsync).toHaveBeenCalled();
  });
});
