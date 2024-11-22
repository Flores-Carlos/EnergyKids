import React, { useState } from 'react';
import { View, StyleSheet, Image, Alert, KeyboardAvoidingView, Platform } from 'react-native';
import Animated, { Easing, useSharedValue, useAnimatedStyle, withTiming } from 'react-native-reanimated';
import { TextInput, Button, Text } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [randomMessage, setRandomMessage] = useState('');
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  // Valores de animação
  const scale = useSharedValue(1);
  const rotation = useSharedValue(0);

  // Estilos animados
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { scale: withTiming(scale.value, { duration: 3000, easing: Easing.out(Easing.exp) }) },
      { rotate: `${rotation.value}deg` },
    ],
  }));

  // Frases aleatórias sobre energia sustentável
  const sustainabilityMessages = [
    "Juntos, economizamos energia!",
    "Pequenas ações, grandes mudanças!",
    "Salve o planeta, comece hoje!",
    "Cada watt conta para o futuro!",
    "Desligue a luz, acenda a consciência!",
    "Energia limpa, planeta feliz!",
    "Vamos plantar a mudança!",
    "O futuro é sustentável!",
    "Menos desperdício, mais vida!",
    "Escolha verde, escolha melhor!",
  ];

  const handleLogin = async () => {
    try {
      const users = JSON.parse(await AsyncStorage.getItem('users')) || [];
      const user = users.find(
        u => u.email === email.trim() && u.password === password.trim()
      );

      if (user) {
        setRandomMessage(sustainabilityMessages[Math.floor(Math.random() * sustainabilityMessages.length)]);
        setIsLoggingIn(true);
        scale.value = 1.5;
        rotation.value = 360;

        await AsyncStorage.setItem('loggedUser', JSON.stringify(user));

        setTimeout(() => {
          setIsLoggingIn(false);
          navigation.navigate('Home');
        }, 3000);
      } else {
        Alert.alert('Erro', 'Email ou senha inválidos.');
      }
    } catch (error) {
      console.error('Erro ao fazer login:', error);
      Alert.alert('Erro', 'Ocorreu um problema ao tentar fazer login.');
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <View style={styles.container}>
        {/* Tela de login */}
        {!isLoggingIn && (
          <View style={styles.formContainer}>
            <Image source={require('../assets/image/logo.png')} style={styles.logo} />
            <Text variant="headlineSmall" style={styles.welcomeMessage}>
              Bem-vindo ao EnergyKids!
            </Text>
            <TextInput
              label="Email"
              value={email}
              onChangeText={setEmail}
              style={styles.input}
              keyboardType="email-address"
              autoCapitalize="none"
              placeholder="Digite seu email"
            />
            <TextInput
              label="Senha"
              value={password}
              onChangeText={setPassword}
              style={styles.input}
              secureTextEntry
              placeholder="Digite sua senha"
            />
            <Button mode="contained" onPress={handleLogin} style={styles.loginButton}>
              Login
            </Button>
            <Button onPress={() => navigation.navigate('Register')} style={styles.registerButton}>
              Não tem conta? Cadastre-se
            </Button>
          </View>
        )}

        {/* Tela de animação após login */}
        {isLoggingIn && (
          <View style={styles.animationContainer}>
            <Animated.View style={animatedStyle}>
              <Image source={require('../assets/image/logo.png')} style={styles.logo} />
            </Animated.View>
            <Text style={styles.sustainabilityText}>{randomMessage}</Text>
          </View>
        )}
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#F5F5F5',
  },
  formContainer: {
    width: '100%',
    alignItems: 'center',
  },
  logo: {
    width: 180,
    height: 180,
    marginBottom: 30,
  },
  welcomeMessage: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#4CAF50',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    marginBottom: 20,
    backgroundColor: '#FFF',
  },
  loginButton: {
    marginTop: 10,
    width: '100%',
    backgroundColor: '#4CAF50',
  },
  registerButton: {
    marginTop: 15,
    textAlign: 'center',
    color: '#000',
  },
  sustainabilityText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#4CAF50',
    textAlign: 'center',
    marginTop: 20,
  },
  animationContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
