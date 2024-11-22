import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { List, Button } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function ListDataScreen({ navigation }) {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const storedData = JSON.parse(await AsyncStorage.getItem('data')) || [];
      setData(storedData);
    };
    fetchData();
  }, []);

  const deleteData = async (id) => {
    const updatedData = data.filter(item => item.id !== id);
    await AsyncStorage.setItem('data', JSON.stringify(updatedData));
    setData(updatedData);
  };

  return (
    <View style={styles.container}>
      {data.map((item) => (
        <List.Item
          key={item.id}
          title={item.name}
          description={item.idea}
          right={() => (
            <Button onPress={() => deleteData(item.id)}>Excluir</Button>
          )}
          onPress={() => navigation.navigate('EditData', { item })}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
});
