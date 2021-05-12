//import liraries
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import React from 'react';
import ProfileScreen from '../../screens/ProfileScreen/Profile.screen';
import SettingScreen from '../../screens/SettingScreen/Setting.screen';

const SettingStack = createStackNavigator();


// create a component
const SettingStackNavigator = () => {
    return (
        <SettingStack.Navigator
            options={
                { ...TransitionPresets.ModalSlideFromBottomIOS }  // tao truyen giua cac stack nhu trong ios
            }
            screenOptions={{
                headerShown: false
            }}
        >
            <SettingStack.Screen name="SettingScreen" component={SettingScreen} />
            <SettingStack.Screen name="ProfileScreen" component={ProfileScreen} />
        </SettingStack.Navigator>
    );
};


//make this component available to the app
export default SettingStackNavigator;
