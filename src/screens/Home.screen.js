//import liraries
import { useQuery } from '@apollo/client';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/core';
import React, { useState } from 'react';
import { FlatList, Image, ImageBackground, Modal, ScrollView, StyleSheet, Text, TouchableHighlight, TouchableOpacity, View } from 'react-native';
import { Images } from '../constants';
import { COLORS, FONTS, SHADOW, SIZES } from '../constants/theme';
import { FETCH_LOCAL_ADDRESS } from '../graphql/locationAddress';
import SplashScreen from './Splash.screen';

const containerWidth = SIZES.width - 2 * SIZES.padding

let district = {
    1: [
        {
            name: "Hai Bà Trưng",
            image: Images.HBT
        },
        {
            name: "Đống Đa",
            image: Images.DONGDA
        },
        {
            name: "Cầu Giấy",
            image: Images.CAUGIAY
        },
        {
            name: "Nam Từ Liêm",
            image: Images.NAMTULIEM
        },
        {
            name: "Bắc Từ Liêm",
            image: Images.BACTULIEM
        },
        {
            name: "Hoàng Mai",
            image: Images.HOANGMAI
        }
    ]
}

// create a component

const HomeHeader = ({ citySelected, changeCitySelected, city }) => {
    let [modalVisible, setModalVisible] = useState(false),
        [modalDistrict, setModalDistrict] = useState(false);

    console.log(city)

    const navigation = useNavigation();
    let bigCity = city.localAddress.map((data, index) => ({ ...data, id: index + 1 }));

    let selected = bigCity.filter(city => {
        return city.id == citySelected
    })[0]

    let { districts } = selected


    let renderImageHeader = () => {
        let image = Images.HANOI;
        if (citySelected == 3) image = Images.DANANG
        if (citySelected == 1) image = Images.HCM


        return (
            <ImageBackground
                source={image}
                style={{
                    width: SIZES.width,
                    height: SIZES.height / 3,
                    position: 'relative'
                }}
            />
        )
    }


    return (
        <View>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(!modalVisible);
                }}
            >
                <TouchableHighlight
                    style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.1)' }}
                    onPress={() => { setModalVisible(!modalVisible); }}
                    underlayColor="rgba(0,0,0,0)"
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
                                ...FONTS.body2,
                                textTransform: "uppercase",
                                textAlign: 'center',
                                paddingBottom: SIZES.padding,
                                borderBottomColor: COLORS.black,
                                borderBottomWidth: 1
                            }}
                        >
                            Chọn Thành Phố
                        </Text>
                        <View>
                            {bigCity.map(city => (
                                <TouchableOpacity
                                    style={{
                                        flexDirection: "row",
                                        alignItems: "center",
                                        paddingVertical: SIZES.padding / 2,
                                        borderBottomColor: COLORS.black,
                                        borderBottomWidth: 1,
                                    }}

                                    onPress={() => {
                                        changeCitySelected(city.id)
                                        setModalVisible(false);
                                    }}
                                >
                                    <View
                                        style={{
                                            width: 30,
                                            height: 30,
                                            borderRadius: 15,
                                            borderColor: COLORS.black,
                                            borderWidth: 2,
                                            justifyContent: 'center',
                                            alignItems: 'center'
                                        }}
                                    >
                                        {
                                            city.id == citySelected && <View
                                                style={{
                                                    width: 20,
                                                    height: 20,
                                                    borderRadius: 16,
                                                    backgroundColor: COLORS.primary
                                                }}
                                            ></View>
                                        }
                                    </View>
                                    <Text
                                        style={{
                                            marginLeft: SIZES.padding,
                                            fontSize: SIZES.body2
                                        }}
                                    >{city.name}</Text>
                                </TouchableOpacity>
                            ))}
                        </View>

                    </View>
                </TouchableHighlight>
            </Modal>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalDistrict}
                onRequestClose={() => {
                    setModalDistrict(!modalDistrict);
                }}
            >
                <View
                    style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.1)' }}
                    onPress={() => { setModalDistrict(!modalDistrict); }}
                    underlayColor="rgba(0,0,0,0)"
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
                        <ScrollView
                            style={{
                                maxHeight: SIZES.height / 3,
                            }}

                        >
                            <View>
                                <Text
                                    style={{
                                        ...FONTS.body3
                                    }}
                                >
                                    Chọn loại phòng
                                </Text>
                                <TouchableOpacity
                                    style={{
                                        padding: SIZES.base,
                                        flexDirection: 'row',
                                        justifyContent: 'space-between',
                                        alignItems: 'center',
                                        borderBottomColor: COLORS.primaryTextColor,
                                        borderBottomWidth: 1,
                                        marginBottom: SIZES.base
                                    }}
                                >
                                    <Text
                                        style={{
                                            ...FONTS.body4
                                        }}
                                    >
                                        Phòng trọ, ký túc xá...
                                    </Text>
                                    <Ionicons name="chevron-down" size={20} color="black" />
                                </TouchableOpacity>
                                <Text
                                    style={{
                                        ...FONTS.body3
                                    }}
                                >
                                    Chọn giới tính
                                </Text>
                                <TouchableOpacity
                                    style={{
                                        padding: SIZES.base,
                                        flexDirection: 'row',
                                        justifyContent: 'space-between',
                                        alignItems: 'center',
                                        borderBottomColor: COLORS.primaryTextColor,
                                        borderBottomWidth: 1,
                                        marginBottom: SIZES.base
                                    }}
                                >
                                    <Text
                                        style={{
                                            ...FONTS.body4
                                        }}
                                    >
                                        Tất cả
                                    </Text>
                                    <Ionicons name="chevron-down" size={20} color="black" />
                                </TouchableOpacity>

                                <Text
                                    style={{
                                        ...FONTS.body3
                                    }}
                                >
                                    Các quận muốn tìm
                                </Text>
                                <FlatList
                                    numColumns={3}
                                    style={{
                                        marginTop: SIZES.base,
                                        marginBottom: SIZES.padding,
                                        flexDirection: 'row',
                                        width: "100%",
                                    }}

                                    data={districts}
                                    renderItem={({ item }) => (
                                        <TouchableOpacity
                                            style={{
                                                padding: SIZES.base,
                                                borderRadius: SIZES.radius,
                                                backgroundColor: COLORS.lightGray3,
                                                marginRight: SIZES.base,
                                                marginBottom: SIZES.base
                                            }}
                                        >
                                            <Text
                                                style={{
                                                    ...FONTS.body4
                                                }}
                                            >
                                                {item.name}
                                            </Text>
                                        </TouchableOpacity>
                                    )}

                                />

                            </View>
                        </ScrollView>
                        <TouchableOpacity
                            style={{
                                backgroundColor: COLORS.primary,
                                padding: SIZES.base,
                                borderRadius: SIZES.radius / 2,
                                ...SHADOW.shadow1,
                                marginBottom: SIZES.base
                            }}
                            onPress={() => {
                                setModalDistrict(!modalDistrict);
                            }}
                        >

                            <Text
                                style={{
                                    textAlign: 'center',
                                    ...FONTS.body4
                                }}
                            >Tìm Kiếm</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={{
                                padding: SIZES.base
                            }}
                            onPress={() => {
                                setModalDistrict(!modalDistrict);
                            }}
                        >
                            <Text
                                style={{
                                    textAlign: 'center',
                                    ...FONTS.body4,
                                    ...SHADOW.shadow1
                                }}
                            >Hủy</Text>
                        </TouchableOpacity>
                    </View>



                </View>
            </Modal>
            {renderImageHeader()}
            <View
                style={{
                    marginTop: - SIZES.height / 8,
                    paddingHorizontal: SIZES.padding,
                    paddingVertical: SIZES.padding,
                    marginHorizontal: SIZES.padding,
                    backgroundColor: COLORS.white,
                    borderRadius: SIZES.radius,
                    ...SHADOW.shadow1
                }}
            >
                {/* search  */}
                <View
                    style={{
                        flexDirection: "row",
                        backgroundColor: "#D0D0D0",
                        borderRadius: SIZES.radius,
                        overflow: "hidden"
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
                        }}>{selected.name.length < 10 ? selected.name : selected.code}</Text>
                    </TouchableOpacity>
                    {/* Input */}
                    <TouchableOpacity
                        style={{
                            flex: 1,
                            justifyContent: 'center',
                            marginHorizontal: SIZES.base,
                            borderRadius: SIZES.borderRadius
                        }}

                        onPress={() => navigation.push('SearchScreen')}
                    >
                        <Text style={{ color: COLORS.white, ...FONTS.body4, overflow: 'hidden' }}>Tìm theo địa chỉ</Text>
                    </TouchableOpacity>

                </View>
                <View
                    style={{
                        marginTop: SIZES.padding,
                        flexDirection: "row",
                        justifyContent: 'space-between',
                        alignItems: 'flex-start'
                    }}

                >
                    <TouchableOpacity
                        style={{
                            width: (SIZES.width - SIZES.padding * 4) / 3 - (SIZES.base * 3),
                            alignItems: 'center',
                        }}
                        onPress={() => setModalDistrict(true)}
                    >
                        <View
                            style={{
                                backgroundColor: `#17BEBB`,
                                ...styles.headerFindItem
                            }}
                        >
                            <Ionicons name="md-flash-outline" size={40} color={COLORS.white} />
                        </View>
                        <Text style={{
                            textAlign: 'center'
                        }}>Tìm theo nhiều quận</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={{
                            width: (SIZES.width - SIZES.padding * 4) / 3 - (SIZES.base * 3),
                            alignItems: 'center',
                        }}
                        onPress={() => console.log("hahaha")}
                    >
                        <View
                            style={{
                                backgroundColor: `#E4572E`,
                                ...styles.headerFindItem
                            }}


                        >
                            <MaterialCommunityIcons name="google-nearby" size={40} color={COLORS.white} />
                        </View>
                        <Text style={{
                            textAlign: 'center'
                        }}>Địa điểm gần đây</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={{
                            width: (SIZES.width - SIZES.padding * 4) / 3 - (SIZES.base * 3),
                            justifyContent: 'center',
                            alignItems: 'center',

                        }}
                        onPress={() => console.log("hahaha")}
                    >
                        <View
                            style={{
                                backgroundColor: `#27FB6B`,
                                ...styles.headerFindItem
                            }}


                        >
                            <MaterialCommunityIcons name="home-plus-outline" size={40} color={COLORS.white} />
                        </View>
                        <Text style={{
                            textAlign: 'center'
                        }}>Đăng phòng</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View >
    )
}


const HomeScreen = () => {
    let [citySelect, setCitySelect] = useState(1);
    const { loading, error, data } = useQuery(FETCH_LOCAL_ADDRESS);


    const renderItemSearchTrend = ({ item, index }) => {
        return (
            <TouchableOpacity
                style={{
                    width: containerWidth / 3 - SIZES.radius / 3 * 2,
                    height: containerWidth / 3 - SIZES.radius / 3 * 2,
                    borderRadius: SIZES.radius,
                    overflow: 'hidden',
                    marginLeft: index % 3 === 0 ? 0 : SIZES.radius,
                    marginBottom: SIZES.radius,
                    ...SHADOW.shadow1
                }}
            >
                <Image source={item.image} style={{
                    resizeMode: 'cover',
                    width: "100%",
                    height: "100%"
                }} />

                <Text style={{ ...FONTS.body3, color: COLORS.white, marginTop: -25, textAlign: 'center', fontSize: 13, fontWeight: '700', backgroundColor: 'rgba(0,0,0,0.4)' }}>{item.name}</Text>
            </TouchableOpacity >
        )
    }


    const renderItem = ({ item, index }) => {
        return (
            <TouchableOpacity
                style={{
                    width: containerWidth / 2 - SIZES.base / 2,
                    minHeight: 50,
                    marginLeft: index % 2 == 0 ? 0 : SIZES.base,
                    marginBottom: SIZES.padding
                }}
            >
                <View
                    style={{
                        width: '100%',
                        height: (containerWidth / 2 - SIZES.base) * 11 / 16,
                        borderRadius: SIZES.radius,
                        overflow: 'hidden'
                    }}
                >
                    <ImageBackground
                        source={item.image}
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
                <View>
                    <Text style={{ ...FONTS.body4, textTransform: "uppercase", fontSize: 12 }}>Tìm người thuê</Text>
                    <Text style={{ ...FONTS.h4 }} numberOfLines={2}>
                        Phòng cho thuê ở Duy Tân quận Cầu Giấy
                    </Text>
                    <Text
                        style={{
                            ...FONTS.body4,
                            fontWeight: 'bold',
                            color: COLORS.secondary
                        }}
                    >
                        1.2 triệu/phòng
                    </Text>
                    <Text numberOfLines={2} ellipsizeMode='middle'>3A, ngõ 82, Duy Tân, Dịch Vọng Hậu, Cầu Giấy</Text>
                </View>
            </TouchableOpacity >
        )
    }

    const blogItem = ({ item, index }) => {
        return (
            <TouchableOpacity
                style={{
                    width: containerWidth / 1.5 - SIZES.base / 2,
                    minHeight: 50,
                    marginLeft: index === 0 ? 0 : SIZES.padding,
                    marginBottom: SIZES.padding
                }}
            >
                <View
                    style={{
                        width: '100%',
                        height: (containerWidth / 2 - SIZES.base) * 14 / 16,
                        borderRadius: SIZES.radius,
                        overflow: 'hidden'
                    }}
                >
                    <ImageBackground
                        source={item.image}
                        style={{
                            width: '100%',
                            height: "100%",
                        }}
                    />
                </View>
                <View>
                    <Text style={{ ...FONTS.h4 }} numberOfLines={2}>
                        Kinh nghiệm khi tìm phòng trọ: Khi xem trọ nên xem gì?
                    </Text>
                    <Text style={{ ...FONTS.body4, fontSize: 15, COLORS: COLORS.black }}>Xem trọ không phải công việc đơn giản, nếu chủ quan bạn sẽ rất dễ thuê </Text>
                </View>
            </TouchableOpacity >
        )
    }

    const newRoomItem = ({ item, index }) => {
        return (
            <TouchableOpacity
                style={{
                    width: containerWidth + SIZES.base,
                    minHeight: 50,
                    marginBottom: SIZES.padding,
                    flexDirection: "row"
                }}
            >
                <View
                    style={{
                        width: containerWidth / 2 - SIZES.base / 2,
                        height: (containerWidth / 2 - SIZES.base) * 12 / 16,
                        borderRadius: SIZES.radius,
                        overflow: 'hidden'
                    }}
                >
                    <ImageBackground
                        source={item.image}
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
                <View
                    style={{
                        flex: 1,
                        marginLeft: SIZES.base
                    }}
                >
                    <Text style={{ ...FONTS.body4, textTransform: "uppercase", fontSize: 12 }}>Tìm người thuê</Text>
                    <Text style={{ ...FONTS.h4 }} numberOfLines={2}>
                        Phòng cho thuê ở Duy Tân quận Cầu Giấy
        </Text>
                    <Text
                        style={{
                            ...FONTS.body4,
                            fontWeight: 'bold',
                            color: COLORS.secondary
                        }}
                    >
                        1.2 triệu/phòng
        </Text>
                    <Text numberOfLines={2} ellipsizeMode='middle'>3A, ngõ 82, Duy Tân, Dịch Vọng Hậu, Cầu Giấy</Text>
                </View>
            </TouchableOpacity >
        )
    }

    if (loading) {
        return (
            <SplashScreen isLoading={loading} />
        )
    }
    return (
        <ScrollView style={{
            flex: 1,
            backgroundColor: 'rgba(0,0,0,0.1)'
        }}>
            <HomeHeader citySelected={citySelect} changeCitySelected={(id) => setCitySelect(id)} city={data} />
            <View
                style={{
                    marginVertical: SIZES.padding,
                    paddingHorizontal: SIZES.padding
                }}
            >
                <Text
                    style={{
                        ...FONTS.body2,
                    }}
                >Xu hướng tìm kiếm</Text>
            </View>

            <View
                style={{
                    paddingHorizontal: SIZES.padding,
                }}
            >
                <FlatList
                    contentContainerStyle={{ alignSelf: 'flex-start' }}
                    numColumns={district['1'].length / 2}
                    showsVerticalScrollIndicator={false}
                    showsHorizontalScrollIndicator={false}
                    data={district['1']}
                    renderItem={renderItemSearchTrend}
                />
            </View>

            <View
                style={{
                    flex: 1,
                    backgroundColor: COLORS.white,
                    borderRadius: SIZES.radius,
                    marginVertical: SIZES.padding,
                    paddingHorizontal: SIZES.padding,
                    paddingVertical: SIZES.radius
                }}
            >
                <Text
                    style={{
                        ...FONTS.body2,
                    }}
                >Phòng nổi bật</Text>

                <FlatList
                    contentContainerStyle={{ alignSelf: 'flex-start' }}
                    numColumns={2}
                    showsVerticalScrollIndicator={false}
                    showsHorizontalScrollIndicator={false}
                    data={district['1']}
                    renderItem={renderItem}
                    style={{
                        marginTop: SIZES.base,
                    }}
                />
                <TouchableOpacity>
                    <Text
                        style={{
                            textAlign: 'center',
                            ...FONTS.body3,
                            color: '#0000EE'
                        }}
                    >Xem Thêm</Text>
                </TouchableOpacity>
            </View>

            <View
                style={{
                    flex: 1,
                    backgroundColor: COLORS.white,
                    borderRadius: SIZES.radius,
                    paddingHorizontal: SIZES.padding,
                    paddingVertical: SIZES.radius,
                }}
            >
                <View
                    style={{
                        flexDirection: "row",
                        justifyContent: 'space-between',
                        alignItems: 'flex-end'
                    }}
                >
                    <Text
                        style={{
                            ...FONTS.body2,
                        }}
                    >FindHome Blog</Text>
                    <TouchableOpacity>
                        <Text
                            style={{
                                ...FONTS.body4,
                                color: '#0000EE'
                            }}
                        >Xem tất cả</Text>
                    </TouchableOpacity>
                </View>

                <FlatList
                    contentContainerStyle={{ alignSelf: 'flex-start' }}
                    horizontal={true}
                    showsVerticalScrollIndicator={false}
                    showsHorizontalScrollIndicator={false}
                    data={district['1']}
                    renderItem={blogItem}
                    style={{
                        marginTop: SIZES.base,
                    }}
                />
            </View>

            <View
                style={{
                    backgroundColor: COLORS.white,
                    paddingVertical: SIZES.base,
                    marginVertical: SIZES.base,
                    justifyContent: 'center',
                    alignItems: 'center'
                }}
            >

                <Image
                    source={Images.NEWROOM}
                    style={{
                        width: SIZES.width - 2 * SIZES.base,
                        height: SIZES.width * 1 / 3,
                        resizeMode: 'cover',
                        borderRadius: SIZES.radius / 2
                    }}


                />
            </View>

            <View
                style={{
                    flex: 1,
                    backgroundColor: COLORS.white,
                    borderRadius: SIZES.radius,
                    marginVertical: SIZES.padding,
                    paddingVertical: SIZES.base,
                    justifyContent: 'center',
                    alignItems: 'center'
                }}
            >
                <FlatList
                    contentContainerStyle={{ alignSelf: 'flex-start' }}
                    showsVerticalScrollIndicator={false}
                    showsHorizontalScrollIndicator={false}
                    data={district['1']}
                    renderItem={newRoomItem}
                    style={{
                        marginTop: SIZES.base,
                    }}
                />

            </View>

        </ScrollView>
    );
};
const styles = StyleSheet.create({
    headerFindItem: {
        borderRadius: SIZES.radius * 1.75,
        width: (SIZES.width - SIZES.padding * 4) / 4 - (SIZES.base * 3),
        height: (SIZES.width - SIZES.padding * 4) / 4 - (SIZES.base * 3),
        justifyContent: 'center',
        alignItems: 'center',
    }
})


//make this component available to the app
export default HomeScreen;