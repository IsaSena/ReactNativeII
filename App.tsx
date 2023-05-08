import React from 'react';
import { ThemeProvider } from 'styled-components';
import theme from './src/global/styles/theme'
import { Register } from './src/screens/Register'; //por padrao ja vai pro index
import { AppRoutes } from './src/routes/app.routes'
import AppLoading from 'expo-app-loading'
import {
  useFonts, //carrega as fontes
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_700Bold
} from '@expo-google-fonts/poppins';

import { NavigationContainer } from '@react-navigation/native'

export default function App() {
  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_700Bold
  });

  if (!fontsLoaded) { //se nao for carregado nao exibe o app
    return <AppLoading />
  }

  return (
    <ThemeProvider theme={theme}>
      <NavigationContainer>
        <AppRoutes />
      </NavigationContainer>
    </ThemeProvider>
  )
}

