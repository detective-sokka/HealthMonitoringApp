import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Slider from "@react-native-community/slider";

interface SeveritySliderProps {
  value: number;
  onChange: (value: number) => void;
}

const SeveritySlider: React.FC<SeveritySliderProps> = ({ value, onChange }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>Severity Level</Text>
      <Slider
        style={styles.slider}
        minimumValue={0}
        maximumValue={10}
        step={1}
        value={value}
        onValueChange={onChange}
        minimumTrackTintColor="#FF6347"
        maximumTrackTintColor="#DDD"
        thumbTintColor="#FF6347"
        testID="slider"
      />
      <Text style={styles.value} testID="severity-text">Severity: {value}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { marginBottom: 24 },
  label: { fontSize: 16, fontWeight: "600", marginBottom: 8 },
  slider: { width: "100%", height: 40 },
  value: { marginTop: 8, fontSize: 14, color: "#555" },
});

export default SeveritySlider;
