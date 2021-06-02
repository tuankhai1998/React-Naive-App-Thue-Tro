import { ApolloClient, HttpLink, InMemoryCache, split } from "@apollo/client";
import { setContext } from '@apollo/client/link/context';
import { getStorage } from "../helpers/storage";
import { createUploadLink } from 'apollo-upload-client';

import { WebSocketLink } from '@apollo/client/link/ws';
import { getMainDefinition } from '@apollo/client/utilities';

export const URI = "http://192.168.1.184:8686"
const wsLink = new WebSocketLink({
    uri: 'ws://192.168.1.184:8686/',
    options: {
        reconnect: true,
    }
});


let httpLink = createUploadLink({ uri: `${URI}/graphql` })

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