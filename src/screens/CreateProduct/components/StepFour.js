//import liraries
import { useApolloClient } from '@apollo/client';
import React, { useEffect, useState } from 'react';
import { Text, TextInput, View } from 'react-native';
import { COLORS, FONTS, SIZES } from '../../../constants';
import { RoomType } from '../../../constants/values';
import { USER_INFO } from '../../../graphql/user';

// create a component
const StepFour = ({ data, setData, address }) => {

    const { type, phone, description, roomName: title } = data;
    const { name } = address;
    const { city, districts, wardsAndStreet } = name;


    const [roomName, setRoomName] = useState(`Cho thuê ${wardsAndStreet}, ${districts}, ${city}`);

    useEffect(() => {
        setData({ ...data, roomName })
    }, [roomName])

    useEffect(() => {
        console.log(title)
        setRoomName(title)
    }, [])


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
                            marginVertical: SIZES.base,
                            borderRadius: SIZES.radius / 2,
                            paddingVertical: SIZES.base,

                        }}
                        value={roomName}
                        onChangeText={(text) => setRoomName(text)}
                    />

                </View>

                <Text
                    style={{
                        ...FONTS.body3,
                    }}
                >
                    Số điện thoại
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
                            marginVertical: SIZES.base,
                            borderRadius: SIZES.radius / 2,
                            paddingVertical: SIZES.base,

                        }}
                        value={phone}
                        onChangeText={(text) => { setData({ ...data, phone: text }) }}
                        keyboardType="phone-pad"
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
                            marginVertical: SIZES.base,
                            borderRadius: SIZES.radius / 2,
                            paddingVertical: SIZES.base,
                            height: 100,
                            justifyContent: "flex-start",
                            textAlignVertical: 'top'

                        }}
                        value={description}
                        onChangeText={(text) => { setData({ ...data, description: text }) }}
                        multiline={true}
                        numberOfLines={4}
                    />
                </View>
            </View>
        </>
    );
};


//make this component available to the app
export default StepFour;
