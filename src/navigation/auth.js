import { useApolloClient } from '@apollo/client';
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import React, { useEffect, useState } from 'react';
import { AuthContext } from '../components/AuthContext';
import { getStorage } from '../helpers/storage';
import CreateProduct from '../screens/CreateProduct/CreateProduct.screen';
import Messages from '../screens/ListChatScreen/Message';

import ListProductSearchScreen from '../screens/ListProductSearch.screen';
import LoginScreen from '../screens/LoginScreen/Login.screen';
import ProductScreen from '../screens/ProductScreen/Product.screen';
import SearchScreen from '../screens/SearchScreen/Search.screen';

import BottomTabNavigator from './BottomTabNavigator';


const AuthStack = createStackNavigator();


// create a component
const Authentication = () => {
    const [login, setLogin] = useState(false),
        [token, setToken] = useState(null);

    const client = useApolloClient()

    useEffect(() => {
        getStorage().then(data => {
            if (data) {
                setToken(data)
            } else {
                setToken(null)
            }
        })
    }, [login])

    const authContext = React.useMemo(() => (
        {
            logOut: () => {
                setToken(null)
                setLogin(false)

            }
        }
    ))

    return (<AuthContext.Provider value={authContext}>
        <AuthStack.Navigator
            screenOptions={{
                ...TransitionPresets.ModalSlideFromBottomIOS,
                headerShown: false,
            }}
        >
            {token && login ? (<>
                <AuthStack.Screen name="Dashboard" component={() => <BottomTabNavigator />} />
                <AuthStack.Screen name="SearchScreen" component={SearchScreen} />
                <AuthStack.Screen name="ProductScreen" component={ProductScreen} />
                <AuthStack.Screen name="CreateProduct" component={CreateProduct} />
                <AuthStack.Screen name="ChatList" component={Messages} />
                <AuthStack.Screen name="ProductListScreen" component={ListProductSearchScreen} />
            </>) : (<AuthStack.Screen name="LoginScreen" component={() => <LoginScreen handleLogin={() => setLogin(true)} token={token} />} />)}
        </AuthStack.Navigator>
    </AuthContext.Provider>
    );
};


//make this component available to the app
export default Authentication;

