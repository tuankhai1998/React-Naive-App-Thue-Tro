import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import React, { useEffect, useState } from 'react';
import { getStorage } from '../helpers/storage';
import CreateProduct from '../screens/CreateProduct/CreateProduct.screen';
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

    useEffect(() => {
        getStorage().then(data => {
            if (data) {
                setToken(data)
            } else {
                setToken(null)
            }
        })
    }, [login])

    return (<>
        <AuthStack.Navigator
            screenOptions={{
                ...TransitionPresets.ModalSlideFromBottomIOS,
                headerShown: false,
            }}
        >
            {token && login ? (<>
                <AuthStack.Screen name="Dashboard" component={() => <BottomTabNavigator handleLogin={(isLogin) => setLogin(isLogin)} />} />
                <AuthStack.Screen name="SearchScreen" component={SearchScreen} />
                <AuthStack.Screen name="ProductScreen" component={ProductScreen} />
                <AuthStack.Screen name="CreateProduct" component={CreateProduct} />
                <AuthStack.Screen name="ProductListScreen" component={ListProductSearchScreen} />
            </>) : (<AuthStack.Screen name="LoginScreen" component={() => <LoginScreen handleLogin={() => setLogin(true)} token={token} />} />)}
        </AuthStack.Navigator>
    </>
    );
};


//make this component available to the app
export default Authentication;

