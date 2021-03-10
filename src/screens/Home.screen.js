//import liraries
import React from 'react';
import { Text, View } from 'react-native';
import Header from '../components/Header';

// create a component
const HomeScreen = () => {
    return (
        <View>
            <Header title="Home"/>
            <Text>HomeScreen</Text>
        </View>
    );
};


//make this component available to the app
export default HomeScreen;
