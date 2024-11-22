import React, { useState } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function AddDeviceScreen({ navigation }) {
  const [deviceName, setDeviceName] = useState('');
  const [voltage, setVoltage] = useState('');
  const [description, setDescription] = useState('');

  const handleAddDevice = async () => {
    if (!deviceName.trim() || !voltage.trim() || !description.trim()) {
      Alert.alert('Erro', 'Preencha todos os campos.');
      return;
    }

    // Validação de voltagem
    if (isNaN(voltage) || Number(voltage) <= 0) {
      Alert.alert('Erro', 'A voltagem deve ser um número válido e maior que 0.');
      return;
    }

    try {
      // Recupera o usuário logado
      const loggedUser = JSON.parse(await AsyncStorage.getItem('loggedUser'));

      if (!loggedUser) {
        Alert.alert('Erro', 'Nenhum usuário logado encontrado.');
        return;
      }

      // Data e horário atuais
      const currentDateTime = new Date().toLocaleString();

      // Recupera dispositivos já cadastrados
      const devices = JSON.parse(await AsyncStorage.getItem('devices')) || [];

      // Novo dispositivo
      const newDevice = {
        id: Date.now(), // ID único do dispositivo
        userId: loggedUser.id, // ID do usuário logado
        userName: loggedUser.name, // Nome do usuário logado
        deviceName: deviceName.trim(),
        voltage: voltage.trim(),
        description: description.trim(),
        dateTime: currentDateTime, // Salva data e horário
      };

      // Atualiza a lista de dispositivos
      const updatedDevices = [...devices, newDevice];
      await AsyncStorage.setItem('devices', JSON.stringify(updatedDevices));

      Alert.alert('Sucesso', 'Dispositivo cadastrado com sucesso!');
      navigation.goBack(); // Retorna para a tela anterior
    } catch (error) {
      console.error('Erro ao cadastrar dispositivo:', error);
      Alert.alert('Erro', 'Ocorreu um problema ao cadastrar o dispositivo.');
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        label="Nome do Dispositivo"
        value={deviceName}
        onChangeText={setDeviceName}
        style={styles.input}
      />
      <TextInput
        label="Voltagem (em watts)"
        value={voltage}
        onChangeText={setVoltage}
        style={styles.input}
        keyboardType="numeric"
      />
      <TextInput
        label="Descrição"
        value={description}
        onChangeText={setDescription}
        style={styles.input}
      />
      <Button mode="contained" onPress={handleAddDevice} style={styles.button}>
        Cadastrar
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F5F5F5',
  },
  input: {
    marginBottom: 20,
    backgroundColor: '#FFFFFF',
  },
  button: {
    marginTop: 20,
    backgroundColor: '#4CAF50',
  },
});
