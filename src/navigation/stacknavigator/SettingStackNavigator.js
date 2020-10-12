//import liraries
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import SettingScreen from '../../screens/Setting.screen';

const SettingStack = createStackNavigator();


// create a component
const SettingStackNavigator = () => {
    return (
        <SettingStack.Navigator
            options={
                { ...TransitionPresets.ModalSlideFromBottomIOS, }  // tao truyen giua cac stack nhu trong ios
            }
        >
            <SettingStack.Screen name="SettingScreen" component={SettingScreen} />
        </SettingStack.Navigator>
    );
};


//make this component available to the app
export default SettingStackNavigator;
