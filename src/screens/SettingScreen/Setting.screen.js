//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Header from '../../components/Header';

// create a component
const SettingScreen = () => {
    return (
        <View style={styles.container}>
            <Header title="Cài đặt" left />
            <Text>SettingScreen</Text>
        </View>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,

    },
});

//make this component available to the app
export default SettingScreen;
