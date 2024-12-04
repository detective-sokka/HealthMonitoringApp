import React from 'react';
import { View, Text, StyleSheet, Button, ScrollView, Alert } from 'react-native';
import ProfileHeader from '../../components/ProfileHeader';
import ButtonRow from '../../components/ButtonRow';
import SavedLocationList from '../../components/SavedLocationList';
import { useAuth } from '../../context/AuthContext';
import { router } from 'expo-router';
import CustomButton from '../../components/CustomButton';

const Profile = () => {

  const { user, signOut } = useAuth();
  console.log('Current user:', user);
  const username = user?.email?.split('@')[0] || 'User';
  console.log('Username:', username);

  const handleLogout = async () => {
    try {
      await signOut();
      router.replace("/sign-in");
    } catch (error) {
      Alert.alert("Error", "Failed to log out");
    }
  };

  
  const savedLocations = ['Latitude: 12.9716, Longitude: 77.5946', 'Latitude: 34.0522, Longitude: -118.2437'];

  const handleUpdateProfile = () => console.log('Update Profile');
  const handleSettings = () => console.log('Settings');
  const handleEdit = () => console.log('Edit');

  const handleAddMedicalData = () => console.log('Add Medical Data');
  const handleRaiseAwareness = () => console.log('Raise Awareness');

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Profile Header */}
      <ProfileHeader
        name="John Doe"
        photo="https://via.placeholder.com/100" // Replace with user's profile photo URL
      />

      {/* Button Row */}
      <ButtonRow
        buttons={[
          { title: 'Update Profile', onPress: handleUpdateProfile },
          { title: 'Settings', onPress: handleSettings },
          { title: 'Edit', onPress: handleEdit },
        ]}
      />

      <View className="p-4">
        <Text className="text-black text-2xl font-psemibold mb-4">
          Hello, {username}!
        </Text>
        <Text className="text-black text-lg mb-4">
          Email: {user?.email}
        </Text>
        <CustomButton
          title="Logout"
          handlePress={handleLogout}
          containerStyles="mt-4"
        />
      </View>

      {/* Location */}
      <View style={styles.locationContainer}>
        <Text style={styles.locationText}>Home</Text>
        <Text style={styles.locationDetail}>Latitude: 12.9716, Longitude: 77.5946</Text>
      </View>

      {/* Previous Posts / Awareness */}
      <View style={styles.postsContainer}>
        <Text style={styles.title}>Previous Posts</Text>
        <Button title="Raise Awareness" onPress={handleRaiseAwareness} />
        <Text style={styles.postText}>No posts yet.</Text>
      </View>

      {/* Medical Data */}
      <View style={styles.medicalDataContainer}>
        <Text style={styles.title}>Medical Data</Text>
        <Button title="Add Medical Data" onPress={handleAddMedicalData} />
      </View>

      {/* Saved Locations */}
      <SavedLocationList locations={savedLocations} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 16,
    backgroundColor: '#ffffff',
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
