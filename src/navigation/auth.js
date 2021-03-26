import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import React from 'react';
import { StatusBar } from 'react-native';
import LoginScreen from '../screens/Login.screen';
import SearchScreen from '../screens/Search.screen';
import BottomTabNavigator from './BottomTabNavigator';

const AuthStack = createStackNavigator();

// create a component
const Authentication = () => {
    const [client, setClient] = React.useState(null);
    return (<>

       
        <AuthStack.Navigator
            screenOptions={{
                ...TransitionPresets.ModalSlideFromBottomIOS,
                headerShown: false,
            }}
        >
            {/* {client ? <AuthStack.Screen name="LoginScreen" component={LoginScreen} /> : null} */}
            <AuthStack.Screen name="Dashboard" component={BottomTabNavigator} />
            <AuthStack.Screen name="SearchScreen" component={SearchScreen} />
        </AuthStack.Navigator>
    </>
    );
};


//make this component available to the app
export default Authentication;
