import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';

type SavedLocationListProps = {
  locations: string[]; // Explicitly define the type for locations
};

const SavedLocationList: React.FC<SavedLocationListProps> = ({ locations }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Saved Locations</Text>
      <FlatList
        data={locations}
        renderItem={({ item }) => <Text style={styles.location}>{item}</Text>}
        keyExtractor={(item, index) => `${item}-${index}`}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
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
  location: {
    fontSize: 14,
    paddingVertical: 4,
  },
});

export default SavedLocationList;
