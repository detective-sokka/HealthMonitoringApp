import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { FlatList } from 'react-native-reanimated/src/Animated';
import Tile from './Tile';

type Item = {
    label: string;
    value: string | number;
    description: string;
    backgroundColor: string;
};

const renderItem = ({ item }: { item: Item }) => (
    <View style={[styles.tileContainer, { maxHeight: 150, minHeight: 120 }]}>
      <Tile
        label={item.label}
        value={item.value}
        description={item.description}
        backgroundColor={item.backgroundColor}
      />
    </View>
);

const Section = (title: string, data: Item[], colorScheme: any) => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{title}</Text>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.label}
        numColumns={2}
        columnWrapperStyle={styles.row}
        scrollEnabled={false}
      />
    </View>
);

const styles = StyleSheet.create({
    section: {
        marginBottom: 24,
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: '600',
        color: '#1a1a1a',
        marginBottom: 12,
        paddingHorizontal: 4,
    },
    row: {
        justifyContent: 'space-between',
    },
    tileContainer: {
        width: '48%',
        marginBottom: 16,
    },
});

export default Section;
