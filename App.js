import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Provider as PaperProvider } from 'react-native-paper';

// Importação das telas
import HomeScreen from './screens/HomeScreen';
import EducationScreen from './screens/EducationScreen';
import AddDataScreen from './screens/AddDataScreen';
import ListDataScreen from './screens/ListDataScreen';
import EditDataScreen from './screens/EditDataScreen';
import RegisterScreen from './screens/RegisterScreen';
import LoginScreen from './screens/LoginScreen';
import AccountScreen from './screens/AccountScreen';
import DeviceListScreen from './screens/DeviceListScreen'; // Nova tela de listagem de dispositivos
import AddDeviceScreen from './screens/AddDeviceScreen'; // Nova tela de adicionar dispositivos
import EditDeviceScreen from './screens/EditDeviceScreen'; // Nova tela de edição de dispositivos
import AboutScreen from './screens/AboutScreen'; // Tela Sobre a Empresa

const Stack = createStackNavigator();

export default function App() {
  return (
    <PaperProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: true }}>
          <Stack.Screen name="Login" component={LoginScreen} options={{ title: 'Login' }} />
          <Stack.Screen name="Register" component={RegisterScreen} options={{ title: 'Cadastro' }} />
          <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Menu Principal' }} />
          <Stack.Screen name="Education" component={EducationScreen} options={{ title: 'Aprenda Sobre Energia' }} />
          <Stack.Screen name="AddDataScreen" component={AddDataScreen} options={{ title: 'Adicionar Dados' }} />
          <Stack.Screen name="ListDataScreen" component={ListDataScreen} options={{ title: 'Listar Dados' }} />
          <Stack.Screen name="EditDataScreen" component={EditDataScreen} options={{ title: 'Editar Dados' }} />
          <Stack.Screen name="Account" component={AccountScreen} options={{ title: 'Minha Conta' }} />
          <Stack.Screen name="DeviceList" component={DeviceListScreen} options={{ title: 'Dispositivos' }} />
          <Stack.Screen name="AddDevice" component={AddDeviceScreen} options={{ title: 'Adicionar Dispositivo' }} />
          <Stack.Screen name="EditDevice" component={EditDeviceScreen} options={{ title: 'Editar Dispositivo' }} />
          <Stack.Screen name="About" component={AboutScreen} options={{ title: 'Sobre a Empresa' }} />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}
