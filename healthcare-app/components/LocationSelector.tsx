import React from "react";
import { View, Text, StyleSheet } from "react-native";
import FormField from "./FormField";

interface LocationSelectorProps {
  location: string;
  onLocationChange: (location: string) => void;
}

const LocationSelector: React.FC<LocationSelectorProps> = ({
  location,
  onLocationChange,
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>Location</Text>
      <Text style={styles.value}>{location || "No location selected"}</Text>
      <FormField
        title="Custom Location (Optional)"
        value={location}
        placeholder="Enter custom location"
        handleChangeText={onLocationChange}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { marginBottom: 24 },
  label: { fontSize: 16, fontWeight: "600", marginBottom: 8 },
  value: { marginBottom: 8, fontSize: 14, color: "#555" },
});

export default LocationSelector;
