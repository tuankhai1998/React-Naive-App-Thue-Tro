import { useQuery } from '@apollo/client';
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import React from 'react';
import { CURET_USER } from '../graphql/user';
import LoginScreen from '../screens/Login.screen';
import SearchScreen from '../screens/Search.screen';
import BottomTabNavigator from './BottomTabNavigator';

const AuthStack = createStackNavigator();

// create a component
const Authentication = ({ client }) => {
    const { data } = useQuery(CURET_USER)

    return (<>
        <AuthStack.Navigator
            screenOptions={{
                ...TransitionPresets.ModalSlideFromBottomIOS,
                headerShown: false,
            }}
        >
            {client ? (<AuthStack.Screen name="LoginScreen" component={LoginScreen} />) : (<>
                <AuthStack.Screen name="Dashboard" component={BottomTabNavigator} />
                <AuthStack.Screen name="SearchScreen" component={SearchScreen} />
            </>)}
        </AuthStack.Navigator>
    </>
    );
};


//make this component available to the app
export default Authentication;
