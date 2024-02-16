import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TextInput, Modal, FlatList, Pressable, TouchableWithoutFeedback, Button, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios'

const styles = StyleSheet.create({
    container: {
        width: '100%',
    },
    container2: {
        width: '100%',
        padding: 20
    },
    containerItem: {
        display: 'flex', 
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between', 
        gap: 10
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
    title: {
        fontSize: 20,
        color: '#fff'
    },
    title2: {
        fontSize: 28,
        color: '#000',
        textAlign: 'center',
        fontWeight: 'bold'
    },
    text: {
        fontSize: 16,
        color: '#6f6f6f'
    },
    whiteText: {
        fontSize: 16,
        color: '#fff'
    },
    textInput: {
        borderColor: '#6f6f6f',
        borderWidth: 1,
    },
    inputContainer: {
        marginTop: 20,
    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
    },
    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    button: {
        borderRadius: 20,
        marginTop: 5,
        marginBottom: 5,
        padding: 15,
        elevation: 2,
    },
    buttonClose: {
        backgroundColor: 'red',
        borderRadius: 20,
        padding: 10,
        elevation: 2,
    },
    buttonOpen: {
        backgroundColor: '#F194FF',
        marginBottom: 20
    },
    buttonCloseModal: {
        backgroundColor: 'red',
    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    titleNota: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#000',
        margin: 10
    },
    contentNota: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#000',
        margin: 10
    },
    headerModal: {
        display: 'flex', 
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between', 
        gap: 200,
    },
    modalText: {
        marginBottom: 15,
        fontSize: 20,
        color: '#000',
        textAlign: 'center',
    },
    input: {
        height: 40,
        width: 300,
        margin: 8,
        borderRadius: 10,
        borderWidth: 1,
        padding: 10,
    },
    inputArea: {
        height: 150,
        width: 300,
        margin: 8,
        textAlignVertical: 'top',
        borderRadius: 10,
        borderWidth: 1,
        padding: 10,
    },
    containerButtons: {
        flex: 1,
        alignItems: "center",
    },
    item: {
        backgroundColor: '#F7F7F9',
        padding: 20,
        marginVertical: 8,
    },
    itemText: {
        color: '#000',
        fontSize: 18
    }
})

export default function Notes({ route }) {
    const navigation = useNavigation()
    const token = route.params.token;
    const [ID, setID] = React.useState('');
    const [modalVisible, setModalVisible] = useState(false);
    const [modalVisible2, setModalVisible2] = useState(false);
    const [notas, setNotas] = useState([])
    
    const [titulo, setTitulo] = React.useState('');
    const [nota, setNota] = React.useState('');
    const [updateTitulo, setUpdateTitulo] = React.useState('');
    const [updateNota, setUpdateNota] = React.useState('');

    useEffect(() => {
        getNotas()
    }, []);

    const getNotas = async () => { 
        console.log(route.params)
        await axios.get(`http://154.38.184.216:3501/app/notes/category/${route.params._id}`, {
            headers: {
              'authorization': token
            }
          }) 
          .then(function (response) { 
            setTitulo('')
            setNota('')
            setUpdateTitulo('')
            setUpdateNota('')
            setNotas(response.data)
          })
          .catch(function (error) {
            console.log('error de que')
            console.log(error);
          });
    };
  
    const postNotas = async () => {
        await axios.post('http://154.38.184.216:3501/app/notes', {title: titulo, content: nota, category: route.params._id}, {
            headers: {
                'authorization': token
            }
          })
          .then(function (response) {
            getNotas()
            setModalVisible(false)
          }) 
          .catch(function (error) {
            console.log(error);
            Alert.alert('Error', 'Ocurrio algo inesperado', [
                {
                  text: 'Cancel',
                  onPress: () => console.log('Cancel Pressed'),
                  style: 'cancel',
                },
                {text: 'OK', onPress: () => console.log('OK Pressed')},
            ]);
          });
    };
 
    const putNotas = async () => {
        await axios.put(`http://154.38.184.216:3501/app/notes/${ID}`, {title: updateTitulo, content: updateNota}, {
            headers: {
                'authorization': route.params.token
            }
          })
          .then(function (response) {
            setModalVisible2(false)
            getNotas()
          }) 
          .catch(function (error) {
            Alert.alert('Error', 'Ocurrio algo inesperado', [
                {
                  text: 'Cancel',
                  onPress: () => console.log('Cancel Pressed'),
                  style: 'cancel',
                },
                {text: 'OK', onPress: () => console.log('OK Pressed')},
            ]);
            console.log(error);
          });
    };

    const deleteNotas = async (id) => {
        await axios.delete(`http://154.38.184.216:3501/app/notes/${id}`, {
            headers: {
                'authorization': token
            }
          })
          .then(function (response) {
            setModalVisible2(false)
            getNotas()
          }) 
          .catch(function (error) {
            console.log('error al eliminar')
            console.log(error);
          });
    };
    
    const renderItem = ({item}) => {
        return (
            <View style={styles.item}>
                <Text style={styles.titleNota}>{item.title}</Text>
                <Text style={styles.contentNota}>{item.content}</Text>
                <View style={styles.containerItem}>
                    <Button 
                        title="Editar"
                        onPress={() => {
                            setModalVisible2(true)
                            setUpdateTitulo(item.title)
                            setUpdateNota(item.content)
                            setID(item._id)
                        }}
                    />
                    <Pressable
                        style={[styles.buttonClose, styles.buttonCloseModal]}
                        onPress={() => deleteNotas(item._id)}>
                        <Text style={styles.textStyle}>Borrar</Text>
                    </Pressable>
                </View>
            </View>
        );
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableWithoutFeedback>
                    <Text style={styles.title}>Mis notas</Text>
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback onPress={() => navigation.navigate('Perfil', { token: token })}>
                    <Text style={styles.title}>Perfil</Text>
                </TouchableWithoutFeedback>
            </View>

            <View style={styles.container2}>
                <Pressable
                    style={[styles.button, styles.buttonOpen]}
                    onPress={() => setModalVisible(true)}>
                    <Text style={styles.textStyle}>Crear Nota</Text>
                </Pressable>
                                        
                <Text style={styles.title2}>{route.params.nota}</Text>

                <FlatList
                  data={notas}
                  renderItem={renderItem}
                  keyExtractor={item => item._id}
                />

                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => {
                      Alert.alert('Se creo una nota');
                      setModalVisible(!modalVisible);
                    }}>
                    <View style={styles.centeredView}>
                        <View style={styles.modalView}>
                            <View style={styles.headerModal}>
                                <Text style={styles.modalText}>Crear nota</Text>
                                <Pressable
                                    style={[styles.buttonClose, styles.buttonCloseModal]}
                                    onPress={() => setModalVisible(!modalVisible)}>
                                    <Text style={styles.textStyle}>X</Text>
                                </Pressable>
                            </View>
                            <TextInput
                                style={styles.input}
                                onChangeText={setTitulo}
                                value={titulo}
                                placeholder="Titulo"
                                maxLength={25}
                            />
                            <TextInput
                                style={styles.inputArea}
                                onChangeText={setNota}
                                value={nota}
                                placeholder="Max. 250 caracteres"
                                editable
                                multiline
                                numberOfLines={5}
                                maxLength={250}
                            />
                            <Pressable
                                style={[styles.button, styles.buttonOpen]}
                                onPress={() => postNotas()}>
                                <Text style={styles.textStyle}>Crear</Text>
                            </Pressable>
                        </View>
                    </View>
                </Modal>

                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible2}
                    onRequestClose={() => {
                      Alert.alert('Se edito una nota');
                      setModalVisible2(!modalVisible2);
                    }}>
                    <View style={styles.centeredView}>
                        <View style={styles.modalView}>
                            <View style={styles.headerModal}>
                                <Text style={styles.modalText}>Editar Nota</Text>
                                <Pressable
                                    style={[styles.buttonClose, styles.buttonCloseModal]}
                                    onPress={() => setModalVisible2(!modalVisible2)}>
                                    <Text style={styles.textStyle}>X</Text>
                                </Pressable>
                            </View>
                            <TextInput
                                style={styles.input}
                                onChangeText={setUpdateTitulo}
                                value={updateTitulo}
                                placeholder="Titulo de la nota"
                                maxLength={25}
                            />
                            <TextInput
                                style={styles.inputArea}
                                onChangeText={setUpdateNota}
                                value={updateNota}
                                placeholder="Max. 250 caracteres"
                                editable
                                multiline
                                numberOfLines={5}
                                maxLength={250}
                            />
                            <View style={styles.headerModal}>
                                <Pressable
                                    style={[styles.button, styles.buttonOpen]}
                                    onPress={() => putNotas()}>
                                    <Text style={styles.textStyle}>Editar</Text>
                                </Pressable>
                            </View>
                        </View>
                    </View>
                </Modal>
            </View>
        </View>
    );
}