//import liraries
import { useNavigation } from '@react-navigation/core';
import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Avatar } from 'react-native-paper';
import Header from '../../components/Header';
import { COLORS, FONTS, SIZES } from '../../constants';
import { removeStorage } from '../../helpers/storage'

// create a component
const SettingScreen = () => {
    const navigation = useNavigation();

    const handleLogout = async () => {
        await removeStorage()
        navigation.push("Dashboard")
    }
    return (
        <View style={styles.container}>
            <Header title="Cài đặt" left />
            <View
                style={{
                    justifyContent: 'center',
                    alignItems: "center",
                    height: SIZES.height / 3,
                }}
            >
                <Avatar.Image size={150} source={{ uri: 'https://images.daznservices.com/di/library/GOAL/e8/d1/mason-mount-chelsea_1u2vf25gf8pl31mk1yhvfwoxv9.jpg?t=64552568&amp;quality=60&amp;w=800' }} />
                <Text
                    style={{
                        ...FONTS.body2,
                        marginTop: SIZES.base
                    }}
                >Lâm Tuấn Khải</Text>
            </View>
            <View>
                <TouchableOpacity
                    style={{
                        paddingHorizontal: SIZES.padding,
                        paddingVertical: SIZES.padding / 2,
                        backgroundColor: COLORS.white,
                        marginBottom: SIZES.padding / 2
                    }}
                    onPress={() => navigation.push('ProfileScreen')}
                >
                    <Text
                        style={{
                            ...FONTS.body3
                        }}
                    >
                        Thông tin tài khoản
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={{
                        paddingHorizontal: SIZES.padding,
                        paddingVertical: SIZES.padding / 2,
                        backgroundColor: COLORS.white,
                        marginBottom: SIZES.padding / 2
                    }}
                    onPress={handleLogout}
                >
                    <Text
                        style={{
                            ...FONTS.body3
                        }}
                    >
                        Đăng xuất
                    </Text>
                </TouchableOpacity>
            </View>

        </View >
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
