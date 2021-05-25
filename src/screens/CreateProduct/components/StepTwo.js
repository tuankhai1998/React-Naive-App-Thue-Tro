import { Ionicons } from '@expo/vector-icons';
import React, { useCallback, useState } from 'react';
import { Modal, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useEffect } from 'react/cjs/react.development';
import { COLORS, FONTS, SHADOW, SIZES } from '../../../constants';
import { CITY } from '../../../constants/city';
import * as Location from 'expo-location';



export default function StepTwo({ data, setData, setValidate }) {
    const { address } = data

    const { name, loc } = address;
    const { city, districts, wardsAndStreet, any } = name
    const [modalVisible, setModalVisible] = useState(false);
    const [modalRender, setModalRender] = useState(1);

    useEffect(() => {
        if (!city) {
            setData(
                {
                    ...data,
                    address: {
                        name: {
                            city: '',
                            districts: '',
                            wardsAndStreet: '',
                            any: '',
                        }
                    }
                }
            )
        }
        if (!districts) {
            setData(
                {
                    ...data,
                    address: {
                        name: {
                            ...name,
                            districts: '',
                            wardsAndStreet: '',
                            any: '',
                        }
                    }
                }
            )
        }
    }, [city, districts, wardsAndStreet])

    useEffect(() => {
        const geocode = async () => {
            setValidate(false)
            // await Location.setGoogleApiKey("AIzaSyDAtJK7wLInUeBcKvbDjoFhkoDrZFpJwhs")
            if (any && wardsAndStreet && districts && city) {
                setValidate(true)
                try {
                    let res = await Location.geocodeAsync(` ${any}, ${wardsAndStreet}, ${districts},${city}`, { useGoogleMaps: false });
                    let { latitude, longitude } = res[0]
                    setData(
                        {
                            ...data,
                            address: {
                                name: {
                                    city: city,
                                    districts: districts,
                                    wardsAndStreet: wardsAndStreet,
                                    any: any
                                },
                                loc: {
                                    coordinates: [longitude, latitude]
                                }
                            }
                        }
                    )
                } catch (error) {
                    console.log(error)
                }
            }
        }
        geocode()
    }, [city, districts, wardsAndStreet, any])





    const datas = useCallback(() => {
        if (modalRender == 1) {
            return CITY
        }
        if (modalRender == 2) {
            if (city) {
                let districts = CITY.filter(thisCity => thisCity.name == city)[0].districts
                return districts
            }
            return []
        }
        if (modalRender !== 1 || modalRender !== 2) {
            if (districts) {
                let wards = CITY.filter(thisCity => thisCity.name == city)[0].districts.filter(thisDistricts => thisDistricts.name == districts)[0].wards
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
                    {modalRender == 1 ? renderModal(datas(), city, (value) => setData(
                        {
                            ...data,
                            address: {
                                name: {
                                    ...name,
                                    city: value
                                }

                            }
                        }
                    ))
                        : modalRender == 2 ? renderModal(datas(), districts, (value) => setData(
                            {
                                ...data,
                                address: {
                                    name: {
                                        ...name,
                                        districts: value
                                    }
                                }
                            }
                        ))
                            : renderModal(datas(), wardsAndStreet, (value) => setData(
                                {
                                    ...data,
                                    address: {
                                        name: {
                                            ...name,
                                            wardsAndStreet: value
                                        }
                                    }
                                }
                            ))}
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
                    >{city ? city : 'Thành phố'}</Text>

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
                    >{districts ? districts : 'Quận/ Huyện'}</Text>

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
                    > {wardsAndStreet ? wardsAndStreet : 'Xã/ Phường'}</Text>

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
                    onChangeText={(text) => setData(
                        {
                            ...data,
                            address: {
                                name: {
                                    ...name,
                                    any: text
                                }
                            }
                        }
                    )}
                    value={any}
                />
            </View>
        </View>
    )
}
