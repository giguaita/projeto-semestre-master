import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { collection, query, where, getDocs } from "firebase/firestore";
import db from '../../services/firebaseConf';


const LoginScreen = () => {


  const navigation = useNavigation();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');



  const handleLogin = async () => {
       // Banco de Dados
       const usuarios = collection(db, "usuarios");
       const q = query(usuarios, where("email", "==", email));
       
       const dados = await getDocs(q)
       dados.forEach(dado =>{
         console.log(dado.data())
         if (dado.data().password == password){
         } else{
           console.log("senha incorreta")
         }
       });

    try {
      // Recupera as credenciais armazenadas no AsyncStorage
      const storedEmail = await AsyncStorage.getItem('email');
      const storedPassword = await AsyncStorage.getItem('password');
      
      // Logs para debugging
      console.log('Stored Email:', storedEmail);
      console.log('Stored Password:', storedPassword);
      console.log('Input Email:', email);
      console.log('Input Password:', password);
  
      // Verifica se as credenciais digitadas coincidem com as armazenadas
      if (email === storedEmail && password === storedPassword) {
        // Redireciona para a tela de grupos após o login bem-sucedido
        navigation.navigate('Grupos');
      } else {
        // Exibe uma mensagem de erro se as credenciais estiverem incorretas
        Alert.alert('Erro de login', 'Email ou senha incorretos.');
      }
    } catch (error) {
      // Exibe um alerta em caso de erro ao acessar o AsyncStorage
      Alert.alert('Erro', 'Ocorreu um erro ao tentar fazer o login.');
      console.error('Error:', error);
    }
  };
  
  const handleCadastroPress = async () => {
    navigation.navigate('Cadastro');

 
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <TextInput
        style={styles.input}
        placeholder="E-mail"
        keyboardType="email-address"
        autoCapitalize="none"
        value={email}
        onChangeText={text => setEmail(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Senha"
        secureTextEntry={true}
        value={password}
        onChangeText={text => setPassword(text)}
      />
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleCadastroPress}>
        <Text style={styles.cadastroLink}>Não tem uma conta? Cadastrar-se</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
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
    marginBottom: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  cadastroLink: {
    color: 'blue',
    textDecorationLine: 'underline',
  },
});

export default LoginScreen;
