import React, { FC } from "react";
import { Button, StyleSheet, Text, TextInput, View } from "react-native";

const Login: FC = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.label}>Login :</Text>
            <TextInput style={styles.input} testID="username" />
            <TextInput style={styles.input} testID="password" />
            <Button title="Submit" testID="submit" />
        </View>
    );
};

/* Currently not covered by Jest */
const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      paddingHorizontal: 20,
    },
    label: {
      fontSize: 20,
      marginBottom: 20,
      textAlign: 'center',
    },
    input: {
      height: 40,
      margin: 12,
      borderWidth: 1,
      padding: 10,
      borderRadius: 5,
    },
  });
  

export default Login;