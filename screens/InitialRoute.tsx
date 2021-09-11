import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

const InitialRoute = () => {
  const [text, onChangeText] = useState("demo.eth");
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.circle1}></View>
      <View style={styles.circle2}></View>
      <View style={styles.circle3}></View>
      <View style={styles.circle4}></View>
      <View style={styles.circle5}></View>
      <View style={styles.addressBox}>
        <TextInput
          style={styles.inputBox}
          onChangeText={onChangeText}
          value={text}
        />
      </View>

      <TouchableOpacity
        onPress={() => navigation.navigate("Token_Balances", { data: text })}
        style={styles.button}
      >
        <Text style={styles.buttonText}>DECODE</Text>
      </TouchableOpacity>
      <Text style={styles.bottomText}>powered by Unmarshal</Text>
      <Text style={styles.versionText}>App version: beta</Text>
    </View>
  );
};

export default InitialRoute;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EEEEEE",
    alignItems: "center",
    justifyContent: "center",
  },

  circle1: {
    position: "absolute",
    width: 200,
    height: 100,
    backgroundColor: "#28FFBF",
    top: 40,
    left: -40,
    borderRadius: 50,
    opacity: 0.5,
  },

  circle2: {
    position: "absolute",
    width: 200,
    height: 100,
    backgroundColor: "#28FFBF",
    bottom: 40,
    right: -40,
    borderRadius: 50,
    opacity: 0.5,
  },

  circle3: {
    position: "absolute",
    width: 100,
    height: 100,
    backgroundColor: "#28FFBF",
    top: 40,
    right: 40,
    borderRadius: 50,
    opacity: 0.5,
    borderWidth: 1,
    borderColor: "white",
  },

  circle4: {
    position: "absolute",
    width: 100,
    height: 100,
    backgroundColor: "#28FFBF",
    bottom: 40,
    left: 40,
    borderRadius: 50,
    opacity: 0.5,
    borderWidth: 1,
    borderColor: "white",
  },

  circle5: {
    position: "absolute",
    width: 300,
    height: 80,
    backgroundColor: "#28FFBF",
    // bottom: 40,
    // left: 40,
    borderRadius: 50,
    opacity: 0.3,
    borderWidth: 1,
    borderColor: "white",
  },

  addressBox: {
    backgroundColor: "white",
    borderWidth: 3,
    borderRadius: 50,
    borderColor: "#28FFBF",
    height: 50,
    width: "70%",
    // alignItems: "center",
    // justifyContent: "center",
    shadowRadius: 10,
    shadowColor: "lightcyan",
    elevation: 10,
  },

  inputBox: {
    height: "100%",
    width: "100%",
    textAlign: "center",
    borderWidth: 0,
  },

  button: {
    backgroundColor: "#28FFBF",
    borderRadius: 5,
    height: 40,
    width: "25%",
    marginTop: "8%",
    alignItems: "center",
    justifyContent: "center",
    elevation: 10,
  },

  buttonText: {
    color: "white",
    fontWeight: "500",
  },

  versionText: {
    color: "gray",
    opacity: 0.5,
    position: "absolute",
    bottom: 35,
  },

  bottomText: {
    color: "gray",
    opacity: 0.5,
    position: "absolute",
    bottom: 10,
    fontWeight: "bold",
  },
});
