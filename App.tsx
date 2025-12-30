import React, { useState, useEffect } from 'react';
import { Provider as PaperProvider, MD3LightTheme, MD3DarkTheme } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { HomeScreen } from './screens/HomeScreen';
import { SettingsScreen } from './screens/SettingsScreen';
import * as SecureStore from 'expo-secure-store';
import { Appearance } from 'react-native';

export type RootStackParamList = {
  Home: undefined;
  Settings: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  const [theme, setTheme] = useState(MD3LightTheme);

  useEffect(() => {
    const colorScheme = Appearance.getColorScheme();
    setTheme(colorScheme === 'dark' ? MD3DarkTheme : MD3LightTheme);

    const loadColors = async () => {
      const primary = await SecureStore.getItemAsync('preferredPrimaryColor');
      if (primary) setTheme({ ...theme, colors: { ...theme.colors, primary } });
    };
    loadColors();
  }, []);

  return (
    <PaperProvider theme={theme}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Settings" component={SettingsScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}
