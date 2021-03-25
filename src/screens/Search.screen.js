import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/core';
import React, { useState } from 'react'
import { View, Text, SafeAreaView, TouchableOpacity, FlatList, Image } from 'react-native'
import { COLORS, FONTS, Images, SIZES } from '../constants';
import { AntDesign } from '@expo/vector-icons';

export default function SearchScreen() {
    let [modalVisible, setModalVisible] = useState(false),
        [data, setData] = useState([1, 2])
    const navigation = useNavigation();

    const renderHeader = () => {
        return (
            <View
                style={{
                    flexDirection: 'row',
                    paddingHorizontal: SIZES.padding,
                    paddingVertical: SIZES.base,
                    alignItems: 'center',
                    marginTop: SIZES.height * 1 / 20,
                    backgroundColor: COLORS.white
                }}
            >
                <View
                    style={{
                        flexDirection: "row",
                        backgroundColor: "#D0D0D0",
                        borderRadius: SIZES.radius,
                        overflow: "hidden",
                        flex: 1,
                        borderColor: COLORS.primary,
                        borderWidth: 2
                    }}
                >
                    <TouchableOpacity
                        style={{
                            backgroundColor: "#BEBEBE",
                            borderRadius: SIZES.radius,
                            flexDirection: 'row',
                            padding: SIZES.base,
                            alignItems: 'center'
                        }}
                        onPress={() => setModalVisible(!modalVisible)}
                    >
                        <MaterialCommunityIcons name="map-marker" size={17} color={COLORS.secondary} />
                        <Text style={{
                            color: COLORS.secondary,
                            ...FONTS.body4
                        }}>Hà Nội</Text>
                    </TouchableOpacity>
                    {/* Input */}
                    <TouchableOpacity
                        style={{
                            flex: 1,
                            justifyContent: 'center',
                            marginHorizontal: SIZES.base,
                            borderRadius: SIZES.borderRadius
                        }}

                    >
                        <Text style={{ color: COLORS.white, ...FONTS.body4, overflow: 'hidden' }}>Tìm theo địa chỉ</Text>
                    </TouchableOpacity>
                </View>
                <TouchableOpacity
                    onPress={() => navigation.goBack()}
                >
                    <Text
                        style={{
                            color: COLORS.primaryTextColor,
                            ...FONTS.body4,
                            padding: SIZES.base
                        }}
                    >
                        Hủy
                    </Text>
                </TouchableOpacity>
            </View>
        )
    }

    const renderItemSearch = ({ item }) => {
        return (
            <TouchableOpacity
                style={{
                    flexDirection: 'row',
                    marginHorizontal: SIZES.base / 2,
                    padding: SIZES.base,
                    alignItems: 'center'
                }}
            >
                <AntDesign name="clockcircleo" size={18} color="black" />
                <Text
                    style={{
                        marginLeft: SIZES.base
                    }}
                >{item}</Text>
            </TouchableOpacity>
        )
    }

    const renderItem = ({ item }) => {
        return (
            <TouchableOpacity
                style={{
                    flexDirection: 'row',
                    marginBottom: SIZES.base,
                    backgroundColor: COLORS.white,
                    borderRadius: SIZES.radius / 2
                }}
            >
                <Image source={Images.DONGDA} style={{ width: SIZES.width / 4, height: SIZES.width / 4, borderRadius: SIZES.radius / 2 }} />
                <View
                    style={{
                        flex: 1,
                        marginLeft: SIZES.base,
                        paddingHorizontal: SIZES.base
                    }}
                >
                    <View
                        style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between'
                        }}
                    >
                        <Text style={{ ...FONTS.body4, textTransform: "uppercase", fontSize: 12 }}>Tìm người thuê</Text>
                        <Text
                            style={{
                                ...FONTS.body4,
                                fontWeight: 'bold',
                                color: COLORS.secondary
                            }}
                        >
                            1.2 triệu/phòng
        </Text>
                    </View>

                    <Text style={{ ...FONTS.h4 }} numberOfLines={2}>
                        Phòng cho thuê ở Duy Tân quận Cầu Giấy
        </Text>

                    <Text numberOfLines={2} ellipsizeMode='middle'>3A, ngõ 82, Duy Tân, Dịch Vọng Hậu, Cầu Giấy</Text>
                </View>
            </TouchableOpacity>
        )
    }

    return (
        <View
            style={{
                flex: 1,
                backgroundColor: 'rgba(0,0,0,0.1)',

            }}
        >

            {renderHeader()}
            {
                data ? (
                    <View
                        style={{
                            padding: SIZES.base
                        }}
                    >
                        <FlatList
                            data={data}
                            renderItem={renderItem}
                        />

                    </View>
                ) : (
                    <View
                        style={{
                            padding: SIZES.base
                        }}
                    >
                        <Text style={{ ...FONTS.h4 }}>Lịch sử tìm kiếm</Text>
                        <FlatList
                            data={[1, 2]}
                            renderItem={renderItemSearch}
                            keyExtractor={item => item.id}
                        />

                    </View>
                )
            }
        </View >
    )
}
