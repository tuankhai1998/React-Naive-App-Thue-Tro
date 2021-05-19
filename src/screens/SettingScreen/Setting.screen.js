//import liraries
import { useQuery } from '@apollo/client';
import { useApolloClient } from '@apollo/client';
import { useNavigation } from '@react-navigation/core';
import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Avatar } from 'react-native-paper';
import Header from '../../components/Header';
import { COLORS, FONTS, SIZES } from '../../constants';
import { CURRENT_USER, USER_INFO } from '../../graphql/user';
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
                    paddingVertical: SIZES.padding
                }}

            >
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
