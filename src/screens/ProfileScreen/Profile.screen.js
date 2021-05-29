import { useApolloClient, useMutation } from '@apollo/client'
import { AntDesign } from '@expo/vector-icons'
import { ReactNativeFile } from 'apollo-upload-client'
import * as ImagePicker from 'expo-image-picker'
import * as Permissions from 'expo-permissions'
import React, { useEffect, useState } from 'react'
import { Modal, ScrollView, Text, TouchableOpacity, View } from 'react-native'
import { Avatar, TextInput } from 'react-native-paper'
import Header from '../../components/Header'
import { COLORS, FONTS, SHADOW, SIZES } from '../../constants'
import { URI } from '../../graphql/apollo'
import { UPDATE_USER, USER_INFO } from '../../graphql/user'
import { createImageData } from '../../helpers/fomatImageUpload'
import ChangePassword from './components/ChangePassword';

export default function ProfileScreen() {
    const [text, setText] = React.useState('');
    const [phone, setPhone] = React.useState('');
    const client = useApolloClient();
    const [changePassword, setChangePassword] = useState(false);
    const { user } = client.readQuery({
        query: USER_INFO
    })

    const [updateUser, { loading }] = useMutation(UPDATE_USER, {
        update: (store, { data: { updateUser } }) => {
            try {
                store.writeQuery({
                    query: USER_INFO,
                    data: {
                        user: {
                            ...user,
                            ...updateUser
                        }
                    }
                })
            } catch (error) {
                console.log(error)
            }
        },
        onError: (error) => {
            console.log(error)
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


    const pickImage = async () => {
        let result;
        try {
            result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                aspect: [3, 3],
                quality: 1,
            });
            if (!result.cancelled) {
                let imageData = await createImageData(result);
                let avatar = await new ReactNativeFile(imageData);
                updateUser({
                    variables: {
                        avatar
                    }
                })

            }
        } catch (E) {
            console.log("error", E);
        }
    };

    const handleSubmit = () => {
        updateUser({
            variables: {
                name: text,
                phone: phone
            }
        })
    }
    // 'https://uploads-ssl.webflow.com/5f5f2b58b1af780151375838/6068a513bd18465d0aed85a3_Emxinh2k__anh-gai-dep-hot-girl-sexy-goi-cam%252B%2525287%252529.jpeg'

    return (
        <View>
            <Modal
                animationType="slide"
                transparent={true}
                visible={changePassword}
                onRequestClose={() => {
                    setChangePassword(!changePassword);
                }}
            >
                <ChangePassword
                    modalVisible={changePassword}
                    setModalVisible={() => setChangePassword(false)}
                />
            </Modal>
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
                        {loading ? <Text>Loading</Text> : <>
                            <Avatar.Image size={150} source={{ uri: user?.avatar ? `${URI}/images/${user.avatar}` : 'https://images.daznservices.com/di/library/GOAL/e8/d1/mason-mount-chelsea_1u2vf25gf8pl31mk1yhvfwoxv9.jpg?t=64552568&amp;quality=60&amp;w=800' }} />
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
                        </>}

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
                    <TouchableOpacity
                        style={{ marginVertical: SIZES.padding }}
                        onPress={() => setChangePassword(true)}
                    >
                        <Text
                            style={{
                                ...FONTS.body3,
                                textAlign: 'center'
                            }}
                        >
                            Thay đổi mật khẩu
                        </Text>
                    </TouchableOpacity>
                </View>

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

            </ScrollView>
        </View>
    )
}


// update: (store, { data: { updateUser } }) => {
//     try {
//         const { user } = store.readQuery({
//             query: CURRENT_USER
//         });

//         console.log({
//             ...user, ...updateUser
//         })

//         store.writeQuery({
//             query: CURRENT_USER,
//             data: {
//                 user: {
//                     ...user,
//                     ...updateUser
//                 }
//             }
//         })
//     } catch (error) {
//         console.log(error)
//     }

// }


// , {
//     update(cache, { data: { updateUser } }) {
//         cache.modify({
//             fields: {
//                 user(currentUser = {}) {
//                     const userRef = cache.writeFragment({
//                         data: updateUser,
//                         fragment: gql`
//                         fragment userUpdate on User {
//                             name
//                             phone
//                         }`
//                     })

//                     console.log({
//                         ...user, ...userRef
//                     })

//                     return {
//                         ...user,
//                         ...userRef
//                     }
//                 }
//             }
//         })
//     }
// }