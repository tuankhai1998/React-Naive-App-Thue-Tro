
//import liraries
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useRoute } from '@react-navigation/core';
import React from 'react';
import { Image } from 'react-native';
import { COLORS, Images, SIZES } from '../constants';
import MessagesScreen from '../screens/MessagesScreen/Messages.screen';
import RentScreen from '../screens/RentScreen/Rent.screen';
import HomeStackNavigator from './stacknavigator/HomeStackNavigator';
import LikeStackNavigator from './stacknavigator/LikeStackNavigatior';
import MessagesStackNavigator from './stacknavigator/MessagesStackNavigatior';
import SettingStackNavigator from './stacknavigator/SettingStackNavigator';
const Tab = createBottomTabNavigator();

// create a component
const BottomTabNavigator = () => {

    return (
        <>
            { <Tab.Navigator
                tabBarOptions={{
                    activeTintColor: COLORS.primary,
                    inactiveTintColor: COLORS.primaryTextColor,
                    keyboardHidesTabBar: true,
                    style: {
                        paddingVertical: SIZES.base,
                        paddingBottom: SIZES.padding,
                        height: SIZES.height / 12
                    }
                }}

                screenOptions={({ route }) => ({
                    tabBarIcon: ({ focused, color, size }) => {
                        if (route.name === 'Home') {
                            return <Image source={Images.HOME} style={{
                                tintColor: color,
                                width: 25,
                                height: 25
                            }} />;
                        }
                        if (route.name === 'Settings') {
                            return <Image source={Images.SETTING} style={{
                                tintColor: color,
                                width: 25,
                                height: 25
                            }} />;
                        }
                        if (route.name === 'Like') {
                            return <Image source={Images.HEART} style={{
                                tintColor: color,
                                width: 25,
                                height: 25
                            }} />;
                        }
                        if (route.name === 'Messages') {
                            return <Image source={Images.CHAT} style={{
                                tintColor: color,
                                width: 25,
                                height: 25
                            }} />;
                        }
                        return <Image source={Images.RENT} style={{
                            tintColor: color,
                            width: 25,
                            height: 25
                        }} />;
                    },
                })}
            >
                <Tab.Screen name="Home" component={HomeStackNavigator} />
                <Tab.Screen name="Like" component={LikeStackNavigator} />
                <Tab.Screen name="Rent" component={RentScreen} />
                <Tab.Screen name="Messages" component={MessagesScreen} />
                <Tab.Screen name="Settings" component={SettingStackNavigator} />
            </Tab.Navigator>}
        </>
    );
};

// define your styles


//make this component available to the app
export default BottomTabNavigator;
