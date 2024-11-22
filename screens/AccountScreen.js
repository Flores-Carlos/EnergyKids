import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, Alert, ScrollView, TouchableOpacity, Image } from 'react-native';
import { TextInput, Button, Divider, Avatar } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { launchImageLibrary } from 'react-native-image-picker';

export default function AccountScreen({ navigation }) {
  const [user, setUser] = useState(null);
  const [newEmail, setNewEmail] = useState('');
  const [password, setPassword] = useState('');
  const [editCount, setEditCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [profileImage, setProfileImage] = useState(null);

  useEffect(() => {
    const loadUserData = async () => {
      try {
        const storedUser = JSON.parse(await AsyncStorage.getItem('loggedUser'));
        if (storedUser) {
          setUser(storedUser);
          setEditCount(storedUser.editCount || 0);
          setProfileImage(storedUser.profileImage || null); // Carregar a imagem de perfil
        } else {
          Alert.alert('Erro', 'Nenhum usuário encontrado.');
          navigation.navigate('Login');
        }
      } catch (error) {
        console.error('Erro ao carregar os dados do usuário:', error);
      } finally {
        setLoading(false);
      }
    };
    loadUserData();
  }, [navigation]);

  const saveChanges = async () => {
    if (editCount >= 5) {
      Alert.alert('Erro', 'Você atingiu o limite de 5 alterações.');
      return;
    }

    if (!newEmail.trim() && !password.trim()) {
      Alert.alert('Erro', 'Preencha pelo menos um campo para alterar.');
      return;
    }

    try {
      const updatedUser = {
        ...user,
        email: newEmail.trim() || user.email,
        password: password.trim() || user.password,
        editCount: editCount + 1,
        profileImage: profileImage || user.profileImage, // Salvar a imagem de perfil
      };

      setUser(updatedUser);
      setEditCount(editCount + 1);
      await AsyncStorage.setItem('loggedUser', JSON.stringify(updatedUser));

      Alert.alert('Sucesso', 'Alterações salvas com sucesso!');
    } catch (error) {
      console.error('Erro ao salvar alterações:', error);
      Alert.alert('Erro', 'Ocorreu um problema ao salvar os dados.');
    }
  };

  const selectProfileImage = async () => {
    const result = await launchImageLibrary({
      mediaType: 'photo',
      maxWidth: 300,
      maxHeight: 300,
      quality: 0.7,
    });

    if (result.didCancel) {
      return;
    }

    if (result.assets && result.assets.length > 0) {
      const image = result.assets[0].uri;
      setProfileImage(image);
    } else {
      Alert.alert('Erro', 'Não foi possível selecionar a imagem.');
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Carregando...</Text>
      </View>
    );
  }

  if (!user) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.errorText}>Erro: Nenhum usuário encontrado.</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Avatar e Saudação */}
      <View style={styles.header}>
        <TouchableOpacity onPress={selectProfileImage}>
          {profileImage ? (
            <Image source={{ uri: profileImage }} style={styles.profileImage} />
          ) : (
            <Avatar.Text size={80} label={user.name.charAt(0)} style={styles.avatar} />
          )}
        </TouchableOpacity>
        <Text style={styles.greeting}>Olá, {user.name}!</Text>
      </View>

      <Divider style={styles.divider} />

      {/* Dados do Usuário */}
      <Text style={styles.label}>Nome</Text>
      <Text style={styles.readOnlyField}>{user.name}</Text>

      <Text style={styles.label}>Idade</Text>
      <Text style={styles.readOnlyField}>{user.age}</Text>

      <Text style={styles.label}>Gênero</Text>
      <Text style={styles.readOnlyField}>{user.gender}</Text>

      <Text style={styles.label}>Email Atual</Text>
      <Text style={styles.readOnlyField}>{user.email}</Text>

      {/* Alterar Email */}
      <Text style={styles.label}>Novo Email</Text>
      <TextInput
        label="Digite o novo email"
        value={newEmail}
        onChangeText={setNewEmail}
        style={styles.input}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      {/* Alterar Senha */}
      <Text style={styles.label}>Senha</Text>
      <TextInput
        label="Digite a nova senha"
        value={password}
        onChangeText={setPassword}
        style={styles.input}
        secureTextEntry
      />

      {/* Contador de Edições */}
      <Text style={styles.editCount}>
        Você pode realizar {5 - editCount} alteração(ões) restante(s).
      </Text>

      {/* Botão Salvar */}
      <Button mode="contained" onPress={saveChanges} style={styles.saveButton}>
        Salvar Alterações
      </Button>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#F5F5F5',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
  },
  loadingText: {
    fontSize: 18,
    color: '#777',
  },
  errorText: {
    fontSize: 18,
    color: 'red',
  },
  header: {
    alignItems: 'center',
    marginBottom: 20,
  },
  avatar: {
    backgroundColor: '#4CAF50',
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  greeting: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 10,
    color: '#333',
  },
  divider: {
    marginVertical: 20,
    height: 1,
    backgroundColor: '#DDD',
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  readOnlyField: {
    fontSize: 16,
    color: '#555',
    backgroundColor: '#E0E0E0',
    padding: 10,
    borderRadius: 5,
    marginBottom: 20,
  },
  input: {
    marginBottom: 20,
    backgroundColor: '#FFFFFF',
  },
  editCount: {
    fontSize: 14,
    color: '#555',
    textAlign: 'center',
    marginBottom: 20,
  },
  saveButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 10,
    borderRadius: 5,
  },
});
