import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function EditDeviceScreen({ route, navigation }) {
  const { device } = route.params;
  const [deviceName, setDeviceName] = useState(device.deviceName);
  const [voltage, setVoltage] = useState(device.voltage);
  const [description, setDescription] = useState(device.description);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const loadLoggedUser = async () => {
      const loggedUser = JSON.parse(await AsyncStorage.getItem('loggedUser'));
      setUser(loggedUser);

      // Verificar se o dispositivo pertence ao usuário logado
      if (device.userId !== loggedUser?.id) {
        Alert.alert(
          'Erro',
          'Você não tem permissão para editar este dispositivo.',
          [{ text: 'OK', onPress: () => navigation.goBack() }]
        );
      }
    };

    loadLoggedUser();
  }, [device, navigation]);

  const handleEditDevice = async () => {
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
      const devices = JSON.parse(await AsyncStorage.getItem('devices')) || [];

      // Atualiza o dispositivo
      const updatedDevices = devices.map(d =>
        d.id === device.id
          ? { ...d, deviceName: deviceName.trim(), voltage: voltage.trim(), description: description.trim() }
          : d
      );

      // Salva a lista atualizada no AsyncStorage
      await AsyncStorage.setItem('devices', JSON.stringify(updatedDevices));

      Alert.alert('Sucesso', 'Dispositivo atualizado com sucesso!');
      navigation.goBack();
    } catch (error) {
      console.error('Erro ao atualizar dispositivo:', error);
      Alert.alert('Erro', 'Ocorreu um problema ao atualizar o dispositivo.');
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
      <Button mode="contained" onPress={handleEditDevice} style={styles.button}>
        Salvar Alterações
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
