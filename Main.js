import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationContainer } from '@react-navigation/native';
import {
    InMemoryCache
} from 'apollo-cache-inmemory';
import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import React, { useEffect, useState } from 'react';
import { ApolloProvider } from 'react-apollo';
import Authentication from './src/navigation/auth';
import SplashScreen from './src/screens/Splash.screen';

const makeApolloClient = (token) => {
    const link = new HttpLink({
        uri: "http://localhost:8000/graphql",
        headers: {
            Authorization: `Bearer ${token}`
        }
    })

    const cache = new InMemoryCache();

    const client = new ApolloClient({
        link,
        cache
    })

    return client
}

export default function Main(props) {
    const { fontLoaded } = props;

    const [loading, setLoading] = useState(false),
        [client, setClient] = useState({});

    useEffect(() => {
        let sectionObj = async () => {
            let section = await AsyncStorage.getItem("@AHome-graphql : section")
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

