import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";
import { setContext } from '@apollo/client/link/context';
import { getStorage } from "../helpers/storage";

const httpLink = new HttpLink({
    uri: "http://192.168.1.58:8000/graphql",
})


const authLink = setContext(async (req, { headers }) => {
    let token = "";
    try {
        token = await getStorage();
    } catch (error) {
        console.log(error)
    }
    return {
        headers: {
            ...headers,
            authorization: token ? `Bearer ${token}` : "",
        }
    }
});

const cache = new InMemoryCache();

const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache
})

export default client