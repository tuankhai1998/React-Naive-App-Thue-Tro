//import liraries
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import LikeScreen from '../../screens/Like.screen';

const LikeStack = createStackNavigator();


// create a component
const LikeStackNavigator = () => {
    return (
        <LikeStack.Navigator>
            <LikeStack.Screen name="LikeScreen" component={LikeScreen} />
        </LikeStack.Navigator>
    );
};


//make this component available to the app
export default LikeStackNavigator;
