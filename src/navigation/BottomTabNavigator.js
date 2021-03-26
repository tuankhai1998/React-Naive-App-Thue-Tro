//import liraries
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import { StatusBar } from 'react-native';
import HomeStackNavigator from './stacknavigator/HomeStackNavigator';
import LikeStackNavigator from './stacknavigator/LikeStackNavigatior';
import ProfileStackNavigator from './stacknavigator/ProfileStackNavigatior';
import SettingStackNavigator from './stacknavigator/SettingStackNavigator';
const Tab = createBottomTabNavigator();

// create a component
const BottomTabNavigator = () => {
    return (
        <>
            <Tab.Navigator>

                <Tab.Screen name="Home" component={HomeStackNavigator} />
                <Tab.Screen name="Like" component={LikeStackNavigator} />
                <Tab.Screen name="Profile" component={ProfileStackNavigator} />
                <Tab.Screen name="Settings" component={SettingStackNavigator} />
            </Tab.Navigator>
        </>
    );
};

// define your styles


//make this component available to the app
export default BottomTabNavigator;
