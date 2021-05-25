//import liraries
import React, { Component, useState } from 'react';
import { View, Text, StyleSheet, TextInput } from 'react-native';
import { Checkbox } from 'react-native-paper';
import RadioButton from '../../../components/RadioButton';
import SubText from '../../../components/SubTexxt';
import { COLORS, FONTS, SIZES } from '../../../constants';
import { RoomType, Sex } from '../../../constants/values';

// create a component
const StepFour = ({ data, setData }) => {



    return (
        <>
            <View style={{
                flex: 1,
                padding: SIZES.padding
            }}>

                <Text
                    style={{
                        ...FONTS.body3,
                    }}
                >
                    Tiêu đề bài đăng
                </Text>
                <View
                    style={{
                        flexDirection: 'row',
                        alignItems: 'baseline'
                    }}
                >
                    <TextInput
                        style={{
                            backgroundColor: COLORS.white,
                            paddingHorizontal: SIZES.base,
                            flex: 1,
                            marginRight: SIZES.padding,
                            marginVertical: SIZES.base,
                            borderRadius: SIZES.radius / 2,
                            paddingVertical: SIZES.base,
                            maxWidth: SIZES.width * 2 / 3 - 2 * SIZES.padding
                        }}

                    />

                </View>

                <Text
                    style={{
                        ...FONTS.body3,
                    }}
                >
                    Nội dung mô tả
                </Text>
                <View
                    style={{
                        flexDirection: 'row',
                        alignItems: 'baseline'
                    }}
                >
                    <TextInput
                        style={{
                            backgroundColor: COLORS.white,
                            paddingHorizontal: SIZES.base,
                            flex: 1,
                            marginRight: SIZES.padding,
                            marginVertical: SIZES.base,
                            borderRadius: SIZES.radius / 2,
                            paddingVertical: SIZES.base,
                            maxWidth: SIZES.width * 2 / 3 - 2 * SIZES.padding
                        }}

                    />
                </View>



            </View>
        </>
    );
};


//make this component available to the app
export default StepFour;
