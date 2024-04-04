import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, TouchableWithoutFeedback, Keyboard } from 'react-native';

// Componente funcional ChatScreen
export default function ChatScreen({ route }) {
  const [message, setMessage] = useState(''); // Estado para armazenar a mensagem digitada
  const [messages, setMessages] = useState([]); // Estado para armazenar as mensagens da conversa
  const [showAlunoMessages, setShowAlunoMessages] = useState(false); // Estado para controlar o filtro de mensagens de alunos
  const [showProfessorMessages, setShowProfessorMessages] = useState(false); // Estado para controlar o filtro de mensagens de professores
  const [showAllMessages, setShowAllMessages] = useState(false); // Estado para controlar se todas as mensagens devem ser exibidas

  // Função para enviar mensagem
  const sendMessage = () => {
    if (message.trim() === '') return; // Verifica se a mensagem está vazia

    // Obtém a data e hora atual
    const currentTime = new Date().toLocaleString();

    // Cria uma nova mensagem com um id único, o texto da mensagem digitada, a hora e o remetente
    const newMessage = {
      id: messages.length + 1, // Incrementa o id com base no número de mensagens existentes
      text: message,
      sender: 'Professor 1', // Por padrão, as mensagens serão do professor
      time: currentTime, // Adiciona a hora atual à mensagem
    };

    // Adiciona a nova mensagem à lista existente de mensagens
    setMessages([...messages, newMessage]);
    setMessage(''); // Limpa a caixa de entrada da mensagem
  };

  useEffect(() => {
    // Simulação de uma conversa pré-existente entre um professor e três alunos
    setMessages([
      { id: 1, text: 'Olá alunos, hoje não terá aula', sender: 'Professor 1', time: '10:00 AM' },
      { id: 2, text: 'Ah que pena!!', sender: 'Aluno 1', time: '10:05 AM' },
      { id: 3, text: 'Que bom, mais tempo para o TCC', sender: 'Aluno 2', time: '10:10 AM' },
      { id: 4, text: 'Aeee boteco hoje', sender: 'Aluno 3', time: '10:15 AM' },
    ]);
  }, []);

  // Função para filtrar as mensagens de alunos
  const filterAlunoMessages = () => {
    setShowAlunoMessages(true); // Define o estado para exibir apenas as mensagens de alunos
    setShowProfessorMessages(false); // Garante que o filtro de mensagens de professores esteja desativado
    setShowAllMessages(false); // Desativa o filtro de exibição de todas as mensagens
  };

  // Função para filtrar as mensagens de professores
  const filterProfessorMessages = () => {
    setShowProfessorMessages(true); // Define o estado para exibir apenas as mensagens de professores
    setShowAlunoMessages(false); // Garante que o filtro de mensagens de alunos esteja desativado
    setShowAllMessages(false); // Desativa o filtro de exibição de todas as mensagens
  };

  // Função para mostrar todas as mensagens
  const filterAllMessages = () => {
    setShowAllMessages(true); // Define o estado para exibir todas as mensagens
    setShowAlunoMessages(false); // Garante que o filtro de mensagens de alunos esteja desativado
    setShowProfessorMessages(false); // Garante que o filtro de mensagens de professores esteja desativado
  };

  // Renderização do componente ChatScreen
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={{ flex: 1 }}>
        {/* Container para exibir as mensagens da conversa */}
        <View style={styles.chatContainer}>
          {/* Mapeia e exibe todas as mensagens armazenadas */}
          {messages.map((msg) => (
            // Verifica se o filtro de mensagens de alunos, de professores ou de todas está ativado e se o remetente corresponde ao filtro
            ((!showAlunoMessages && !showProfessorMessages && !showAllMessages) || (showAlunoMessages && msg.sender.includes('Aluno')) || (showProfessorMessages && msg.sender.includes('Professor')) || showAllMessages) && (
              <View key={msg.id} style={[styles.messageContainer, msg.sender === 'Professor 1' ? styles.professorMessageContainer : styles.studentMessageContainer]}>
                {/* Exibe o remetente, a mensagem e a hora */}
                <Text style={[styles.messageText, msg.sender === 'Professor 1' ? styles.professorMessageText : styles.studentMessageText]}>{msg.sender}: {msg.text}</Text>
                <Text style={styles.messageTime}>{msg.time}</Text>
              </View>
            )
          ))}
          {/* Exibe a data atual no final da conversa */}
          <Text style={styles.conversationDate}>Hoje, {new Date().toLocaleDateString()}</Text>
        </View>

        {/* Container para a caixa de entrada da mensagem */}
        <View style={styles.inputContainer}>
          {/* Componente TextInput para entrada de texto */}
          <TextInput
            style={styles.input}
            placeholder="Digite sua mensagem..."
            value={message}
            onChangeText={(text) => setMessage(text)}
          />
          
          {/* Botão para enviar a mensagem */}
          <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
            <Text style={styles.sendButtonText}>Enviar</Text>
          </TouchableOpacity>
        </View>

        {/* Container para os botões "Alunos", "Professores" e "Geral" */}
        <View style={styles.buttonContainer}>
          {/* Botão para filtrar mensagens de alunos */}
          <TouchableOpacity style={[styles.button, styles.alunosButton]} onPress={filterAlunoMessages}>
            <Text style={styles.buttonText}>Alunos</Text>
          </TouchableOpacity>
          {/* Botão para filtrar mensagens de professores */}
          <TouchableOpacity style={[styles.button, styles.professoresButton]} onPress={filterProfessorMessages}>
            <Text style={styles.buttonText}>Professores</Text>
          </TouchableOpacity>
          {/* Botão para mostrar todas as mensagens */}
          <TouchableOpacity style={[styles.button, styles.geralButton]} onPress={filterAllMessages}>
            <Text style={styles.buttonText}>Geral</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

// Estilos CSS para o componente ChatScreen
const styles = StyleSheet.create({
  // Estilos para o container das mensagens da conversa
  chatContainer: {
    flex: 1,
    padding: 10,
  },
  // Estilos para o container de cada mensagem
  messageContainer: {
    padding: 10,
    marginVertical: 5,
    maxWidth: '80%',
    borderRadius: 10,
  },
  // Estilos para as mensagens do professor
  professorMessageContainer: {
    backgroundColor: '#DCF8C6',
    alignSelf: 'flex-end', // Alinha as mensagens do professor à direita
  },
  // Estilos para as mensagens dos alunos
  studentMessageContainer: {
    backgroundColor: '#E5E5EA',
    alignSelf: 'flex-start', // Alinha as mensagens dos alunos à esquerda
  },
  // Estilos para o texto das mensagens
  messageText: {
    fontWeight: 'bold',
    color: '#0B0D0A',
  },
  // Estilos para a hora das mensagens
  messageTime: {
    color: '#808080',
    fontSize: 12,
    marginTop: 5,
  },
  // Estilos para o texto dos botões
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  // Estilos para o container da caixa de entrada da mensagem
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingBottom: 10,
    borderTopWidth: 1,
    borderTopColor: '#ccc',
  },
  // Estilos para a caixa de entrada de texto
  input: {
    flex: 1,
    height: 50,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 20,
    paddingHorizontal: 15,
    marginRight: 10,
  },
  // Estilos para o botão de enviar mensagem
  sendButton: {
    backgroundColor: '#0B006B',
    borderRadius: 30,
    paddingVertical: 14,
    paddingHorizontal: 20,
  },
  // Estilos para o texto do botão de enviar mensagem
  sendButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  // Estilos para o container dos botões "Alunos", "Professores" e "Geral"
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  // Estilos para os botões "Alunos", "Professores" e "Geral"
  button: {
    flex: 1,
    height: 50,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 5,
  },
  // Estilos específicos para o botão "Alunos"
  alunosButton: {
    backgroundColor: 'orange',
  },
  // Estilos específicos para o botão "Professores"
  professoresButton: {
    backgroundColor: 'orange',
  },
  // Estilos específicos para o botão "Geral"
  geralButton: {
    backgroundColor: 'blue',
  },
  // Estilos para a data da conversa
  conversationDate: {
    textAlign: 'center',
    marginTop: 10,
    marginBottom: 20,
    color: '#808080',
    fontStyle: 'italic',
  },
});
