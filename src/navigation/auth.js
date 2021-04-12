import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import React, { useEffect, useState } from 'react';
import { getStorage } from '../helpers/storage';
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
                setToken(data.token)
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
            {token ? (<>
                <AuthStack.Screen name="Dashboard" component={() => <BottomTabNavigator handleLogin={(isLogin) => setLogin(isLogin)} />} />
                <AuthStack.Screen name="SearchScreen" component={SearchScreen} />
                <AuthStack.Screen name="ProductScreen" component={ProductScreen} />
                <AuthStack.Screen name="ProductListScreen" component={ListProductSearchScreen} />
            </>) : (<AuthStack.Screen name="LoginScreen" component={() => <LoginScreen handleLogin={() => setLogin(true)} />} />)}
        </AuthStack.Navigator>
    </>
    );
};


//make this component available to the app
export default Authentication;

