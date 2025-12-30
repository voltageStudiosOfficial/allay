import React, { useEffect, useState } from 'react';
import { FlatList, RefreshControl } from 'react-native';
import { Text, Card, Button } from 'react-native-paper';
import axios from 'axios';
import * as SecureStore from 'expo-secure-store';

export const HomeScreen = ({ navigation }: any) => {
  const [apps, setApps] = useState<any[]>([]);
  const [refreshing, setRefreshing] = useState(false);

  const fetchApps = async () => {
    setRefreshing(true);
    const token = await SecureStore.getItemAsync('alwaysdataToken');
    if (!token) return;
    axios.get('https://api.alwaysdata.com/v1/apps/', {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(res => setApps(res.data))
    .catch(err => console.error(err))
    .finally(() => setRefreshing(false));
  };

  useEffect(() => {
    fetchApps();
  }, []);

  return (
    <FlatList
      data={apps}
      keyExtractor={(item) => item.id.toString()}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={fetchApps} />
      }
      renderItem={({ item }) => (
        <Card style={{ margin: 8 }}>
          <Card.Title title={item.name} />
          <Card.Content>
            <Text>Status: {item.status}</Text>
          </Card.Content>
          <Card.Actions>
            <Button onPress={() => console.log('Restart', item.name)}>Restart</Button>
          </Card.Actions>
        </Card>
      )}
    />
  );
};
