import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import db from '../../services/firebaseConf';
import { collection, addDoc } from "firebase/firestore"; 

const CadastroScreen = () => {
  const navigation = useNavigation(); // Obtém o objeto de navegação

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleCadastro = async () => {
    try {
      // Verifica se o e-mail contém "@ifpr" em algum ponto
      const ifprRegex = /@.*ifpr/i;
      if (!ifprRegex.test(email)) {
        Alert.alert('Erro de cadastro', 'Por favor, insira um e-mail válido do IFPR.');
        return; // Impede o cadastro se o e-mail não for válido
      }

      // Salva o e-mail e a senha no AsyncStorage
      await AsyncStorage.setItem('email', email);
      await AsyncStorage.setItem('password', password);
  
      // Redireciona o usuário para a tela de login com e-mail e senha memorizados
      navigation.navigate("Login", { email: email, password: password });
    } catch (error) {
      // Exibe um alerta em caso de erro ao acessar o AsyncStorage
      Alert.alert('Erro', 'Ocorreu um erro ao tentar fazer o cadastro.');
      console.error('Error:', error);
    }
    // Add banco de dados
    try {
      const docRef = await addDoc(collection(db,"usuarios" ), {
        email,
        password
     });
    console.log("Document written with ID: ", docRef.id);} 
    catch (e) {
      console.error("Error adding document: ", e);
    }
  };
  

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cadastro</Text>
      <TextInput
        style={styles.input}
        placeholder="E-mail"
        value={email}
        onChangeText={text => setEmail(text)}
        keyboardType="email-address" // Define o teclado para facilitar a entrada de e-mails
        autoCapitalize="none" // Impede que o texto seja automaticamente capitalizado
      />
      <TextInput
        style={styles.input}
        placeholder="Senha"
        secureTextEntry={true}
        value={password}
        onChangeText={text => setPassword(text)}
      />
      <TouchableOpacity style={styles.button} onPress={handleCadastro}>
        <Text style={styles.buttonText}>Cadastrar</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start', // Alinha os itens ao topo do contêiner
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingTop: 50, // Adiciona um espaçamento superior para mover o conteúdo para baixo
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '80%',
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginBottom: 10,
    paddingLeft: 10,
  },
  button: {
    width: '80%',
    height: 40,
    backgroundColor: '#007bff',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default CadastroScreen;
