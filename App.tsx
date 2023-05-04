import React from 'react';
import { ThemeProvider } from 'styled-components';
import theme from './src/global/styles/theme'
import { CategorySelect } from './src/screens/CategorySelect'; //por padrao ja vai pro index

import AppLoading from 'expo-app-loading'
import {
  useFonts, //carrega as fontes
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_700Bold
} from '@expo-google-fonts/poppins';

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
      <CategorySelect />
    </ThemeProvider>
  )
}

