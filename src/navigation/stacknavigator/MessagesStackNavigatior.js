//import liraries
import { useNavigation } from '@react-navigation/core';
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import React from 'react';
import MessagesScreen from '../../screens/MessagesScreen/Messages.screen';

const MessagesStack = createStackNavigator();


// create a component
const MessagesStackNavigator = () => {


    return (
        <MessagesStack.Navigator
            options={
                { ...TransitionPresets.ModalSlideFromBottomIOS, }  // tao truyen giua cac stack nhu trong ios
            }
            screenOptions={{
                headerShown: false
            }}
        >
            <MessagesStack.Screen name="MessagesScreen" component={MessagesScreen} />
        </MessagesStack.Navigator>
    );
};


//make this component available to the app
export default MessagesStackNavigator;
