import { ApolloProvider } from '@apollo/react-hooks';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationContainer } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import makeApolloClient from './src/graphql/apollo';
import Authentication from './src/navigation/auth';
import SplashScreen from './src/screens/Splash.screen';


export default function Main(props) {
    const { fontLoaded } = props;

    const [loading, setLoading] = useState(false),
        [client, setClient] = useState({});

    useEffect(() => {
        let sectionObj = async () => {
            let section = await AsyncStorage.getItem("@AHome-graphql:")
            return JSON.parse(section)
        }

        let { id, token } = sectionObj();

        const makeClient = makeApolloClient(token)
        setClient(makeClient)
    }, []);



    if (fontLoaded && loading && client) {
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

