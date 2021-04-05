import { Ionicons } from '@expo/vector-icons'
import React from 'react'
import { View, Text, TouchableOpacity, ImageBackground, Image } from 'react-native'
import { COLORS, FONTS, Images, SIZES } from '../constants'
import { useNavigation } from '@react-navigation/core';
import { roomType } from '../constants/variable';


const ItemVerticalList = ({ item, index }) => {
    const navigation = useNavigation();
    return (
        <TouchableOpacity
            style={{
                width: SIZES.containerWidth + SIZES.base,
                minHeight: 50,
                marginBottom: SIZES.padding,
                flexDirection: "row"
            }}

            onPress={() => navigation.push('ProductScreen')}
        >
            <View
                style={{
                    width: SIZES.containerWidth / 2 - SIZES.base / 2,
                    height: (SIZES.containerWidth / 2 - SIZES.base) * 12 / 16,
                    borderRadius: SIZES.radius,
                    overflow: 'hidden'
                }}
            >
                <ImageBackground
                    source={{ uri: item && item.images ? item.images[0] : Images.ImageLoading }}
                    style={{
                        width: '100%',
                        height: "100%",
                    }}
                >
                    <TouchableOpacity
                        style={{
                            marginTop: 5,
                            marginLeft: 'auto',
                            marginRight: 5,
                            backgroundColor: 'rgba(0,0,0,0.3)',
                            padding: 2,
                            borderRadius: 10
                        }}
                    >
                        <Ionicons name="heart-outline" size={16} color={COLORS.white} />
                        {/* <Ionicons name="heart-sharp" size={24} color="black" /> */}
                    </TouchableOpacity>
                </ImageBackground>
            </View>

            {


                item && item.type && item.address && item.price ? (
                    <View
                        style={{
                            flex: 1,
                            marginLeft: SIZES.base
                        }}
                    >
                        <Text style={{ ...FONTS.body4, textTransform: "uppercase", fontSize: 12 }}>{roomType(item.type)}</Text>
                        <Text style={{ ...FONTS.h4 }} numberOfLines={2}>
                            {`${roomType(item.type)} ${item.address.name.city}, ${item.address.name.districts}`}
                        </Text>
                        <Text
                            style={{
                                ...FONTS.body4,
                                fontWeight: 'bold',
                                color: COLORS.secondary
                            }}
                        >
                            {`${item.price.room.price} triệu/phòng`}
                        </Text>
                        <Text numberOfLines={2} ellipsizeMode='middle'>{`${item.address.name.city}, ${item.address.name.districts}, ${item.address.name.wardsAndStreet}`}</Text>
                    </View>
                ) : (<View
                    style={{
                        flex: 1,
                        marginLeft: SIZES.base
                    }}
                >
                    <View style={{ backgroundColor: COLORS.gray, width: '80%', height: 10, marginTop: SIZES.base / 2 }}></View>
                    <View style={{ backgroundColor: COLORS.gray, width: '80%', height: 10, marginTop: SIZES.base / 2 }}></View>
                    <View style={{ backgroundColor: COLORS.gray, width: '80%', height: 10, marginTop: SIZES.base / 2 }}></View>
                    <View style={{ backgroundColor: COLORS.gray, width: '60%', height: 10, marginTop: SIZES.base / 2 }}></View>
                    <View style={{ backgroundColor: COLORS.gray, width: '60%', height: 10, marginTop: SIZES.base / 2 }}></View>
                </View>)
            }
        </TouchableOpacity >
    )
}


export default ItemVerticalList;

