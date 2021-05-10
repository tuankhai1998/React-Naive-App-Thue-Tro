//import liraries
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import React from 'react';
import HomeScreen from '../../screens/HomeScreen/Home.screen';
import CreateProduct from '../../screens/CreateProduct/CreateProduct.screen';

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
            <HomeStack.Screen name="CreateProduct" component={CreateProduct} />
        </HomeStack.Navigator >
    );
};


//make this component available to the app
export default HomeStackNavigator;
