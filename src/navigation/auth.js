import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import React, { useEffect, useState } from 'react';
import LoginScreen from '../screens/Login.screen';
import SearchScreen from '../screens/Search.screen';
import BottomTabNavigator from './BottomTabNavigator';
import { getStorage } from '../helpers/storage';
import { useLazyQuery } from '@apollo/client';
import { CURET_USER } from '../graphql/user';
import ProductScreen from '../screens/Product.screen';
import ListProductSearchScreen from '../screens/ListProductSearch.screen';

const AuthStack = createStackNavigator();


// create a component
const Authentication = () => {
    const [login, setLogin] = useState(false),
        [token, setToken] = useState('');




    useEffect(() => {
        getStorage().then(data => {
            if (data) {
                setToken(data.token)
            } else {
                setToken('')
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

