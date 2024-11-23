import React from 'react';
import { View, Button, StyleSheet } from 'react-native';

type ButtonRowProps = {
  buttons: {
    title: string;
    onPress: () => void;
  }[];
};

const ButtonRow: React.FC<ButtonRowProps> = ({ buttons }) => {
  return (
    <View style={styles.container}>
      {buttons.map((button, index) => (
        <Button key={index} title={button.title} onPress={button.onPress} />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 16,
  },
});

export default ButtonRow;
