import { ApolloClient, HttpLink, InMemoryCache, split } from "@apollo/client";
import { setContext } from '@apollo/client/link/context';
import { getStorage } from "../helpers/storage";
import { createUploadLink } from 'apollo-upload-client';

import { WebSocketLink } from '@apollo/client/link/ws';
import { getMainDefinition } from '@apollo/client/utilities';

export const URI = "://192.168.1.184:8000/"

let getToken = async () => {
    let token = await getStorage();
    return token ? `Bearer ${token}` : ""
};
const wsLink = new WebSocketLink({
    uri: `ws${URI}graphql`,
    options: {
        reconnect: true,
        connectionParams: {
            Authorization: getToken()
        }
    }
});
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

let uploadLink = createUploadLink({ uri: `http${URI}graphql` })

let httpLink = authLink.concat(uploadLink)

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


const cache = new InMemoryCache();

const client = new ApolloClient({
    link: splitLink,
    cache
})

export default client