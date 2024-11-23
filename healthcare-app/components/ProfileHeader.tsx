import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

type ProfileHeaderProps = {
  name: string;
  photo: string;
};

const ProfileHeader: React.FC<ProfileHeaderProps> = ({ name, photo }) => {
  return (
    <View style={styles.container}>
      <Image source={{ uri: photo }} style={styles.profileImage} />
      <Text style={styles.name}>{name}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginVertical: 16,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 8,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default ProfileHeader;
