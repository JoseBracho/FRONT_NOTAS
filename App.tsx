import React from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Home from "./src/screens/home";
import Login from "./src/screens/login";
import UserRegistration from "./src/screens/userRegistration";
import Profile from "./src/screens/profile";
import Notes from "./src/screens/notes";
import Categories from "./src/screens/categories";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator 
        initialRouteName="Inicio"
        screenOptions={{
          headerShown: false
        }}
      >
        <Stack.Screen name="Inicio" component={Home} />
        <Stack.Screen name="Registro" component={UserRegistration} />
        <Stack.Screen name="Inicio de sesion" component={Login} />
        <Stack.Screen name="Perfil" component={Profile} />
        <Stack.Screen name="Notas" component={Notes} />
        <Stack.Screen name="Categorias" component={Categories} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}