import React, { useState } from "react";
import { ScrollView, Text, StyleSheet, TouchableOpacity } from "react-native";
import Dropdown from "../../components/Dropdown";
import SeveritySlider from "../../components/SeveritySlider";
import WitnessSlider from "../../components/WitnessSlider";
import LocationSelector from "../../components/LocationSelector";

const Create = () => {
  const [observationType, setObservationType] = useState<string | null>(null);
  const [severity, setSeverity] = useState<number>(0);
  const [witnessedCount, setWitnessedCount] = useState<number>(1);
  const [location, setLocation] = useState<string>("");

  const handleSubmit = () => {
    const report = {
      observationType,
      severity,
      witnessedCount,
      location,
    };
    console.log("Report Submitted:", report);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Report COVID Observation</Text>

      {/* Dropdown for Observation Type */}
      <Dropdown
        options={["Observed Someone", "Personal Experience"]}
        selectedOption={observationType}
        onSelectOption={setObservationType}
        label="Type of Observation"
      />

      {/* Severity Slider */}
      <SeveritySlider value={severity} onChange={setSeverity} />

      {/* Witnessed Count Slider */}
      <WitnessSlider value={witnessedCount} onChange={setWitnessedCount} />

      {/* Location Selector */}
      <LocationSelector location={location} onLocationChange={setLocation} />

      {/* Submit Button */}
      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.submitText}>Submit Report</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 16,
    backgroundColor: "#f9f9f9",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 16,
    textAlign: "center",
  },
  submitButton: {
    marginTop: 24,
    backgroundColor: "#FF6347",
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
  },
  submitText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default Create;
