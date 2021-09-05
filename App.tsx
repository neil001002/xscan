import { StatusBar } from "expo-status-bar";
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";

import InitialRoute from "./screens/InitialRoute";
import Token_Balances from "./screens/Token_Balances";
import NFTs from "./screens/NFTs";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar hidden />
      {/* <StatusBar style="auto" /> */}
      <Stack.Navigator initialRouteName={"MainLayout"}>
        <Stack.Screen
          name="MainLayout"
          component={InitialRoute}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Token_Balances"
          component={Token_Balances}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="NFTs"
          component={NFTs}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
