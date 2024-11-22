import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Alert, StyleSheet, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Button, Card, Title, Paragraph } from 'react-native-paper';

export default function DeviceListScreen({ navigation }) {
  const [devices, setDevices] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const loadUserAndDevices = async () => {
      try {
        const loggedUser = JSON.parse(await AsyncStorage.getItem('loggedUser')); // Usuário logado
        const storedDevices = JSON.parse(await AsyncStorage.getItem('devices')) || []; // Dispositivos cadastrados
        setUser(loggedUser);
        setDevices(storedDevices);
      } catch (error) {
        console.error('Erro ao carregar dispositivos:', error);
      }
    };

    loadUserAndDevices();
  }, []);

  const deleteDevice = async (deviceId) => {
    const deviceToDelete = devices.find(device => device.id === deviceId);

    if (deviceToDelete.userId !== user.id) {
      Alert.alert('Erro', 'Você só pode excluir dispositivos que você cadastrou.');
      return;
    }

    const updatedDevices = devices.filter(device => device.id !== deviceId);
    setDevices(updatedDevices);
    await AsyncStorage.setItem('devices', JSON.stringify(updatedDevices));
    Alert.alert('Sucesso', 'Dispositivo excluído!');
  };

  const renderDevice = ({ item }) => (
    <Card style={styles.card}>
      <Card.Content>
        <Title style={styles.deviceName}>{item.deviceName}</Title>
        <Paragraph style={styles.deviceInfo}>📍 Postado por: {item.userName}</Paragraph>
        <Paragraph style={styles.deviceInfo}>⚡ Voltagem: {item.voltage} watts</Paragraph>
        <Paragraph style={styles.deviceInfo}>📝 Descrição: {item.description}</Paragraph>
        <Paragraph style={styles.dateTime}>
          ⏰ Adicionado em: {item.dateTime}
        </Paragraph>
      </Card.Content>
      {item.userId === user?.id && (
        <Card.Actions>
          <Button
            mode="outlined"
            onPress={() => navigation.navigate('EditDevice', { device: item })}
            style={styles.editButton}
          >
            Editar
          </Button>
          <Button
            mode="outlined"
            onPress={() => deleteDevice(item.id)}
            style={styles.deleteButton}
          >
            Excluir
          </Button>
        </Card.Actions>
      )}
    </Card>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={devices}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderDevice}
        ListEmptyComponent={<Text style={styles.emptyText}>Nenhum dispositivo cadastrado.</Text>}
      />
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate('AddDevice')}
      >
        <Text style={styles.addButtonText}>+ Adicionar Dispositivo</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F0F8FF', // Azul claro
  },
  card: {
    marginVertical: 10,
    borderRadius: 15,
    backgroundColor: '#FFFFFF',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },
  deviceName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2E8B57', // Verde escuro
  },
  deviceInfo: {
    fontSize: 14,
    color: '#333333',
    marginBottom: 5,
  },
  dateTime: {
    fontSize: 12,
    color: '#777777',
    marginTop: 10,
    fontStyle: 'italic',
  },
  editButton: {
    marginHorizontal: 5,
    borderColor: '#1E90FF',
    borderWidth: 1,
    borderRadius: 5,
  },
  deleteButton: {
    marginHorizontal: 5,
    borderColor: '#DC143C',
    borderWidth: 1,
    borderRadius: 5,
  },
  addButton: {
    backgroundColor: '#00BFFF', // Azul claro vibrante
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  addButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
  emptyText: {
    textAlign: 'center',
    fontSize: 16,
    color: '#777777',
    marginTop: 20,
  },
});
