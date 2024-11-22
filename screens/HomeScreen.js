import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text, Image } from 'react-native';

export default function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      {/* Logo */}
      <View style={styles.logoContainer}>
        <Image source={require('../assets/image/logo.png')} style={styles.logo} />
      </View>

      {/* Botões */}
      <TouchableOpacity
        style={[styles.button, styles.devicesButton]}
        onPress={() => navigation.navigate('DeviceList')}
      >
        <Text style={styles.buttonText}>Dispositivos</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.button, styles.educationButton]}
        onPress={() => navigation.navigate('Education')}
      >
        <Text style={styles.buttonText}>Aprenda Sobre Energia</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.button, styles.aboutButton]}
        onPress={() => navigation.navigate('About')}
      >
        <Text style={styles.buttonText}>Sobre a Empresa</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.button, styles.accountButton]}
        onPress={() => navigation.navigate('Account')}
      >
        <Text style={styles.buttonText}>Minha Conta</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    padding: 20,
  },
  logoContainer: {
    marginBottom: 30,
    alignItems: 'center',
  },
  logo: {
    width: 150,
    height: 150,
  },
  button: {
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 20,
    width: '80%',
    elevation: 5,
  },
  devicesButton: {
    backgroundColor: '#FFCC80', // Cor laranja amigável
  },
  educationButton: {
    backgroundColor: '#81C784', // Cor verde clara
  },
  aboutButton: {
    backgroundColor: '#FFD54F', // Cor amarela para destacar
  },
  accountButton: {
    backgroundColor: '#64B5F6', // Cor azul clara
  },
  buttonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
