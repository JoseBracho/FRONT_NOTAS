import { StyleSheet } from 'react-native';
 
export const sharedStyles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#000000",
      alignItems: 'center',
      justifyContent: 'center',
    },
    title: {
        fontSize: 30,
        fontWeight: "bold",
        color: "#008000", 
        textAlign: 'center',
        marginBottom: 20,
    },
    innerContainer: {
        width: '80%',
        maxWidth: 400,
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
        borderColor: "#CCCCCC",
        paddingHorizontal: 10,
        color: "#CCCCCC",
    },
    authButton: {
        backgroundColor: '#008000',
        paddingVertical: 12,
        paddingHorizontal: 12,
        borderRadius: 10,
        marginTop: 20,
        alignItems: 'center',
    },
    loginButtonText: {
        color: '#CCCCCC',
        fontWeight: 'bold',
        fontSize: 18,
    },
    containerButtons: {
      flex: 1,
      alignItems: "center",
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
  });
  