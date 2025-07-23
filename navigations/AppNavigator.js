// AppNavigator.js
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import { useEffect, useState, useContext } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

import Login from "../screens/onboarding/Login/Login";
import OnboardingScreen from "../screens/onboarding/OnboardingScreen";
import DrawerNavigator from "../navigations/DrawerNavigator";
import { AuthContext } from "../context/AuthContext";
import Register from "../screens/onboarding/Register/Register";

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  const [isLoading, setLoading] = useState(true);
  const [hasOnboarded, setHasOnboard] = useState(false);
  const { token } = useContext(AuthContext); // 👈 Pull token from context

  useEffect(() => {
    const checkOnboarding = async () => {
      const value = await AsyncStorage.getItem("hasOnboarded");
      setHasOnboard(value === "true");
      setLoading(false);
    };
    checkOnboarding();
  }, []);

  if (isLoading) return null;

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {!hasOnboarded ? (
          // Onboarding screen
          <Stack.Screen name="Onboarding" component={OnboardingScreen} />
        ) : !token ? (
          // Not authenticated
          <>
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Register" component={Register} />
          </>
        ) : (
          // Authenticated, show dashboard with drawer
          <Stack.Screen name="MainApp" component={DrawerNavigator} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
