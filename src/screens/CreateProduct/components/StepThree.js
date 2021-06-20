import { ReactNativeFile } from 'apollo-upload-client';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import React, { useEffect, useState } from 'react';
import { FlatList, Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { COLORS, FONTS, SIZES } from '../../../constants';
import { createImageData } from '../../../helpers/fomatImageUpload';
import { MaterialIcons } from '@expo/vector-icons'
import Utility from '../../../components/Utility';
import { Ionicons } from '@expo/vector-icons';

export default function StepThree({ data, setData, setValidate }) {
    const { images, utilities } = data
    const [imgResult, setImgResult] = useState([]);
    const [imageList, setImageList] = useState([])

    useEffect(() => {
        if (images) {
            setImageList(images)
        }
        const getPermissionAsync = async () => {
            const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
            if (status !== 'granted') {
                setErrorMsg('Permission to access location was denied');
            }
        }
        getPermissionAsync()
    }, [])

    useEffect(() => {
        let dataImage = imageList.map((image) => {
            if (typeof (image) === 'object') {
                return new ReactNativeFile(image)
            }
            return
        }).filter(item => item !== undefined)
        if (imageList.length > 4) setValidate(true)
        if (imageList.length < 4) setValidate(false)
        setImgResult(dataImage)
    }, [imageList])

    useEffect(() => {
        setData({
            ...data,
            images: imgResult
        })
    }, [imgResult])

    const handleRemoveImage = (index) => {
        let newListImage = [...imageList];
        newListImage.splice(index, 1);
        setImageList(newListImage)
    }

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
                <TouchableOpacity
                    style={{
                        position: 'absolute',
                        top: 0,
                        right: 0,
                        zIndex: 100
                    }}
                    onPress={() => handleRemoveImage(index)}
                >
                    <Ionicons name="close-circle" size={24} color={COLORS.primary} />
                </TouchableOpacity>
                <Image style={{ width: '100%', height: '100%', }} source={{ uri: item.uri || item }} />
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
                setImageList([...imageList, imgData]);
            }
        } catch (E) {
            console.log("error", E);
        }
    };
    return (
        <View>
            <Utility
                handleUtilitiesSelect={(values) => setData({ ...data, utilities: values })}
                utilitiesSelected={utilities ? utilities : []}
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
                            data={imageList}
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
