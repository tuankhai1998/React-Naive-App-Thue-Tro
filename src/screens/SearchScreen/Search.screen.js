import { AntDesign, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/core';
import React, { useCallback, useState } from 'react';
import { FlatList, Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import Utility from '../../components/Utility';
import { COLORS, FONTS, Images, SIZES } from '../../constants';
import { bigCity } from '../../constants/bigCity';
import { roomType_FN } from '../../constants/variable';
import Address from './components/Address';
import NumberPeople from './components/NumberPeople';
import PriceRate from './components/PriceRate';
import RoomTypes from './components/RoomTypes';

export default function SearchScreen() {
    let [modalVisible, setModalVisible] = useState(false),
        [data, setData] = useState([1, 2]),
        [searching, setSearching] = useState(true),
        [multiSearch, setMultiSearch] = useState('price'),
        route = useRoute(),
        { params } = route,
        [dataSearch, setDataSearch] = useState({
            addressName: {
                districts: "",
                wardsAndStreet: ""
            },
            priceRate: {
                max: "12",
                min: "10"
            },
            type: 1,
            numPeople: {
                num: 1,
                sex: 0
            }
        });


    let { citySelected } = params;

    let formatDataSearchToArray = () => {
        let { priceRate, type, utilities, numPeople } = dataSearch;
        let arrayDataSearch = []
        if (type) arrayDataSearch.push(`${roomType_FN(type)}`)
        if (priceRate?.max && priceRate?.min) {
            arrayDataSearch.push(`${priceRate.min} - ${priceRate.max} triệu`)
        }
        // if (utilities) {
        //     let newArr = utilities.filter(item => item.selected)
        //     arrayDataSearch = [...arrayDataSearch, ...newArr.map(item => item.text)]
        // }
        if (numPeople.num !== 1 || numPeople.sex !== 0) arrayDataSearch.push(`${numPeople.num} người, giới tính ${numPeople.sex == 0 ? 'tất cả' : numPeople.sex == 1 ? 'nam' : 'nữ'}`)
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
                        borderWidth: 2,
                        alignItems: 'center'
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
                    >
                        <MaterialCommunityIcons name="map-marker" size={17} color={COLORS.secondary} />
                        <Text style={{
                            color: COLORS.secondary,
                            ...FONTS.body4
                        }}>{bigCity.filter(city => city.id === citySelected)[0].acronym}</Text>
                    </TouchableOpacity>
                    <Text
                        style={{
                            flex: 1,
                            justifyContent: 'center',
                            marginHorizontal: SIZES.base,
                            borderRadius: SIZES.borderRadius,
                            color: COLORS.primaryTextColor,
                        }}
                    >{dataSearch?.addressName?.districts && `${dataSearch.addressName.districts}, ${dataSearch.addressName.wardsAndStreet}`}</Text>
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
                    <ScrollView
                        style={{
                            width: SIZES.width,
                            height: SIZES.width / 10,
                        }}
                        showsHorizontalScrollIndicator={false}
                        horizontal
                    >
                        <TouchableOpacity
                            style={{ flexDirection: 'row', alignItems: 'center', marginRight: SIZES.base }}
                            onPress={() => {
                                setSearching(true);
                                setMultiSearch('address')
                            }}
                        >
                            <Text style={{ ...FONTS.body3 }}>
                                Địa chỉ
                            </Text>
                            <Ionicons name="chevron-down" size={16} color="black" style={{
                                paddingHorizontal: SIZES.base / 2
                            }} />
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={{ flexDirection: 'row', alignItems: 'center', marginRight: SIZES.base }}
                            onPress={() => {
                                setSearching(true);
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
                            onPress={() => {
                                setSearching(true);
                                setMultiSearch('roomType')
                            }}
                        >
                            <Text style={{ ...FONTS.body3 }}>
                                Loại phòng
                        </Text>
                            <Ionicons name="chevron-down" size={16} color="black" style={{
                                paddingHorizontal: SIZES.base / 2
                            }} />
                        </TouchableOpacity>
                        {/* <TouchableOpacity
                            style={{ flexDirection: 'row', alignItems: 'center', marginRight: SIZES.base }}
                            onPress={() => {
                                setSearching(true);
                                setMultiSearch('utility')
                            }}
                        >
                            <Text style={{ ...FONTS.body3 }}>
                                Tiện ích
                        </Text>
                            <Ionicons name="chevron-down" size={16} color="black" style={{
                                paddingHorizontal: SIZES.base / 2
                            }} />
                        </TouchableOpacity> */}
                        <TouchableOpacity
                            style={{ flexDirection: 'row', alignItems: 'center', marginRight: SIZES.base }}
                            onPress={() => {
                                setSearching(true);
                                setMultiSearch('numberPeople')
                            }}
                        >
                            <Text style={{ ...FONTS.body3 }}>
                                Số người
                        </Text>
                            <Ionicons name="chevron-down" size={16} color="black" style={{
                                paddingHorizontal: SIZES.base / 2
                            }} />
                        </TouchableOpacity>
                    </ScrollView>

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
                                                {/* <Ionicons name="close-circle" size={15} color="black" style={{ marginLeft: SIZES.base }} /> */}
                                            </TouchableOpacity>
                                        </View>
                                    ))
                                }
                            </ScrollView>
                        ) : null
                    }

                    {
                        searching && <View style={{
                            backgroundColor: COLORS.white,
                            justifyContent: 'center',
                            alignItems: 'center',
                            paddingBottom: SIZES.padding
                        }}>
                            {renderSearch()}
                            <TouchableOpacity
                                style={{
                                    width: SIZES.width / 2,
                                    padding: SIZES.base,
                                    backgroundColor: COLORS.primary,
                                    alignItems: 'center',
                                    borderRadius: SIZES.radius
                                }}
                                onPress={() => {
                                    let { priceRate, type, numPeople, addressName } = dataSearch;
                                    navigation.push("ProductListScreen", {
                                        query: {
                                            sex: numPeople.sex,
                                            maxPrice: priceRate.max,
                                            minPrice: priceRate.min,
                                            roomNum: numPeople.num,
                                            type,
                                            addressName
                                        }
                                    })
                                }}
                            >
                                <Text style={{ ...FONTS.body4 }}>Tìm kiếm</Text>
                            </TouchableOpacity>

                        </View>
                    }

                </View>
            </>
        )
    }


    const renderSearch = useCallback(() => {
        if (multiSearch == 'price') return <PriceRate setPrice={(priceRate) => setDataSearch({ ...dataSearch, priceRate: { ...priceRate } })} priceRate={dataSearch.priceRate} />
        if (multiSearch == 'roomType') return <RoomTypes type={dataSearch.type} setRoomType={(roomType) => { setDataSearch({ ...dataSearch, type: roomType }) }} />
        if (multiSearch == 'numberPeople') return <NumberPeople
            setNumberPeople={(data) => setDataSearch({ ...dataSearch, numPeople: data })}
            numberPeople={dataSearch.numPeople}
        />
        // if (multiSearch == 'utility') return <Utility
        //     utilitiesSelected={dataSearch.utilities}
        //     handleUtilitiesSelect={(values) => {
        //         setDataSearch({ ...dataSearch, utilities: values })
        //     }}
        // />
        if (multiSearch == 'address') return <Address
            city={bigCity.filter(city => city.id === citySelected)[0]}
            setAddress={(data) => setDataSearch({ ...dataSearch, addressName: data })
            }
        />
    }, [multiSearch, dataSearch])



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
                ) : !searching ? (
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
