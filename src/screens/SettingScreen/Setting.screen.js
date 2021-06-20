//import liraries
import { useLazyQuery } from '@apollo/client';
import { useApolloClient } from '@apollo/react-hooks';
import { useFocusEffect, useNavigation } from '@react-navigation/core';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { AuthContext } from '../../components/AuthContext';
import Header from '../../components/Header';
import { COLORS, FONTS, SIZES } from '../../constants';
import { USER_INFO } from '../../graphql/user';
import { removeStorage } from '../../helpers/storage';


// create a component
const SettingScreen = () => {
    const navigation = useNavigation();
    const client = useApolloClient();
    const { logOut } = React.useContext(AuthContext)

    const handleLogout = async () => {
        try {
            await removeStorage()
            client.clearStore().then(() => {
                client.resetStore();
                logOut();
            })

        } catch (error) {
            console.log(error)
        }

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
