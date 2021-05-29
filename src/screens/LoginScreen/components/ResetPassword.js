import { useLazyQuery } from '@apollo/client';
import { MaterialIcons } from '@expo/vector-icons';
import React from 'react';
import { Alert, Text, TouchableOpacity, View } from 'react-native';
import { TextInput } from 'react-native-paper';
import { COLORS, FONTS, SHADOW, SIZES } from '../../../constants';
import { RESET_PASSWORD } from '../../../graphql/user';

export default function ResetPassword({ modalVisible, setModalVisible }) {

    const [email, setEmail] = React.useState(''),
        [error, setError] = React.useState('')

    const [resetPassword, { loading, error: resetPasswordError }] = useLazyQuery(RESET_PASSWORD, {
        onCompleted: () => {
            Alert.alert("reset password completed.")
            setModalVisible(false)
        }
    })
    const regex = new RegExp('/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/');

    console.log({
        resetPasswordError,
        loading
    })

    const handleSubmit = () => {
        if (!email) {
            setError("Email cannot be empty.")
            return
        }
        if (regex.test(email)) {
            setError("Invalid email.")
            return
        }

        console.log("hahah")
        resetPassword({
            variables: {
                email
            }
        })
    }

    const renderError = React.useCallback(() => {
        let messageError = "";

        if (error) {
            messageError = error
        }
        if (resetPasswordError) {
            messageError = resetPasswordError.message
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
    }, [error, resetPasswordError])

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
                <Text
                    style={{
                        textAlign: 'center',
                        ...FONTS.body2
                    }}
                >Reset Password</Text>
                {renderError()}
                <TextInput
                    label="Email"
                    value={email}
                    onChangeText={text => setEmail(text)}
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
                            Reset password
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </TouchableOpacity >
    )
}
