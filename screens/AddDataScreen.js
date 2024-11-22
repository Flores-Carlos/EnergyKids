import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function AddDataScreen({ navigation }) {
  const [name, setName] = useState('');
  const [idea, setIdea] = useState('');

  const saveData = async () => {
    try {
      const existingData = JSON.parse(await AsyncStorage.getItem('data')) || [];
      const newData = [...existingData, { id: Date.now(), name, idea }];
      await AsyncStorage.setItem('data', JSON.stringify(newData));
      navigation.navigate('ListData');
    } catch (error) {
      console.error(error);
    }
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
      <Button mode="contained" onPress={saveData} style={styles.button}>
        Salvar Dados
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