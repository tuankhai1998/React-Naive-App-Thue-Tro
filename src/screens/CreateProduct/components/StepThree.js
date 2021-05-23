import { ReactNativeFile } from 'apollo-upload-client';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import React, { useEffect, useState } from 'react';
import { FlatList, Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { COLORS, FONTS, SIZES } from '../../../constants';
import { createImageData } from '../../../helpers/fomatImageUpload';
import Utility from '../../SearchScreen/components/Utility';
import { MaterialIcons } from '@expo/vector-icons'

export default function StepThree() {
    const [listUtility, setListUtility] = useState([]);

    const [imgResult, setImgResult] = useState([]);
    const [images, setImages] = useState([])

    useEffect(() => {
        const getPermissionAsync = async () => {
            const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);

            if (status !== 'granted') {
                setErrorMsg('Permission to access location was denied');
            }

        }
        getPermissionAsync()
    }, [])

    const imagesItem = ({ item, index }) => {
        return (
            <View
                key={index}
                style={{
                    width: (SIZES.width - SIZES.padding * 2 - 2 * SIZES.base) / 3,
                    height: SIZES.height / 8 - SIZES.padding / 2,
                    marginBottom: SIZES.padding / 2,
                    marginHorizontal: index % 3 == 1 ? SIZES.base : 0,
                    zIndex: 10
                }}
            >
                < Image style={{ width: '100%', height: '100%', }} source={{ uri: item }} />
            </View>
        )
    }


    const pickImage = async () => {
        try {
            const result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                aspect: [4, 3],
                quality: 1,
            });
            if (!result.cancelled) {
                let imgData = await createImageData(result)
                setImgResult([...imgResult, new ReactNativeFile(imgData)])
                setImages([...images, result.uri]);
            }
        } catch (E) {
            console.log(E);
        }
    };
    return (
        <View>
            <Utility
                handleUtilitiesSelect={(values) => setListUtility(values)}
                utilitiesSelected={listUtility}
            />

            <View style={{ flex: 1, paddingHorizontal: SIZES.padding }}>
                <View style={{ width: "100%" }}>
                    <Text style={{ fontWeight: 'bold', fontSize: 16, color: COLORS.primary }}>Đăng ảnh: </Text>
                </View>
                <View
                    style={{
                        flexWrap: 'wrap',
                        justifyContent: 'flex-start',
                        borderStyle: 'dotted',
                        borderWidth: 1,
                        borderColor: COLORS.primaryTextColor,
                        height: SIZES.height / 4,
                        marginBottom: SIZES.padding
                    }}

                >
                    <ScrollView
                        style={{
                            width: '100%',
                            height: '100%',
                        }}
                    >

                        <FlatList
                            contentContainerStyle={{ alignSelf: 'flex-start' }}
                            numColumns={3}
                            showsVerticalScrollIndicator={false}
                            showsHorizontalScrollIndicator={false}
                            data={images}
                            renderItem={imagesItem}
                        />
                    </ScrollView>


                    <MaterialIcons name="add-photo-alternate" size={100} color="black" style={{
                        position: 'absolute',
                        top: SIZES.height / 8 - 50,
                        left: (SIZES.width - 2 * SIZES.padding) / 2 - 50,
                        zIndex: -1
                    }} />



                </View>
                <TouchableOpacity
                    activeOpacity={1}
                    onPress={() => pickImage()}
                >

                    <Text
                        style={{
                            textAlign: 'center',
                            ...FONTS.body3,
                            color: COLORS.blue
                        }}
                    >
                        Thêm hình ảnh
                        </Text>
                </TouchableOpacity>

                <Text
                    style={{
                        width: '100%',
                        textAlign: 'center',
                        fontSize: 16,
                        fontWeight: 'bold',
                        color: COLORS.primaryTextColor,
                        marginVertical: SIZES.base
                    }}
                >Cần đăng tối thiểu 5 ảnh về căn phòng</Text>
            </View>
        </View >
    )
}
