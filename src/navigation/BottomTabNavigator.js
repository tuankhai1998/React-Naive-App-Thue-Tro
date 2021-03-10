//import liraries
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import HomeStackNavigator from './stacknavigator/HomeStackNavigator';
import LikeStackNavigator from './stacknavigator/LikeStackNavigatior';
import ProfileStackNavigator from './stacknavigator/ProfileStackNavigatior';
import SettingStackNavigator from './stacknavigator/SettingStackNavigator';


const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

// create a component
const BottomTabNavigator = () => {
    return (

        <Tab.Navigator
            screenOptions={{
                headerShown: false
            }}
        >
            <Tab.Screen name="Home" component={HomeStackNavigator} />
            <Tab.Screen name="Like" component={LikeStackNavigator} />
            <Tab.Screen name="Profile" component={ProfileStackNavigator} />
            <Tab.Screen name="Settings" component={SettingStackNavigator} />
        </Tab.Navigator>


    );
};

// define your styles


//make this component available to the app
export default BottomTabNavigator;


{/* <Tab.Navigator>
                <Tab.Screen name="Home" component={HomeStackNavigator} />
                <Tab.Screen name="Like" component={LikeStackNavigator} />
                <Tab.Screen name="Profile" component={ProfileStackNavigator} />
                <Tab.Screen name="Settings" component={SettingStackNavigator} />
            </Tab.Navigator> */}
