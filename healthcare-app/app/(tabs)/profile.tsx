import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, Button, Alert, SafeAreaView } from 'react-native';
import ProfileHeader from '../../components/ProfileHeader';
import { useAuth } from '../../context/AuthContext';
import { router } from 'expo-router';
import CustomButton from '../../components/CustomButton';
import requestLocationPermission from '../../utils/requestLocationPermission';
import { Accuracy, LocationObject, getCurrentPositionAsync } from 'expo-location';
import { icons } from '../../constants';

const Profile: React.FC = () => {
  const { user, updateUserProfile, signOut } = useAuth();
  const [username, setUsername] = useState<string>(user?.email?.split('@')[0] || 'User');
  const [location, setLocation] = useState<LocationObject | null>(null);

  const handleLogout = async () => {
    try {
      await signOut();
      router.replace("/sign-in");
    } catch (error) {
      Alert.alert("Error", "Failed to log out");
    }
  };

  const handleAddMedicalData = () => console.log('Add Medical Data');
  const handleRaiseAwareness = () => console.log('Raise Awareness');

  useEffect(() => {
    getLocation();
  }, []);

  const getLocation = async () => {
    const hasPermission = await requestLocationPermission();
    if (hasPermission) {
      try {
        const currentLocation = await getCurrentPositionAsync({ accuracy: Accuracy.High });
        setLocation(currentLocation);
      } catch (error) {
        console.error('Error getting location:', error);
      }
    }
  };

  const handleSaveName = async (newName: string) => {
    try {
      await updateUserProfile(newName);
      setUsername(newName);
    } catch (error) {
      Alert.alert("Error", "Failed to update name");
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <FlatList
        data={[{ key: 'content' }]}
        renderItem={() => (
          <View style={styles.container}>
            <ProfileHeader
              name={username}
              photo={icons.profile}
              email={user?.email || ''}
              onSaveName={handleSaveName}
            />
            <View style={styles.locationContainer}>
              <Text style={styles.locationText}>Home</Text>
              <Text style={styles.locationDetail}>
                Latitude: {location?.coords.latitude.toFixed(2)}, 
                Longitude: {location?.coords.longitude.toFixed(2)}
              </Text>
            </View>
            <View style={styles.postsContainer}>
              <Text style={styles.title}>Previous Posts</Text>
              <Button title="Raise Awareness" onPress={handleRaiseAwareness} />
              <Text style={styles.postText}>No posts yet.</Text>
            </View>
            <View style={styles.medicalDataContainer}>
              <Text style={styles.title}>Medical Data</Text>
              <Button title="Add Medical Data" onPress={handleAddMedicalData} />
            </View>
            <CustomButton
              title="Logout"
              handlePress={handleLogout}
              containerStyles="mt-4"
            />
          </View>
        )}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  container: {
    padding: 16,
  },
  userInfo: {
    padding: 16,
  },
  username: {
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 4,
    color: '#000',
  },
  email: {
    fontSize: 18,
    marginBottom: 16,
    color: '#000',
  },
  locationContainer: {
    marginVertical: 16,
    padding: 8,
    backgroundColor: '#e0f7fa',
    borderRadius: 8,
  },
  locationText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  locationDetail: {
    fontSize: 14,
    color: '#00796b',
  },
  postsContainer: {
    marginVertical: 16,
    padding: 8,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  postText: {
    fontSize: 14,
    color: '#757575',
    marginTop: 8,
  },
  medicalDataContainer: {
    marginVertical: 16,
    padding: 8,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
  },
});

export default Profile;
