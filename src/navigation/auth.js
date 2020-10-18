import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import LoginScreen from '../screens/Login.screen';
import BottomTabNavigator from './BottomTabNavigator';

const AuthStack = createStackNavigator();

// create a component
const Authentication = () => {



    return (
        <AuthStack.Navigator
            screenOptions={{
                ...TransitionPresets.ModalSlideFromBottomIOS,
                headerShown: false,
            }}
        >
            <AuthStack.Screen name="LoginScreen" component={LoginScreen} />
            <AuthStack.Screen name="Dashboard" component={BottomTabNavigator} />
        </AuthStack.Navigator>
    );
};


//make this component available to the app
export default Authentication;
