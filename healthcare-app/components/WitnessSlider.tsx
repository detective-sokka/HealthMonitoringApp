import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Slider from "@react-native-community/slider";

interface WitnessSliderProps {
  value: number;
  onChange: (value: number) => void;
}

const WitnessSlider: React.FC<WitnessSliderProps> = ({ value, onChange }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>Number of People Witnessed</Text>
      <Slider
        style={styles.slider}
        minimumValue={1}
        maximumValue={100}
        step={1}
        value={value}
        onValueChange={onChange}
        minimumTrackTintColor="#20B2AA"
        maximumTrackTintColor="#DDD"
        thumbTintColor="#20B2AA"
      />
      <Text style={styles.value}>Count: {value}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { marginBottom: 24 },
  label: { fontSize: 16, fontWeight: "600", marginBottom: 8 },
  slider: { width: "100%", height: 40 },
  value: { marginTop: 8, fontSize: 14, color: "#555" },
});

export default WitnessSlider;
