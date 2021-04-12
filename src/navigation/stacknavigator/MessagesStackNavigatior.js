//import liraries
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import React from 'react';
import Messages from '../../screens/MessagesScreen/Message';
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
                headerShown: false,
                tabBarVisible: false
            }}
        >
            <MessagesStack.Screen name="ListMessage" component={MessagesScreen} />
            <MessagesStack.Screen name="Message" component={Messages} />
        </MessagesStack.Navigator>
    );
};


//make this component available to the app
export default MessagesStackNavigator;