import { requestForegroundPermissionsAsync } from 'expo-location';

const requestLocationPermission = async () => {
    try {
      const { status } = await requestForegroundPermissionsAsync();
      if (status === 'granted') {
        console.log('You can use Geolocation');
        return true;
      } else {
        console.log('You cannot use Geolocation');
        return false;
      }
    } catch (err) {
      console.error('Error requesting location permission:', err);
      return false;
    }
};

export default requestLocationPermission;