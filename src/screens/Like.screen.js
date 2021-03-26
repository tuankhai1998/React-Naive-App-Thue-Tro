//import liraries
import React from 'react';
import { StyleSheet, View } from 'react-native';
import Header from '../components/Header';
import { COLORS } from '../constants';

// create a component
const LikeScreen = () => {
    return (
        <View style={styles.container}>
            <Header title="Like" />
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
export default LikeScreen;
