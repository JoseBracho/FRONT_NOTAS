import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableWithoutFeedback, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from "axios";

import { sharedStyles } from '../styles/sharedStyles'

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
        <TouchableOpacity style={sharedStyles.authButton} onPress={() => deleteProfile()}>
          <Text style={sharedStyles.loginButtonText}>Eliminar perfil</Text>
        </TouchableOpacity>
        </View>
      </View>
    );
}
  