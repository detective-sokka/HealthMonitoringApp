import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, TextInput, ImageSourcePropType } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface ProfileHeaderProps {
  name: string;
  photo: ImageSourcePropType;
  email: string;
  onSaveName: (newName: string) => void;
}

const ProfileHeader: React.FC<ProfileHeaderProps> = ({ name, photo, email, onSaveName }) => {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editedName, setEditedName] = useState<string>(name);

  const handleSave = () => {
    onSaveName(editedName);
    setIsEditing(false);
  };

  return (
    <View style={styles.header}>
      <Image source={photo} style={styles.photo} />
      <View style={styles.info}>
        {isEditing ? (
          <View style={styles.editContainer}>
            <TextInput
              style={styles.input}
              value={editedName}
              onChangeText={setEditedName}
              autoFocus
            />
            <TouchableOpacity onPress={handleSave}>
              <Ionicons name="checkmark" size={24} color="#007AFF" />
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.nameContainer}>
            <Text style={styles.name}>{name}</Text>
            <TouchableOpacity onPress={() => setIsEditing(true)}>
              <Ionicons name="pencil" size={20} color="#007AFF" />
            </TouchableOpacity>
          </View>
        )}
        <Text style={styles.email}>{email}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    alignItems: 'center',
    marginBottom: 20,
  },
  photo: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 15,
  },
  info: {
    alignItems: 'center',
  },
  nameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    marginRight: 10,
    paddingHorizontal: 10,
  },
  email: {
    fontSize: 16,
    color: '#666',
    paddingHorizontal: 10,
  },
  editContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  input: {
    fontSize: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#007AFF',
    marginRight: 10,
    paddingHorizontal: 10,
    textAlign: 'center',
  },
});

export default ProfileHeader;