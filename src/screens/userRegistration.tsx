import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Button, SafeAreaView, StatusBar, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';

import { sharedStyles } from '../styles/sharedStyles'

export default function UserRegistration() {
    const navigation = useNavigation();
    const [userValue, setUserValue] = useState('');
    const [nameValue, setNameValue] = useState('');
    const [passwordValue, setPasswordValue] = useState('');

    const userRegistration = async function () {
      axios.post('http://154.38.184.216:3501/auth/register', {
        userName: userValue,
        password: passwordValue,
        name: nameValue
      })
      .then(function (response) {
        navigation.navigate("Inicio de sesion")
      })
      .catch(function (error) {
        console.log(error);
        Alert.alert('Error', 'Datos incorrectos. El nombre no debe contener numeros y caracter especial, La contrase;a debe superar los 7 digitos con caracter especial, por lo menos una letra minuscula y una mayuscula', [
          {
            text: 'Cancel',
            onPress: () => console.log('Cancel Pressed'),
            style: 'cancel',
          },
          {text: 'OK', onPress: () => console.log('OK Pressed')},
        ]);
      });
    };

    return (
      <>
        <StatusBar />
        <SafeAreaView style={sharedStyles.container}>
          <View style={sharedStyles.innerContainer}>
            <Text style={sharedStyles.title}>Registrar usuario</Text>
            <Text style={sharedStyles.label}>Usuario:</Text>
            <TextInput
              style={sharedStyles.input}
              value={userValue}
              placeholder={"Usuario"}
              onChangeText={(text) => setUserValue(text)}
              autoCapitalize={"none"}
            />
            <Text style={sharedStyles.label}>Nombre:</Text>
            <TextInput
              style={sharedStyles.input}
              value={nameValue}
              placeholder={"Nombre"}
              onChangeText={(text) => setNameValue(text)}
              autoCapitalize={"none"}
            />
            <Text style={sharedStyles.label}>Contraseña:</Text>
            <TextInput
              style={sharedStyles.input}
              value={passwordValue}
              placeholder={"Contraseña"}
              secureTextEntry
              onChangeText={(text) => setPasswordValue(text)}
            />
            <TouchableOpacity style={sharedStyles.authButton} onPress={userRegistration}>
              <Text style={sharedStyles.loginButtonText}>Registrar usuario</Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </>
    );
};
