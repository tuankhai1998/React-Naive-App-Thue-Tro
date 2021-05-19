import { ApolloClient, HttpLink, InMemoryCache, split } from "@apollo/client";
import { setContext } from '@apollo/client/link/context';
import { getStorage } from "../helpers/storage";
import { createUploadLink } from 'apollo-upload-client'

import { WebSocketLink } from '@apollo/client/link/ws';
import { getMainDefinition } from '@apollo/client/utilities';

const wsLink = new WebSocketLink({
    uri: 'ws://192.168.2.11:8000/',
    options: {
        reconnect: true,
    }
});

const httpLink = createUploadLink({
    uri: "http://192.168.2.11:8000/graphql",
})

const splitLink = split(
    ({ query }) => {
        const definition = getMainDefinition(query);
        return (
            definition.kind === 'OperationDefinition' &&
            definition.operation === 'subscription'
        );
    },
    wsLink,
    httpLink,
);


const authLink = setContext(async (req, { headers }) => {
    let token = "";
    try {
        token = await getStorage();
        return {
            headers: {
                ...headers,
                authorization: token ? `Bearer ${token}` : "",
            }
        }
    } catch (error) {
        console.log(error)
    }

});

const cache = new InMemoryCache();

const client = new ApolloClient({
    link: authLink.concat(splitLink),
    cache
})

export default client