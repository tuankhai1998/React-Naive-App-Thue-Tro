//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import RadioButton from '../../../components/RadioButton';
import { FONTS, SIZES } from '../../../constants';
import { RoomType } from '../../../constants/values';

// create a component
const StepOne = () => {
    return (
        <View style={{
            flex: 1,
            padding: SIZES.padding
        }}>
            <Text
                style={{
                    ...FONTS.body3,
                }}
            >
                Loại phòng
            </Text>
            <RadioButton data={RoomType} selected={} />
        </View>
    );
};


//make this component available to the app
export default StepOne;
