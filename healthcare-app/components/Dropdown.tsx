import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Modal,
} from "react-native";

interface DropdownProps {
  options: string[];
  selectedOption: string | null;
  onSelectOption: (option: string) => void;
  label: string;
}

const Dropdown: React.FC<DropdownProps> = ({
  options,
  selectedOption,
  onSelectOption,
  label,
}) => {
  const [modalVisible, setModalVisible] = React.useState(false);

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <TouchableOpacity
        style={styles.dropdown}
        onPress={() => setModalVisible(true)}
        testID="dropdown-button"
      >
        <Text style={styles.selectedOption}>
          {selectedOption || "Select an option"}
        </Text>
      </TouchableOpacity>
      <Modal
        transparent={true}
        visible={modalVisible}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalBackground} testID="modal-background">
          <View style={styles.modalContainer}>
            <FlatList
              data={options}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.option}
                  onPress={() => {
                    onSelectOption(item);
                    setModalVisible(false);
                  }}
                >
                  <Text style={styles.optionText}>{item}</Text>
                </TouchableOpacity>
              )}
            />
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.closeText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { marginBottom: 24 },
  label: { fontSize: 16, fontWeight: "600", marginBottom: 8 },
  dropdown: {
    padding: 10,
    borderWidth: 1,
    borderColor: "#DDD",
    borderRadius: 5,
  },
  selectedOption: { fontSize: 16, color: "#000" },
  modalBackground: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContainer: {
    width: "80%",
    backgroundColor: "#FFF",
    borderRadius: 8,
    padding: 16,
  },
  option: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#EEE",
  },
  optionText: { fontSize: 16, color: "#000" },
  closeButton: {
    marginTop: 16,
    alignItems: "center",
    backgroundColor: "#FF6347",
    padding: 10,
    borderRadius: 5,
  },
  closeText: { color: "#FFF", fontWeight: "bold" },
});

export default Dropdown;
