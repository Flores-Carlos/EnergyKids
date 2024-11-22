import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function EditDataScreen({ route, navigation }) {
  const { item } = route.params;
  const [name, setName] = useState(item.name);
  const [idea, setIdea] = useState(item.idea);

  const updateData = async () => {
    const existingData = JSON.parse(await AsyncStorage.getItem('data')) || [];
    const updatedData = existingData.map((dataItem) =>
      dataItem.id === item.id ? { ...dataItem, name, idea } : dataItem
    );
    await AsyncStorage.setItem('data', JSON.stringify(updatedData));
    navigation.navigate('ListData');
  };

  return (
    <View style={styles.container}>
      <TextInput
        label="Nome"
        value={name}
        onChangeText={setName}
        style={styles.input}
      />
      <TextInput
        label="Ideia Sustentável"
        value={idea}
        onChangeText={setIdea}
        style={styles.input}
      />
      <Button mode="contained" onPress={updateData} style={styles.button}>
        Atualizar Dados
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  input: {
    marginBottom: 20,
  },
  button: {
    marginTop: 10,
  },
});
