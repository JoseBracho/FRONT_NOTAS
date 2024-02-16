import React, { FC, useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableWithoutFeedback, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from "axios";

const styles = StyleSheet.create({
    container: {
      width: '100%',
    },
    container2: {
      width: '100%',
      padding: 20
    },
    title: {
      fontSize: 20,
      color: '#fff'
    },
    header: {
      display: 'flex', 
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between', 
      gap: 10,
      height: 55,
      paddingRight: 15,
      paddingLeft: 15,
      backgroundColor: '#000'
    },
    titleText: {
      fontSize: 24,
      color: '#000'
    },
    text: {
      fontSize: 20,
      color: '#000'
    },
    containerButtons: {
      flex: 2,
      alignItems: "center",
      marginTop: 6
    },
    button: {
      height: 50,
      width: 150,
      borderRadius: 20,
      marginTop: 5,
      marginBottom: 5,
      padding: 15,
      elevation: 2,
      display: 'flex', 
      alignItems: 'center',
      justifyContent: 'center', 
    },
    buttonOpen: {
      backgroundColor: 'red'
    },
    textStyle: {
      color: 'white',
      fontWeight: 'bold',
      textAlign: 'center',
    },
})

export default function Profile({ route }) {
    const navigation = useNavigation()
    let token = route.params.token;
    const [name, setName] = useState('');
    const [userName, setUserName] = useState('');

    useEffect(() => {
      axios.get('http://154.38.184.216:3501/auth/user', {
        headers: {
          'Authorization': route.params.token
        }
      })
      .then(function (response) {
        setName(response.data.user.name)
        setUserName(response.data.user.userName)
      })
      .catch(function (error) {
        console.log('error')
        console.log(error);
      });
    }, []);

    const deleteProfile = () => {
      axios.delete('http://154.38.184.216:3501/auth/user', {
        headers: {
          'Authorization': route.params.token
        }
      })
      .then(function (response) {
        navigation.navigate("Inicio")
      })
      .catch(function (error) {
        console.log(error);
      });
    }

    const logOut = () => {
      navigation.navigate("Inicio")
    }

    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableWithoutFeedback>
            <Text style={styles.title}>Mis notas</Text>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback onPress={logOut}>
            <Text style={styles.title}>Cerrar sesion</Text>
          </TouchableWithoutFeedback>
        </View>
        <View style={styles.container2}>
          <Text style={styles.titleText}>Datos Del Usuario</Text>
          <Text style={styles.text}>Nombre: {name}</Text>
          <Text style={styles.text}>Usuario: {userName}</Text>
          <View style={styles.containerButtons}>
            <Pressable
              style={[styles.button, styles.buttonOpen]}
              onPress={() => deleteProfile()}>
              <Text style={styles.textStyle}>Eliminar perfil</Text>
            </Pressable>
          </View>
        </View>
      </View>
    );
}
  