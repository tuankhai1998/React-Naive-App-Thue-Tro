import { AntDesign, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/core';
import React, { useState, useEffect } from 'react';
import { useCallback } from 'react';
import { FlatList, Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { COLORS, FONTS, Images, SIZES } from '../../constants';
import PriceRate from './components/PriceRate';

export default function SearchScreen() {
    let [modalVisible, setModalVisible] = useState(false),
        [data, setData] = useState([1, 2]),
        [searching, setSearching] = useState(false),
        [multiSearch, setMultiSearch] = useState('price'),
        [dataSearch, setDataSearch] = useState({
            addressName: "",
            priceRate: {
                max: "15",
                min: "12"
            },
            type: "",
            numPeople: {
                num: 1,
                sex: 0
            },
            utilities: [
                'Thú cưng',
                'Ban công',
                'WC riêng'
            ]
        });

    let formatDataSearchToArray = () => {
        let { priceRate, type, utilities, numPeople } = dataSearch;
        let arrayDataSearch = []
        if (priceRate.max && priceRate.min) arrayDataSearch.push(`${priceRate.min} - ${priceRate.max} triệu`)
        if (type) arrayDataSearch.push(`${type}`)
        if (utilities) arrayDataSearch = [...arrayDataSearch, ...utilities]
        if (numPeople.num !== 1 || numPeople.sex !== 0) arrayDataSearch.push(`${numPeople.num} người, giới tính ${sex == 0 ? 'tất cả' : sex == 1 ? 'nam' : 'nữ'}`)
        return arrayDataSearch
    }

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
                        paddingHorizontal: SIZES.base,
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

    const renderMultiSearch = () => {
        return (
            <>
                <View
                    style={{
                        flexDirection: 'row',
                        height: SIZES.width / 10,
                        backgroundColor: COLORS.white,
                        paddingHorizontal: SIZES.base
                    }}
                >
                    <TouchableOpacity
                        style={{ flexDirection: 'row', alignItems: 'center', marginRight: SIZES.base }}
                        onPress={() => {
                            setSearching(!searching);
                            setMultiSearch('price')
                        }}
                    >
                        <Text style={{ ...FONTS.body3 }}>
                            Giá
                        </Text>
                        <Ionicons name="chevron-down" size={16} color="black" style={{
                            paddingHorizontal: SIZES.base / 2
                        }} />
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={{ flexDirection: 'row', alignItems: 'center', marginRight: SIZES.base }}
                    >
                        <Text style={{ ...FONTS.body3 }}>
                            Loại phòng
                        </Text>
                        <Ionicons name="chevron-down" size={16} color="black" style={{
                            paddingHorizontal: SIZES.base / 2
                        }} />
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={{ flexDirection: 'row', alignItems: 'center', marginRight: SIZES.base }}
                    >
                        <Text style={{ ...FONTS.body3 }}>
                            Tiện ích
                        </Text>
                        <Ionicons name="chevron-down" size={16} color="black" style={{
                            paddingHorizontal: SIZES.base / 2
                        }} />
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={{ flexDirection: 'row', alignItems: 'center', marginRight: SIZES.base }}
                    >
                        <Text style={{ ...FONTS.body3 }}>
                            Số người
                        </Text>
                        <Ionicons name="chevron-down" size={16} color="black" style={{
                            paddingHorizontal: SIZES.base / 2
                        }} />
                    </TouchableOpacity>


                </View>
                <View>

                    {
                        formatDataSearchToArray().length > 0 ? (
                            <ScrollView
                                horizontal
                                style={{
                                    width: SIZES.width,
                                    height: SIZES.width / 10,
                                    marginVertical: SIZES.base / 2
                                }}
                                showsHorizontalScrollIndicator={false}
                            >
                                {
                                    formatDataSearchToArray().map(item => (
                                        <View
                                            style={{
                                                justifyContent: 'center',
                                            }}
                                        >
                                            <TouchableOpacity
                                                style={{
                                                    paddingHorizontal: SIZES.base,
                                                    marginRight: SIZES.base,
                                                    backgroundColor: COLORS.white,
                                                    paddingVertical: SIZES.base,
                                                    borderRadius: SIZES.radius * 2,
                                                    flexDirection: "row",
                                                    alignItems: 'center',
                                                    justifyContent: "space-between"
                                                }}
                                            >
                                                <Text style={{ ...FONTS.body4, fontSize: 12 }}>{item}</Text>
                                                <Ionicons name="close-circle" size={15} color="black" style={{ marginLeft: SIZES.base }} />
                                            </TouchableOpacity>
                                        </View>
                                    ))
                                }
                            </ScrollView>
                        ) : null
                    }

                    {
                        !searching && <View
                            style={{
                                height: 'fit-content',
                                backgroundColor: COLORS.white,
                                width: SIZES.width
                            }}
                        >
                            {renderSearch()}
                        </View>
                    }

                </View>
            </>
        )
    }


    const renderSearch = useCallback(() => {
        if (multiSearch == 'price') return <PriceRate />
    }, [multiSearch])



    return (
        <View
            style={{
                flex: 1,
                backgroundColor: 'rgba(0,0,0,0.1)',
            }}
        >
            {renderHeader()}
            {renderMultiSearch()}
            {
                !data ? (
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
                ) : searching ? (
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
                ) : <Text style={{ ...FONTS.h3, padding: SIZES.padding, textAlign: 'center' }}>Vui lòng chọn yêu cầu rồi nhấn áp dụng để tìm kiếm!</Text>
            }
        </View >
    )
}
