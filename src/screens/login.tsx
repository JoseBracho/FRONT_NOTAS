import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, SafeAreaView, StatusBar, Modal, ActivityIndicator, Alert } from 'react-native';
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
    <SafeAreaView style={sharedStyles.container}>
      <StatusBar barStyle="light-content" />
      <View style={sharedStyles.innerContainer}>
        <Text style={sharedStyles.title}>Iniciar sesión</Text>
        <Text style={sharedStyles.label}>Usuario:</Text>
        <TextInput
          style={sharedStyles.input}
          onChangeText={setUserName}
          value={userName}
        />
        <Text style={sharedStyles.label}>Contraseña:</Text>
        <TextInput
          style={sharedStyles.input}
          secureTextEntry={true}
          onChangeText={setPassword}
          value={password}
        />
        <TouchableOpacity style={sharedStyles.authButton} onPress={handleLogin}>
          <Text style={sharedStyles.loginButtonText}>Iniciar sesión</Text>
        </TouchableOpacity>
      </View>
      <Modal
        transparent={true}
        visible={isLoading}
        animationType='fade'
        onRequestClose={() => setIsLoading(false)}
      >
        <View style={sharedStyles.modalContainer}>
          <View style={sharedStyles.modalContent}>
            <ActivityIndicator size='large' color='#008000' />
            <Text>Cargando...</Text>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}
export default LoginScreen;