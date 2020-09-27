import { useFonts } from 'expo-font';
import React from 'react';
import { Provider as PaperProvider } from 'react-native-paper';
import Main from './Main';
import theme from './src/constants/theme';




export default function App() {

  let [fontLoaded] = useFonts({
    'Roboto': require('./assets/fonts/Roboto-Medium.ttf'),
    'Roboto-Bold': require('./assets/fonts/Roboto-Bold.ttf'),
  })
  return (
    <PaperProvider theme={theme}>
      <Main fontLoaded={fontLoaded} />
    </PaperProvider>
  )
}

