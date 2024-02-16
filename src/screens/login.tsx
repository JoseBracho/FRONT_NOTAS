import React, { useState } from "react";
import { View, Text, StyleSheet, TextInput, TouchableOpacity, SafeAreaView, StatusBar, Modal, ActivityIndicator, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { login } from '../api/api';
import { sharedStyles } from '../styles/sharedStyles'

const LoginScreen = () => {
  const navigation = useNavigation();
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async () => {
    setIsLoading(true);
    try {
      const response = await login(userName, password);
      setIsLoading(false);
      setPassword('');
      setUserName('');
      navigation.navigate("Categorias", { token: response.data.token });
    } catch (error) {
      setIsLoading(false);
      Alert.alert('Error', 'Datos invalido!', [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {text: 'OK', onPress: () => console.log('OK Pressed')},
      ]);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      <View style={styles.innerContainer}>
        <Text style={styles.title}>Iniciar sesión</Text>
        <Text style={styles.label}>Usuario:</Text>
        <TextInput
          style={styles.input}
          onChangeText={setUserName}
          value={userName}
        />
        <Text style={styles.label}>Contraseña:</Text>
        <TextInput
          style={styles.input}
          secureTextEntry={true}
          onChangeText={setPassword}
          value={password}
        />
        <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
          <Text style={styles.loginButtonText}>Iniciar sesión</Text>
        </TouchableOpacity>
      </View>
      <Modal
        transparent={true}
        visible={isLoading}
        animationType='fade'
        onRequestClose={() => setIsLoading(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <ActivityIndicator size='large' color='#008000' />
            <Text>Cargando...</Text>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create(
  {
    container: {
      flex: 1,
      backgroundColor: "#000000",
      alignItems: 'center',
      justifyContent: 'center',
    },
    innerContainer: {
      width: '80%',
      maxWidth: 400,
    },
    title: {
      fontSize: 30,
      fontWeight: "bold",
      color: "#CCCCCC",
      textAlign: 'center',
      marginBottom: 20,
    },
    label: {
      fontSize: 18,
      fontWeight: "700",
      color: "#CCCCCC",
      marginBottom: 5,
    },
    input: {
      height: 40,
      marginVertical: 5,
      borderRadius: 10,
      borderWidth: 1,
      borderColor: "#CCCCCC",
      paddingHorizontal: 10,
      color: "#CCCCCC",
    },
    loginButton: {
      backgroundColor: '#008000',
      paddingVertical: 12,
      borderRadius: 10,
      marginTop: 20,
      alignItems: 'center',
    },
    loginButtonText: {
      color: '#CCCCCC',
      fontWeight: 'bold',
      fontSize: 18,
    },
    modalContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
      backgroundColor: '#FFFFFF',
      borderRadius: 10,
      padding: 20,
    },
  }
);

export default LoginScreen;
