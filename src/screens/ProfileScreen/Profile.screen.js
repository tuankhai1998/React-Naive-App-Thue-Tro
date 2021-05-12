import React, { useEffect } from 'react'
import { View, Text, TouchableOpacity, ScrollView } from 'react-native'
import { Avatar, useTheme } from 'react-native-paper'
import Header from '../../components/Header'
import { COLORS, FONTS, SHADOW, SIZES } from '../../constants'
import { TextInput } from 'react-native-paper';
import { AntDesign } from '@expo/vector-icons';

export default function ProfileScreen() {
    const [text, setText] = React.useState('');

    useEffect(() => {
        getPermissionAsync()
    }, [])

    const getPermissionAsync = async () => {
        const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);

        if (status !== 'granted') {
            setErrorMsg('Permission to access location was denied');
        }

    }
    return (
        <View>
            <Header title="Thông tin tài khoản" left />
            <ScrollView
                style={{
                    height: SIZES.height
                }}>
                <View
                    style={{
                        justifyContent: 'center',
                        alignItems: "center",
                        height: SIZES.height / 3,
                    }}
                >
                    <View>
                        <Avatar.Image size={150} source={{ uri: 'https://images.daznservices.com/di/library/GOAL/e8/d1/mason-mount-chelsea_1u2vf25gf8pl31mk1yhvfwoxv9.jpg?t=64552568&amp;quality=60&amp;w=800' }} />
                        <TouchableOpacity
                            style={{
                                position: 'absolute',
                                bottom: 10,
                                right: 10,
                                backgroundColor: COLORS.white,
                                padding: SIZES.base / 2,
                                borderRadius: SIZES.base,
                                ...SHADOW.shadow1
                            }}
                        >
                            <AntDesign name="retweet" size={24} color="black" />
                        </TouchableOpacity>
                    </View>

                </View>

                <View
                    style={{
                        padding: SIZES.padding
                    }}
                >

                    <TextInput
                        label="Hộ tên"
                        value={text}
                        onChangeText={text => setText(text)}
                        mode='outlined'
                        style={{
                            color: COLORS.secondary,
                            backgroundColor: COLORS.white,
                            marginBottom: SIZES.padding
                        }}
                        theme={{
                            colors: {
                                text: COLORS.primaryTextColor,
                                background: COLORS.secondary
                            }
                        }}

                    />

                    <TextInput
                        label="Số điện thoại"
                        value={text}
                        onChangeText={text => setText(text)}
                        mode='outlined'
                        style={{
                            color: COLORS.secondary,
                            backgroundColor: COLORS.white
                        }}


                    />
                </View>

            </ScrollView>
        </View>
    )
}
