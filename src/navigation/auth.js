import { useQuery } from '@apollo/client';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import React from 'react';
import { CURET_USER } from '../graphql/user';
import LoginScreen from '../screens/Login.screen';
import SearchScreen from '../screens/Search.screen';
import SplashScreen from '../screens/Splash.screen';
import BottomTabNavigator from './BottomTabNavigator';

const AuthStack = createStackNavigator();


// create a component
const Authentication = () => {

    let { data, loading, error } = useQuery(CURET_USER)



    return (<>
        <AuthStack.Navigator
            screenOptions={{
                ...TransitionPresets.ModalSlideFromBottomIOS,
                headerShown: false,
            }}
        >
            {data && data.user ? (<AuthStack.Screen name="LoginScreen" component={LoginScreen} />) : (<>
                <AuthStack.Screen name="Dashboard" component={BottomTabNavigator} />
                <AuthStack.Screen name="SearchScreen" component={SearchScreen} />
            </>)}
        </AuthStack.Navigator>
    </>
    );
};


//make this component available to the app
export default Authentication;
