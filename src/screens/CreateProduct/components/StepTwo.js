import { Ionicons } from '@expo/vector-icons';
import React, { useCallback, useState } from 'react';
import { Modal, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useEffect } from 'react/cjs/react.development';
import { COLORS, FONTS, SHADOW, SIZES } from '../../../constants';
import { city } from '../../../constants/city';
import * as Location from 'expo-location';



export default function StepTwo() {
    const [modalVisible, setModalVisible] = useState(false);
    const [citySelected, setCitySelected] = useState('');
    const [districtSelected, setDistrictSelected] = useState('');
    const [wardsSelected, setWardsSelected] = useState('');
    const [modalRender, setModalRender] = useState(1);
    const [any, setAny] = useState('');
    const [location, setLocation] = useState("");


    useEffect(() => {
        if (!citySelected) {
            setDistrictSelected('')
            setWardsSelected('')
        }
        if (!districtSelected) {
            setWardsSelected('')
        }
    }, [citySelected, districtSelected, wardsSelected])

    useEffect(() => {
        const geocode = async () => {
            await Location.setGoogleApiKey("AIzaSyDAtJK7wLInUeBcKvbDjoFhkoDrZFpJwhs")
            try {
                let res = await Location.geocodeAsync(`${citySelected}, ${districtSelected}, ${wardsSelected}, ${any}`, { useGoogleMaps: false });

                let { latitude, longitude } = res[0]

                setLocation(`${latitude},${longitude}`)

            } catch (error) {
                console.log(error)
            }
        }
        geocode()
    }, [citySelected, districtSelected, wardsSelected, any])





    const datas = useCallback(() => {
        if (modalRender == 1) {
            return city
        }
        if (modalRender == 2) {
            if (citySelected) {
                let districts = city.filter(thisCity => thisCity.name == citySelected)[0].districts
                return districts
            }
            return []
        }
        if (modalRender !== 1 || modalRender !== 2) {
            if (districtSelected) {
                let wards = city.filter(thisCity => thisCity.name == citySelected)[0].districts.filter(thisDistricts => thisDistricts.name == districtSelected)[0].wards
                return wards
            }

            return []
        }

    }, [modalRender])




    const renderModal = (datas, selected, setSelected) => {
        return (
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

                <ScrollView>
                    {datas.map(data => {
                        return (
                            <TouchableOpacity
                                style={{
                                    flexDirection: "row",
                                    alignItems: "center",
                                    paddingVertical: SIZES.padding / 2,
                                    borderBottomColor: COLORS.black,
                                    borderBottomWidth: 1,
                                }}

                                onPress={() => {
                                    setSelected(data.name)
                                    setModalVisible(false);
                                }}
                            >
                                <View
                                    style={{
                                        width: 15,
                                        height: 15,
                                        borderRadius: 15,
                                        borderColor: COLORS.black,
                                        borderWidth: 2,
                                        justifyContent: 'center',
                                        alignItems: 'center'
                                    }}
                                >
                                    {
                                        data.name === selected && <View
                                            style={{
                                                width: 10,
                                                height: 10,
                                                borderRadius: 16,
                                                backgroundColor: COLORS.primary
                                            }}
                                        ></View>
                                    }
                                </View>
                                <Text
                                    style={{
                                        marginLeft: SIZES.padding,
                                        fontSize: SIZES.body2,
                                        ...FONTS.body2
                                    }}
                                >{data.name}</Text>
                            </TouchableOpacity>
                        )
                    })}
                </ScrollView>
            </View>
        )
    }


    return (
        <View
            style={{
                flex: 1,
                padding: SIZES.padding
            }}
        >
            <TextInput
                value={location}
            />
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(!modalVisible);
                }}
            >
                <TouchableOpacity
                    style={{
                        backgroundColor: "rgba(0,0,0,0.1)",
                        width: SIZES.width,
                        height: SIZES.height,
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}
                    onPress={() => {
                        setModalVisible(false);
                    }}
                    activeOpacity={1}
                >
                    {modalRender == 1 ? renderModal(datas(), citySelected, (value) => setCitySelected(value))
                        : modalRender == 2 ? renderModal(datas(), districtSelected, (value) => setDistrictSelected(value))
                            : renderModal(datas(), wardsSelected, (value) => setWardsSelected(value))}
                </TouchableOpacity>
            </Modal>
            <Text
                style={{
                    ...FONTS.body2,
                    marginBottom: SIZES.base
                }}
            >
                Địa chỉ
            </Text>

            <Text
                style={{
                    ...FONTS.body3,
                }}
            >
                Thành phố
            </Text>
            <View
                style={{
                    marginVertical: SIZES.base
                }}
            >
                <TouchableOpacity
                    style={{
                        paddingLeft: SIZES.base,
                        paddingVertical: SIZES.base,
                        borderBottomColor: COLORS.black,
                        borderBottomWidth: 1,
                        flexDirection: 'row',
                        justifyContent: 'space-between'

                    }}
                    onPress={() => {
                        setModalVisible(true)
                        setModalRender(1)
                    }}
                >
                    <Text
                        style={{
                            ...FONTS.body3
                        }}
                    >{citySelected ? citySelected : 'Thành phố'}</Text>

                    <Ionicons name="chevron-down" size={20} color="black" />
                </TouchableOpacity>
            </View>

            <Text
                style={{
                    ...FONTS.body3,
                }}
            >
                Quận/Huyện
            </Text>
            <View
                style={{
                    marginVertical: SIZES.base
                }}
            >
                <TouchableOpacity
                    style={{
                        paddingLeft: SIZES.base,
                        paddingVertical: SIZES.base,
                        borderBottomColor: COLORS.black,
                        borderBottomWidth: 1,
                        flexDirection: 'row',
                        justifyContent: 'space-between'

                    }}
                    onPress={() => {
                        setModalRender(2)
                        setModalVisible(true)
                    }}
                >
                    <Text
                        style={{
                            ...FONTS.body3
                        }}
                    >{districtSelected ? districtSelected : 'Quận/ Huyện'}</Text>

                    <Ionicons name="chevron-down" size={20} color="black" />
                </TouchableOpacity>
            </View>

            <Text
                style={{
                    ...FONTS.body3,
                }}
            >
                Xã/ Phường
            </Text>
            <View
                style={{
                    marginVertical: SIZES.base
                }}
            >
                <TouchableOpacity
                    style={{
                        paddingLeft: SIZES.base,
                        paddingVertical: SIZES.base,
                        borderBottomColor: COLORS.black,
                        borderBottomWidth: 1,
                        flexDirection: 'row',
                        justifyContent: 'space-between'

                    }}
                    onPress={() => {
                        setModalVisible(true)
                        setModalRender(3)
                    }}
                >
                    <Text
                        style={{
                            ...FONTS.body3
                        }}
                    > {wardsSelected ? wardsSelected : 'Xã/ Phường'}</Text>

                    <Ionicons name="chevron-down" size={20} color="black" />
                </TouchableOpacity>
            </View>

            <Text
                style={{
                    ...FONTS.body3,
                }}
            >
                Đương,Số Nhà
            </Text>
            <View
                style={{
                    marginVertical: SIZES.base
                }}
            >
                <TextInput
                    style={{
                        backgroundColor: COLORS.white,
                        paddingHorizontal: SIZES.base,
                        flex: 1,
                        marginVertical: SIZES.base,
                        borderRadius: SIZES.radius / 2,
                        paddingVertical: SIZES.base,
                    }}
                    onChangeText={(text) => setAny(text)}
                    value={any}
                />
            </View>
        </View>
    )
}
