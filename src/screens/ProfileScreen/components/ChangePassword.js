import React from 'react';
import { Alert, Text, TouchableOpacity, View } from 'react-native';
import { TextInput } from 'react-native-paper';
import { COLORS, FONTS, SHADOW, SIZES } from '../../../constants';
import { MaterialIcons } from '@expo/vector-icons';
import { useMutation } from '@apollo/client';
import { UPDATE_USER } from '../../../graphql/user';

export default function ChangePassword({ modalVisible, setModalVisible }) {

    const [currentPass, setCurrentPass] = React.useState('');
    const [newPass, setNewPass] = React.useState('');
    const [confirmPass, setConfirmPass] = React.useState('');
    const [error, setError] = React.useState('');
    const [updatePassWord, { loading, error: updateError }] = useMutation(UPDATE_USER, {
        onCompleted: () => {
            Alert.alert("update password completed.")
            setModalVisible(false)
        }
    })

    const handleSubmit = () => {
        if (!currentPass) {
            setError("Password cannot be empty.")
            return
        }
        if (!newPass) {
            setError("New password cannot be empty.")
            return
        }
        if (!confirmPass) {
            setError("Confirm new password cannot be empty.")
            return
        }
        if (newPass !== confirmPass) {
            setError("Confirm new password didn't match try again.")
            return
        }

        updatePassWord({
            variables: {
                password: currentPass,
                newPassword: newPass
            }
        })
    }

    const renderError = React.useCallback(() => {
        let messageError = "";

        if (error) {
            messageError = error
        }
        if (updateError) {
            messageError = updateError.message
        }
        if (messageError) {
            return (
                <View
                    style={{
                        justifyContent: 'center',
                        alignItems: 'center'

                    }}
                >
                    <MaterialIcons name="error-outline" size={40} color={COLORS.Google} />
                    <Text
                        style={{
                            textAlign: 'center',
                            ...FONTS.body3,
                            color: COLORS.Google
                        }}
                    >{messageError}</Text>
                </View>
            )
        }
    }, [error, updateError])


    console.log(updateError)
    return (
        <TouchableOpacity
            style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.1)' }}
            onPress={() => { setModalVisible(); }}
            activeOpacity={1}
        >

            <View
                style={{
                    width: SIZES.width - SIZES.padding * 2,
                    borderRadius: SIZES.radius,
                    maxHeight: SIZES.height * 3 / 4,
                    ...SHADOW.shadow1,
                    padding: SIZES.padding,
                    backgroundColor: COLORS.white
                }}
            >
                {renderError()}
                <TextInput
                    label="Password"
                    value={currentPass}
                    onChangeText={text => setCurrentPass(text)}
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
                    secureTextEntry={true}
                />


                <TextInput
                    label="New password"
                    value={newPass}
                    onChangeText={text => setNewPass(text)}
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
                    secureTextEntry={true}
                />


                <TextInput
                    label="Confirm new password"
                    value={confirmPass}
                    onChangeText={text => setConfirmPass(text)}
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

                    secureTextEntry={true}
                />

                <View
                    style={{
                        paddingHorizontal: SIZES.padding
                    }}
                >
                    <TouchableOpacity
                        style={{
                            justifyContent: 'center',
                            alignItems: 'center',
                            paddingVertical: SIZES.padding,
                            backgroundColor: COLORS.primary,
                            borderRadius: SIZES.radius / 2
                        }}
                        onPress={handleSubmit}
                    >
                        <Text
                            style={{
                                ...FONTS.body3
                            }}
                        >
                            Thay đổi
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </TouchableOpacity >
    )
}
