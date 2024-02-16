import React, { useState } from "react";
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Button, SafeAreaView, StatusBar, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#0F0C0C",
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
      color: "#008000", 
      textAlign: 'center',
      marginBottom: 20,
    },
    label: {
      fontSize: 18,
      fontWeight: "700",
      color: "#008000", 
      marginBottom: 5,
    },
    input: {
      height: 40,
      marginVertical: 5,
      borderRadius: 10,
      borderWidth: 1,
      borderColor: "#008000",
      paddingHorizontal: 10,
      color: "#008000", 
    },
    loginButton: {
      backgroundColor: '#008000',
      paddingVertical: 12,
      borderRadius: 10,
      marginTop: 20,
      alignItems: 'center',
    },
    loginButtonText: {
      color: '#fff',
      fontWeight: 'bold',
      fontSize: 18,
    },
});

export default function UserRegistration() {
    const navigation = useNavigation();
    const [userValue, setUserValue] = useState('');
    const [nameValue, setNameValue] = useState('');
    const [passwordValue, setPasswordValue] = useState('');
    const [ageValue, setAgeValue] = useState('');

    const userRegistration = async function () {
      axios.post('http://154.38.184.216:3501/auth/register', {
        userName: userValue,
        password: passwordValue,
        name: nameValue
      })
      .then(function (response) {
        console.log(response);
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
        <SafeAreaView style={styles.container}>
          <View style={styles.innerContainer}>
            <Text style={styles.title}>Registrar usuario</Text>
            <Text style={styles.label}>Usuario:</Text>
            <TextInput
              style={styles.input}
              value={userValue}
              placeholder={"Usuario"}
              onChangeText={(text) => setUserValue(text)}
              autoCapitalize={"none"}
            />
            <Text style={styles.label}>Nombre:</Text>
            <TextInput
              style={styles.input}
              value={nameValue}
              placeholder={"Nombre"}
              onChangeText={(text) => setNameValue(text)}
              autoCapitalize={"none"}
            />
            <Text style={styles.label}>Contraseña:</Text>
            <TextInput
              style={styles.input}
              value={passwordValue}
              placeholder={"Contraseña"}
              secureTextEntry
              onChangeText={(text) => setPasswordValue(text)}
            />
            <TouchableOpacity style={styles.loginButton} onPress={userRegistration}>
              <Text style={styles.loginButtonText}>Registrar usuario</Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </>
    );
};
