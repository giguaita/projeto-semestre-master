import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import Group from '../src/SecondaryScreens/Group';
import ChatScreen from '../src/Components/ChatScreen';
import LoginScreen from '../src/SecondaryScreens/Login/LoginScreen';
import CadastroScreen from '../src/SecondaryScreens/Login/CadastroScreen'; // Importa a tela de cadastro

const Stack = createStackNavigator();

export default function StackRoutes() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        {/* Define a tela de login como a tela inicial */}
        <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
        {/* Adiciona a tela de cadastro */}
        <Stack.Screen name="Cadastro" component={CadastroScreen} options={{ title: 'Cadastro' }} />
        {/* Adiciona as outras telas */}
        <Stack.Screen name="Grupos" component={Group} options={{ title: 'Conversas', headerBackTitle: 'Voltar' }} />
        <Stack.Screen name="Chat" component={ChatScreen} options={{ title: 'Chat', headerBackTitle: 'Voltar' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
