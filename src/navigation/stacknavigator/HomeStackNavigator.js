//import liraries
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import HomeScreen from '../../screens/Home.screen';

const HomeStack = createStackNavigator();


// create a component
const HomeStackNavigator = () => {
    return (
        <HomeStack.Navigator
            options={
                // tao truyen giua cac stack nhu trong ios
                { ...TransitionPresets.ModalSlideFromBottomIOS, }
            }
        >
            <HomeStack.Screen name="HomeScreen" component={HomeScreen} />
        </HomeStack.Navigator >
    );
};


//make this component available to the app
export default HomeStackNavigator;
