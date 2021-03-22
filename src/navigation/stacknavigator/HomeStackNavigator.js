//import liraries
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import React from 'react';
import HomeScreen from '../../screens/Home.screen';
import { COLORS, SIZES } from '../../constants/theme'
import Header from '../../components/Header';

const HomeStack = createStackNavigator();


// create a component
const HomeStackNavigator = () => {
    return (
        <HomeStack.Navigator
            options={
                {
                    ...TransitionPresets.ModalSlideFromBottomIOS,
                }
            }
            screenOptions={{
                headerShown: false,
            }}
        >
            <HomeStack.Screen name="HomeScreen" component={HomeScreen} options={{ title: 'Home' }} />
        </HomeStack.Navigator >
    );
};


//make this component available to the app
export default HomeStackNavigator;
