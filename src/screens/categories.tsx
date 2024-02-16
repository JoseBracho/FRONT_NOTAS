import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TextInput, Modal, FlatList, Pressable, TouchableWithoutFeedback, Button, Alert, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
    },
    container2: {
        flex: 1,
        padding: 20
    },
    containerItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginVertical: 5
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: windowHeight * 0.08,
        paddingHorizontal: 15,
        backgroundColor: '#000'
    },
    title: {
        fontSize: windowHeight * 0.025,
        color: '#fff'
    },
    text: {
        fontSize: windowHeight * 0.02,
        color: '#6f6f6f'
    },
    whiteText: {
        fontSize: windowHeight * 0.02,
        color: '#fff'
    },
    textInput: {
        height: windowHeight * 0.05,
        width: windowWidth * 0.75,
        marginVertical: 10,
        borderRadius: 10,
        borderWidth: 1,
        paddingHorizontal: 10,
    },
    inputContainer: {
        marginTop: 20,
    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalView: {
        width: windowWidth * 0.8,
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
        marginHorizontal: 20,
        marginBottom: 5,
        padding: 15,
        elevation: 2,
    },
    buttonClose: {
        backgroundColor: 'red',
        marginLeft: 20,
        borderRadius: 20,
        padding: 10,
        elevation: 2,
    },
    buttonOpen: {
        backgroundColor: '#008000',
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
    textHeader: {
        fontSize: windowWidth * 0.06,
    },
    headerModal: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 15,
    },
    footerModal: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: 20,
    },
    modalText: {
        marginBottom: 15,
        fontSize: windowWidth * 0.05,
        color: '#000',
        textAlign: 'center',
    },
    input: {
        height: windowHeight * 0.05,
        width: windowWidth * 0.75,
        marginVertical: 8,
        borderRadius: 10,
        borderWidth: 1,
        paddingHorizontal: 10,
    },
    inputArea: {
        height: windowHeight * 0.15,
        width: windowWidth * 0.75,
        marginVertical: 8,
        textAlignVertical: 'top',
        borderRadius: 10,
        borderWidth: 1,
        paddingHorizontal: 10,
    },
    item: {
        backgroundColor: '#F7F7F9',
        padding: 20,
        marginVertical: 8,
    },
    itemText: {
        color: '#000',
        fontSize: windowWidth * 0.04
    }
})

export default function Categories({ route }) {
    let id = ''
    const navigation = useNavigation()
    const token = route.params.token;
    const [modalVisible, setModalVisible] = useState(false);
    const [modalVisible2, setModalVisible2] = useState(false);
    const [categorias, setCategorias] = useState([])
    const [categoria, setCategoria] = React.useState('');
    const [updateCategoria, setUpdateCategoria] = React.useState('');
    const [ID, setID] = React.useState('');

    useEffect(() => {
        getCategorias()
    }, []);

    const getCategorias = async () => {
        await axios.get('http://154.38.184.216:3501/app/categories', {
            headers: {
                'authorization': route.params.token
            }
        })
            .then(function (response) {
                id = response.data._id
                setCategoria('')
                setUpdateCategoria('')
                setCategorias(response.data)
            })
            .catch(function (error) {
                console.log(error);
            });
    };

    const postCategorias = async () => {
        await axios.post('http://154.38.184.216:3501/app/categories', { name: categoria }, {
            headers: {
                'authorization': route.params.token
            }
        })
            .then(function (response) {
                getCategorias()
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
                    { text: 'OK', onPress: () => console.log('OK Pressed') },
                ]);
            });
    };

    const putCategorias = async () => {
        await axios.put(`http://154.38.184.216:3501/app/categories/${ID}`, { name: updateCategoria }, {
            headers: {
                'authorization': route.params.token
            }
        })
            .then(function (response) {
                setModalVisible2(false)
                getCategorias()
            })
            .catch(function (error) {
                console.log(error);
            });
    };

    const deleteCategorias = async () => {
        await axios.delete(`http://154.38.184.216:3501/app/categories/${ID}`, {
            headers: {
                'authorization': route.params.token
            }
        })
            .then(function (response) {
                setModalVisible2(false)
                getCategorias()
            })
            .catch(function (error) {
                console.log(error);
            });
    };

    const renderItem = ({ item }) => {
        return (
            <View style={styles.item}>
                <Text style={styles.itemText}>{item.name}</Text>
                <View style={styles.containerItem}>
                    <Button
                        title="Editar"
                        onPress={() => {
                            setModalVisible2(true)
                            setUpdateCategoria(item.name)
                            setID(item._id)
                        }}
                    />
                    <Button
                        title=">"
                        onPress={() => navigation.navigate("Notas", { _id: item._id, nota: item.name, token: token })}
                    />
                </View>
            </View>
        );
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableWithoutFeedback>
                    <Text style={styles.title}>Mis categorias</Text>
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback onPress={() => navigation.navigate('Perfil', { token: token })}>
                    <Text style={styles.title}>Perfil</Text>
                </TouchableWithoutFeedback>
            </View>
            <View style={styles.container2}>
                <Pressable
                    style={[styles.button, styles.buttonOpen]}
                    onPress={() => setModalVisible(true)}>
                    <Text style={styles.textStyle}>Crear Categoria</Text>
                </Pressable>

                <FlatList
                    data={categorias}
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
                    <View style={[styles.centeredView, { height: windowHeight }]}>
                        <View style={styles.modalView}>
                            <View style={styles.headerModal}>
                                <Text style={styles.modalText}>Crear categoria</Text>
                                <Pressable
                                    style={[styles.buttonClose, styles.buttonCloseModal]}
                                    onPress={() => setModalVisible(!modalVisible)}>
                                    <Text style={styles.textStyle}>X</Text>
                                </Pressable>
                            </View>
                            <TextInput
                                style={styles.input}
                                onChangeText={setCategoria}
                                value={categoria}
                                placeholder="Nombre de la categoria"
                                maxLength={25}
                            />
                            <Pressable
                                style={[styles.button, styles.buttonOpen]}
                                onPress={() => postCategorias()}>
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
                        Alert.alert('Se edito una categoria');
                        setModalVisible2(!modalVisible2);
                    }}>
                    <View style={[styles.centeredView, { height: windowHeight }]}>
                        <View style={styles.modalView}>
                            <View style={styles.headerModal}>
                                <Text style={styles.modalText}>Editar categoria</Text>
                                <Pressable
                                    style={[styles.buttonClose, styles.buttonCloseModal]}
                                    onPress={() => setModalVisible2(!modalVisible2)}>
                                    <Text style={styles.textStyle}>X</Text>
                                </Pressable>
                            </View>
                            <TextInput
                                style={styles.input}
                                onChangeText={setUpdateCategoria}
                                value={updateCategoria}
                                placeholder="Nombre de la categoria"
                                maxLength={25}
                            />
                            <View style={styles.footerModal}>
                                <Pressable
                                    style={[styles.button, styles.buttonOpen]}
                                    onPress={() => putCategorias()}>
                                    <Text style={styles.textStyle}>Editar</Text>
                                </Pressable>
                                <Pressable
                                    style={[styles.buttonClose, styles.buttonCloseModal]}
                                    onPress={() => deleteCategorias()}>
                                    <Text style={styles.textStyle}>Eliminar</Text>
                                </Pressable>
                            </View>
                        </View>
                    </View>
                </Modal>
            </View>
        </View>
    );
}
