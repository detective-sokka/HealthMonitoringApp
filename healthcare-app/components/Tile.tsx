import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface TileProps {
  label: string;
  value: string | number;
  backgroundColor: string;
  description?: string;
}

const Tile: React.FC<TileProps> = ({ label, value, backgroundColor, description }) => {
  return (
    <View style={[styles.tile, { backgroundColor }]}>
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.value}>{value}</Text>
      {description && <Text style={styles.description}>{description}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  tile: {
    width: '100%',
    marginBottom: 12,
    padding: 16,
    borderRadius: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    color: '#fff',
    marginBottom: 8,
    opacity: 0.9,
    textTransform: 'uppercase',
  },
  value: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 8,
  },
  description: {
    fontSize: 13,
    color: '#fff',
    opacity: 0.8,
    lineHeight: 18,
  },
});

export default Tile;