import { NavigationContainer } from '@react-navigation/native';
import React, { useState } from 'react';
import Authentication from './src/navigation/auth';
import SplashScreen from './src/screens/Splash.screen';



export default function Main(props) {
    const { fontLoaded } = props;


    const [loading, setLoading] = useState(false);



    if (fontLoaded && loading) {
        return (
            <NavigationContainer>
                <Authentication />
            </NavigationContainer>
        )
    }
    return <SplashScreen isLoading={fontLoaded} SetLoading={() => setLoading(true)} />



}

