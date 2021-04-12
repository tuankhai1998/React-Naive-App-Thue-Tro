//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import Header from '../../components/Header';

// create a component
const Messages = () => {
    return (
        <View style={{ flex: 1 }}>
            <Header title="Tin nhắn" left />
            <ScrollView style={{ flex: 1 }}></ScrollView>
            <Text>this is th e screen </Text>
        </View>
    );
};



//make this component available to the app
export default Messages;
