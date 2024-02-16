import React from "react";
import { View, Text, StyleSheet, Button, SafeAreaView, StatusBar } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#fff",
      alignItems: "center",
      justifyContent: "center",
    },
    title: {
      fontSize: 40,
      fontWeight: "bold",
    },
    text: {
      fontSize: 20,
      fontWeight: "700",
    },
    containerButtons: {
      marginTop: 20,
      paddingBottom: 20,
    }
  })

export default function Home() {
    const navigation = useNavigation()
    return (
      <>
        <StatusBar />
        <SafeAreaView style={styles.container}>
          <>
            <Text style={styles.title}>Bienvenido</Text>
            <Text style={styles.text}>Iniciar sesión o registrar usuario</Text>
            <View style={styles.containerButtons}>
              <Button
                title="Iniciar Sesión" 
                onPress={() => navigation.navigate("Inicio de sesion")}
              />
            </View>
            <View style={styles.containerButtons}>
              <Button
                title="Registrar" 
                color="#f194ff"
                onPress={() => navigation.navigate("Registro")}
              />
            </View>
          </>
        </SafeAreaView>
      </>
    )
}
