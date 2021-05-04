
//import liraries
import { useLazyQuery } from '@apollo/client';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import { useEffect } from 'react/cjs/react.development';
import { CURRENT_USER } from '../graphql/user';
import HomeStackNavigator from './stacknavigator/HomeStackNavigator';
import LikeStackNavigator from './stacknavigator/LikeStackNavigatior';
import MessagesStackNavigator from './stacknavigator/MessagesStackNavigatior';
import SettingStackNavigator from './stacknavigator/SettingStackNavigator';
import { removeStorage } from '../helpers/storage'
const Tab = createBottomTabNavigator();

// create a component
const BottomTabNavigator = ({ handleLogin }) => {
    const [getCurrentUser, { data, loading, error }] = useLazyQuery(CURRENT_USER);
    useEffect(() => {
        if (!error) {
            getCurrentUser()
        } else {
            removeStorage().then(
                () => {
                    handleLogin(false)
                }
            ).catch(err => console.log(err))
        }
    }, [data])

    const getTabBarVisible = (route) => {
        const routeName = route.state
            ? route.state.routes[route.state.index].name
            : route.params?.screen || 'ListMessage';

        if (routeName !== 'ListMessage') {
            return false;
        }
        return true;
    }


    return (
        <>
            <Tab.Navigator>
                <Tab.Screen name="Home" component={HomeStackNavigator} />
                <Tab.Screen name="Like" component={LikeStackNavigator} />
                <Tab.Screen name="Messages" component={MessagesStackNavigator}
                    options={({ route }) => ({
                        tabBarVisible: getTabBarVisible(route)
                    })} />
                <Tab.Screen name="Settings" component={SettingStackNavigator} />
            </Tab.Navigator>
        </>
    );
};

// define your styles


//make this component available to the app
export default BottomTabNavigator;
