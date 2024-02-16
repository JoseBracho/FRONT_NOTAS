import React from "react";
import { View, Text, StyleSheet, Button, SafeAreaView, StatusBar, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { sharedStyles } from '../styles/sharedStyles'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000000",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#008000", 
    textAlign: 'center',
    marginBottom: 20,
  },
  text: {
    fontSize: 20,
    color: "#137300",
    fontWeight: "700",
    marginBottom: 20,
  },
  containerButtons: {
    marginTop: 20,
    paddingBottom: 20,
  }
});

export default function Home() {
  const navigation = useNavigation();
  return (
    <>
      <StatusBar />
      <SafeAreaView style={styles.container}>
        <>
          <Text style={styles.title}>Bienvenido</Text>
          <Text style={styles.text}>Iniciar sesión o registrar usuario</Text>
        <TouchableOpacity style={sharedStyles.authButton} onPress={() => navigation.navigate("Inicio de sesion")}>
           <Text style={sharedStyles.loginButtonText}>Iniciar sesión</Text>
        </TouchableOpacity>
        <TouchableOpacity style={sharedStyles.authButton} onPress={() => navigation.navigate("Registro")}>
           <Text style={sharedStyles.loginButtonText}>Registrar</Text>
        </TouchableOpacity>
        </>
      </SafeAreaView>
    </>
  );
}