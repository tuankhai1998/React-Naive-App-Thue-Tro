import { ApolloClient, createHttpLink, InMemoryCache } from "@apollo/client";
import { setContext } from '@apollo/client/link/context';

const makeApolloClient = (token) => {
    const link = createHttpLink({
        uri: "http://192.168.1.169:8000/graphql",
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


export default makeApolloClient;