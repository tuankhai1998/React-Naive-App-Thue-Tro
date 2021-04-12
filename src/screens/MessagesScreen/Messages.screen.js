//import liraries
import { useNavigation } from '@react-navigation/core';
import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Header from '../../components/Header';
import { COLORS, SIZES } from '../../constants';

// create a component
const MessagesScreen = () => {
    return (
        <View style={styles.container}>
            <Header title="Tin nhắn" />
            <View>
                <TouchableOpacity
                    style={{
                        padding: SIZES.padding,
                    }}
                >
                    <Image source={{ uri: 'https://loremflickr.com/320/240' }}
                        style={{
                            width: SIZES.padding * 3,
                            height: SIZES.padding * 3,
                            borderRadius: SIZES.padding * 1.5
                        }}
                    />
                    <View>
                        <Text>Nguyễn Thị T</Text>
                        <Text>lorem text lorem text lorem text </Text>
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.white,
    },
});

//make this component available to the app
export default MessagesScreen;
