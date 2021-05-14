import { useApolloClient, useMutation } from '@apollo/client'
import { AntDesign } from '@expo/vector-icons'
import * as ImagePicker from 'expo-image-picker'
import * as Permissions from 'expo-permissions'
import React, { useEffect } from 'react'
import { ScrollView, Text, TouchableOpacity, View } from 'react-native'
import { Avatar, TextInput } from 'react-native-paper'
import Header from '../../components/Header'
import { COLORS, FONTS, SHADOW, SIZES } from '../../constants'
import { CURRENT_USER, UPDATE_USER } from '../../graphql/user'

export default function ProfileScreen() {
    const [text, setText] = React.useState('');
    const [phone, setPhone] = React.useState('');
    const client = useApolloClient();
    const { user } = client.readQuery({
        query: CURRENT_USER
    })

    const [updateUser, { loading, error, data }] = useMutation(UPDATE_USER, {
        update(cache, { data: { updateUser } }) {
            cache.modify({
                fields: {
                    user() {
                        const userUpdated = cache.writeFragment({
                            data: updateUser
                        })
                        return {
                            ...userUpdated
                        }
                    }
                }
            })
        }
    })

    useEffect(() => {
        setText(user?.name ? user?.name : '')
        setPhone(user?.phone ? user?.phone : '')
    }, [user])

    useEffect(() => {
        const getPermissionAsync = async () => {
            const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);

            if (status !== 'granted') {
                setErrorMsg('Permission to access location was denied');
            }

        }
        getPermissionAsync()
    }, [])


    const createImageData = (result) => {
        // ImagePicker saves the taken photo to disk and returns a local URI to it
        let localUri = result.uri;
        let filename = localUri.split('/').pop();

        // Infer the type of the image
        let match = /\.(\w+)$/.exec(filename);
        let type = match ? `image/${match[1]}` : `image`;

        return { uri: Platform.OS === "android" ? localUri : localUri.replace("file://", ""), name: filename, type };

    }


    const pickImage = async () => {
        try {
            let result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                aspect: [3, 3],
                quality: 1,
            });
            if (!result.cancelled) {
                updateUser({
                    variables: {
                        profile: {
                            avatar: createImageData(result)
                        }
                    }
                })
            }
        } catch (E) {
            console.log(E);
        }
    };

    console.log({
        user,
        loading,
        error,
        data
    })

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
                        <Avatar.Image size={150} source={{ uri: user?.avatar ? user?.avatar : 'https://images.daznservices.com/di/library/GOAL/e8/d1/mason-mount-chelsea_1u2vf25gf8pl31mk1yhvfwoxv9.jpg?t=64552568&amp;quality=60&amp;w=800' }} />
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
                            onPress={pickImage}
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
                        label="Họ tên"
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
                        defaultValue=""

                    />

                    <TextInput
                        label="Số điện thoại"
                        value={phone}
                        onChangeText={text => setPhone(text)}
                        mode='outlined'
                        style={{
                            color: COLORS.secondary,
                            backgroundColor: COLORS.white
                        }}
                        keyboardType='number-pad'
                    />
                </View>

                <View
                    style={{
                        padding: SIZES.padding
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

            </ScrollView>
        </View>
    )
}
