import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Image, Alert, KeyboardAvoidingView, Platform } from 'react-native';
import { ScrollView } from 'react-native';
import { TextInput, Button, Text, Menu, Divider } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function RegisterScreen({ navigation }) {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [state, setState] = useState('');
  const [randomMessage, setRandomMessage] = useState('');
  const [menuVisible, setMenuVisible] = useState(false);
  const [stateMenuVisible, setStateMenuVisible] = useState(false);

  const brazilStates = [
    'Acre', 'Alagoas', 'Amapá', 'Amazonas', 'Bahia', 'Ceará', 'Distrito Federal',
    'Espírito Santo', 'Goiás', 'Maranhão', 'Mato Grosso', 'Mato Grosso do Sul',
    'Minas Gerais', 'Pará', 'Paraíba', 'Paraná', 'Pernambuco', 'Piauí', 'Rio de Janeiro',
    'Rio Grande do Norte', 'Rio Grande do Sul', 'Rondônia', 'Roraima', 'Santa Catarina',
    'São Paulo', 'Sergipe', 'Tocantins',
  ];

  const messages = [
    "Junte-se a nós e comece a salvar o planeta!",
    "Vamos criar um futuro sustentável juntos!",
    "Sua contribuição faz toda a diferença!",
    "Comece agora a pensar no amanhã!"
  ];

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * messages.length);
    setRandomMessage(messages[randomIndex]);
  }, []);

  const validateInputs = () => {
    if (parseInt(age) <= 8) {
      Alert.alert(
        'Acesso Negado',
        'Somente crianças acima de 8 anos podem se cadastrar. Lembre-se, aprender sobre energia é para todos, mas aqui temos atividades mais avançadas!'
      );
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      Alert.alert('Erro', 'Por favor, insira um email válido.');
      return false;
    }

    if (!brazilStates.includes(state)) {
      Alert.alert('Erro', 'Por favor, selecione um estado válido do Brasil.');
      return false;
    }

    const passwordRegex = /^(?=.*[0-9])(?=.*[a-zA-Z]).{5,}$/;
    if (!passwordRegex.test(password)) {
      Alert.alert(
        'Erro',
        'A senha deve ter pelo menos 4 letras e 1 número, com um total mínimo de 5 caracteres.'
      );
      return false;
    }

    return true;
  };

  const handleRegister = async () => {
    if (!name || !age || !gender || !email || !password || !state) {
      Alert.alert('Erro', 'Preencha todos os campos.');
      return;
    }

    if (!validateInputs()) {
      return;
    }

    try {
      // Simulando cadastro no Firebase
      const users = JSON.parse(await AsyncStorage.getItem('users')) || [];
      if (users.find(user => user.email === email)) {
        Alert.alert('Erro', 'Email já cadastrado.');
        return;
      }

      const newUser = { name, age, gender, email, password, state, editCount: 0 };
      await AsyncStorage.setItem('users', JSON.stringify([...users, newUser]));

      // Salvar o usuário como logado
      await AsyncStorage.setItem('loggedUser', JSON.stringify(newUser));

      Alert.alert('Sucesso', 'Usuário cadastrado com sucesso!');
      navigation.navigate('Home');
    } catch (error) {
      console.error('Erro ao registrar o usuário:', error);
      Alert.alert('Erro', 'Ocorreu um problema ao salvar os dados.');
    }
  };

  const getGenderColor = () => {
    if (gender === 'Masculino') return '#0000FF';
    if (gender === 'Feminino') return '#FF69B4';
    if (gender === 'Outro') return '#9400D3';
    return '#CCCCCC';
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.container}>
          <Image source={require('../assets/image/logo.png')} style={styles.logo} />
          <Text variant="headlineSmall" style={styles.welcomeMessage}>
            Junte-se ao EnergyKids!
          </Text>
          <Text variant="bodyMedium" style={styles.randomMessage}>
            {randomMessage}
          </Text>
          <TextInput label="Nome" value={name} onChangeText={setName} style={styles.input} />
          <TextInput label="Idade" value={age} onChangeText={setAge} style={styles.input} keyboardType="numeric" />
          <View style={styles.dropdownContainer}>
            <Text style={styles.dropdownLabel}>Gênero:</Text>
            <Menu
              visible={menuVisible}
              onDismiss={() => setMenuVisible(false)}
              anchor={
                <Button mode="outlined" onPress={() => setMenuVisible(true)} style={styles.dropdownButton}>
                  {gender || 'Selecione o Gênero'}
                </Button>
              }
            >
              <Menu.Item onPress={() => { setGender('Masculino'); setMenuVisible(false); }} title="Masculino" />
              <Menu.Item onPress={() => { setGender('Feminino'); setMenuVisible(false); }} title="Feminino" />
              <Divider />
              <Menu.Item onPress={() => { setGender('Outro'); setMenuVisible(false); }} title="Outro" />
            </Menu>
            <View style={[styles.genderIndicator, { backgroundColor: getGenderColor() }]} />
          </View>
          <TextInput
            label="Email"
            value={email}
            onChangeText={setEmail}
            style={styles.input}
            keyboardType="email-address"
            autoCapitalize="none"
          />
          <TextInput
            label="Senha"
            value={password}
            onChangeText={setPassword}
            style={styles.input}
            secureTextEntry
          />
          <View style={styles.dropdownContainer}>
            <Text style={styles.dropdownLabel}>Estado:</Text>
            <Menu
              visible={stateMenuVisible}
              onDismiss={() => setStateMenuVisible(false)}
              anchor={
                <Button mode="outlined" onPress={() => setStateMenuVisible(true)} style={styles.dropdownButton}>
                  {state || 'Selecione o Estado'}
                </Button>
              }
            >
              {brazilStates.map((stateName) => (
                <Menu.Item
                  key={stateName}
                  onPress={() => { setState(stateName); setStateMenuVisible(false); }}
                  title={stateName}
                />
              ))}
            </Menu>
          </View>
          <Button mode="contained" onPress={handleRegister} style={styles.button}>
            Cadastrar
          </Button>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 20,
  },
  logo: {
    width: 200,
    height: 200,
    marginBottom: 20,
  },
  welcomeMessage: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  randomMessage: {
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 20,
    fontStyle: 'italic',
  },
  input: {
    marginBottom: 20,
    width: '100%',
  },
  dropdownContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    width: '100%',
  },
  dropdownLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 10,
  },
  dropdownButton: {
    flex: 1,
  },
  genderIndicator: {
    width: 20,
    height: 20,
    borderRadius: 10,
    marginLeft: 10,
    borderWidth: 1,
    borderColor: '#CCCCCC',
  },
  button: {
    marginTop: 10,
    width: '100%',
  },
});
