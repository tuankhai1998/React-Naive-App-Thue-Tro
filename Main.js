import { ApolloProvider } from '@apollo/react-hooks';
import { NavigationContainer } from '@react-navigation/native';
import React, { useState } from 'react';
import client from './src/graphql/apollo';
import Authentication from './src/navigation/auth';
import SplashScreen from './src/screens/Splash.screen';


export default function Main(props) {
    const { fontLoaded } = props;

    const [loading, setLoading] = useState(false);

    if (fontLoaded && loading) {
        return (
            <ApolloProvider
                client={client}
            >
                <NavigationContainer>
                    <Authentication />
                </NavigationContainer>
            </ApolloProvider>
        )
    }
    return <SplashScreen isLoading={fontLoaded} SetLoading={() => setLoading(true)} />



}

