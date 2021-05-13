import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";
import { setContext } from '@apollo/client/link/context';
import { getStorage } from "../helpers/storage";
import { createUploadLink } from 'apollo-upload-client'

const httpLink = createUploadLink({
    uri: "http://192.168.1.58:8000/graphql",
})


const authLink = setContext(async (req, { headers }) => {
    let token = "";
    try {
        token = await getStorage();
        console.log("get token on storage :", token)
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
    link: authLink.concat(httpLink),
    cache
})

export default client