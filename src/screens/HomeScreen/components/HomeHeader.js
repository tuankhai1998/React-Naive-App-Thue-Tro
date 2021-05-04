import React, { useCallback, useState } from 'react'
import { View, Text, Modal, TouchableOpacity, TouchableHighlight, ScrollView, FlatList, ImageBackground, StyleSheet } from 'react-native'
import { useNavigation } from '@react-navigation/core'
import { COLORS, FONTS, Images, SHADOW, SIZES } from '../../../constants';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import CityChoice from './CityChoice';
import QuickSearch from './QuickSearch';
import SexChoice from './SexChoice';
import { useEffect } from 'react/cjs/react.development';
import RoomChoice from './RoomChoice';
import * as Location from 'expo-location';


const HomeHeader = ({ citySelected, changeCitySelected, city }) => {
    let [modalVisible, setModalVisible] = useState(false),
        [quickSearchRender, setQuickSearchRender] = useState('Main'),
        [modalDistrict, setModalDistrict] = useState(false),
        [sex, setSex] = useState(0),
        [location, setLocation] = useState(null),
        [roomType, setRoomType] = useState(0);

    if (!city) return null

    const navigation = useNavigation();
    let bigCity = city.map((data, index) => ({ ...data, id: index + 1 }));

    let selected = bigCity.filter(city => {
        return city.id == citySelected
    })[0]

    let { districts } = selected;
    useEffect(() => {
        console.log(sex)
    }, [sex])


    useEffect(() => {
        const getLocation = async () => {
            try {
                let { status } = await Location.requestPermissionsAsync();
                if (status !== 'granted') {
                    setErrorMsg('Permission to access location was denied');
                    return;
                }

                let location = await Location.getCurrentPositionAsync({});

                setLocation({
                    latitude: location.coords.latitude,
                    longitude: location.coords.longitude,
                });
            } catch (error) {
                console.log(error)
            }
        }
        getLocation()
    }, []);

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

    const renderQuickSearch = useCallback(() => {
        if (quickSearchRender == 'Main') return <QuickSearch
            setModalDistrict={(isShow) => setModalDistrict(isShow)} modalDistrict={modalDistrict}
            districts={districts}
            handleChangeRender={(item) => setQuickSearchRender(item)}
            sex={sex}
            roomType={roomType}
            city={city}
        />
        if (quickSearchRender == 'sexChoice') return <SexChoice
            setSexChoice={(value) => { setSex(value); setQuickSearchRender('Main') }}
            sexSelected={sex}
        />
        if (quickSearchRender == 'typeChoice') return <RoomChoice
            setRoomChoice={(value) => { setRoomType(value); setQuickSearchRender('Main') }}
            roomSelected={roomType}
        />
    }, [quickSearchRender])


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
                <CityChoice
                    modalVisible={modalVisible}
                    setModalVisible={(isModalVisible) => setModalVisible(isModalVisible)}
                    bigCity={bigCity}
                    citySelected={citySelected}
                    changeCitySelected={(id) => changeCitySelected(id)}
                />
            </Modal>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalDistrict}
                onRequestClose={() => {
                    setModalDistrict(!modalDistrict);
                }}
            >
                {renderQuickSearch()}
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

                        onPress={() => navigation.push('SearchScreen', {
                            citySelected
                        })}
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
                        onPress={() => {
                            navigation.push('ProductListScreen', {
                                query: location
                            })
                        }}
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

const styles = StyleSheet.create({
    headerFindItem: {
        borderRadius: SIZES.radius * 1.75,
        width: (SIZES.width - SIZES.padding * 4) / 4 - (SIZES.base * 3),
        height: (SIZES.width - SIZES.padding * 4) / 4 - (SIZES.base * 3),
        justifyContent: 'center',
        alignItems: 'center',
    }
})


export default HomeHeader