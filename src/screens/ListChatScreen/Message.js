//import liraries
import { useRoute } from '@react-navigation/core';
import React, { Component } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import Header from '../../components/Header';
import ChatList from './components/ChatList';

// create a component
const Messages = () => {
    const router = useRoute();
    const { _id, userId } = router.params;
    console.log({ _id, userId })
    return (
        <View style={{ flex: 1 }}>
            <Header title="Tin nhắn" left />
            <ChatList />
        </View>
    );
};



//make this component available to the app
export default Messages;
