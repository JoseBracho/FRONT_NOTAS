import { StyleSheet } from 'react-native';
 
export const sharedStyles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#fff",
      alignItems: 'center',
      justifyContent: 'center',
    },
    title: {
      marginTop: 10,
      fontSize: 30,
      fontWeight: "bold",
      textAlign: 'center',
    },
    tags: {
      marginTop: 10,
      fontSize: 20,
      paddingLeft: 14,
      fontWeight: "700",
    },
    input: {
      height: 40,
      width: 390,
      margin: 12,
      borderRadius: 10,
      borderWidth: 1,
      padding: 10,
    },
    containerButtons: {
      flex: 1,
      alignItems: "center",
    }
  });
  