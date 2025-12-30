import React, { useState, useEffect } from 'react';
import { View } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import * as SecureStore from 'expo-secure-store';

export const SettingsScreen = () => {
  const [token, setToken] = useState('');
  const [primaryColor, setPrimaryColor] = useState('');

  useEffect(() => {
    const load = async () => {
      const t = await SecureStore.getItemAsync('alwaysdataToken');
      const c = await SecureStore.getItemAsync('preferredPrimaryColor');
      if (t) setToken(t);
      if (c) setPrimaryColor(c);
    };
    load();
  }, []);

  const saveSettings = async () => {
    await SecureStore.setItemAsync('alwaysdataToken', token);
    await SecureStore.setItemAsync('preferredPrimaryColor', primaryColor);
    alert('Saved!');
  };

  return (
    <View style={{ padding: 16 }}>
      <TextInput
        label="API Token"
        value={token}
        onChangeText={setToken}
        mode="outlined"
      />
      <TextInput
        label="Preferred Primary Color (#HEX)"
        value={primaryColor}
        onChangeText={setPrimaryColor}
        mode="outlined"
        style={{ marginTop: 16 }}
      />
      <Button onPress={saveSettings} style={{ marginTop: 16 }}>Save Settings</Button>
    </View>
  );
};
