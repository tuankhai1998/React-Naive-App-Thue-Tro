//import liraries
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import ProfileScreen from '../../screens/Profile.screen';

const ProfileStack = createStackNavigator();


// create a component
const ProfileStackNavigator = () => {
    return (
        <ProfileStack.Navigator>
            <ProfileStack.Screen name="ProfileScreen" component={ProfileScreen} />
        </ProfileStack.Navigator>
    );
};


//make this component available to the app
export default ProfileStackNavigator;
