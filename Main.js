import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { ApolloProvider } from '@apollo/react-hooks';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationContainer } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import Authentication from './src/navigation/auth';
import SplashScreen from './src/screens/Splash.screen';

const makeApolloClient = (token) => {
    const link = createHttpLink({
        uri: "http://192.168.1.58:8000/graphql",
    })

    const authLink = setContext((_, { headers }) => {
        return {
            headers: {
                ...headers,
                authorization: token ? `Bearer ${token}` : "",
            }
        }
    });
    const cache = new InMemoryCache();

    const client = new ApolloClient({
        link: authLink.concat(link),
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
                    <Authentication client={client} />
                </NavigationContainer>
            </ApolloProvider>
        )
    }
    return <SplashScreen isLoading={fontLoaded} SetLoading={() => setLoading(true)} />



}

