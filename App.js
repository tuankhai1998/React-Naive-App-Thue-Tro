import { useFonts } from 'expo-font';
import React from 'react';
import { Provider as PaperProvider } from 'react-native-paper';
import { ToastProvider } from 'react-native-paper-toast';
import { initialWindowMetrics, SafeAreaProvider } from 'react-native-safe-area-context';
import Main from './Main';
import theme from './src/constants/theme';




export default function App() {

  let [fontLoaded] = useFonts({
    'Roboto-Regular': require('./assets/fonts/Roboto-Medium.ttf'),
    'Roboto-Bold': require('./assets/fonts/Roboto-Bold.ttf'),
    'Roboto-Black': require('./assets/fonts/Roboto-Black.ttf'),
    'Montserrat-Regular': require('./assets/fonts/Montserrat-Regular.ttf'),
    'Montserrat-Bold': require('./assets/fonts/Montserrat-Bold.ttf')
  })
  return (
    <SafeAreaProvider initialMetrics={initialWindowMetrics}>
      <PaperProvider theme={theme}>
        <ToastProvider overrides={{ position: 'top', duration: 3000 }}>
          <Main fontLoaded={fontLoaded} />
        </ToastProvider>
      </PaperProvider>
    </SafeAreaProvider>
  )
}

/**
 * get location current
 *  const getLocationAsync = async () => {
 *  let { status } = await Location.requestPermissionsAsync();

        if (status !== 'granted') {
            setErrorMsg('Permission to access location was denied');
        }

        let location = await Location.getCurrentPositionAsync({});

        // React native
1. Header slide
https://medium.com/@KPS250/creating-image-slider-with-flatlist-in-react-native-1815d3793d99
2. Opent navigation directly
https://supersami.medium.com/react-native-integrating-with-google-maps-to-maps-or-navigation-android-fbc5cb31bc59
or
https://www.npmjs.com/package/react-native-google-maps-directions
3. https://github.com/jsdf/react-native-htmlview
 */

