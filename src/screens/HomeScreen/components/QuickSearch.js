import { Ionicons } from '@expo/vector-icons';
import React, { useCallback, useEffect, useState } from 'react';
import { FlatList, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { COLORS, FONTS, SHADOW, SIZES } from '../../../constants';
import { RoomType as RoomTypes, Sex } from '../../../constants/values';
import { roomType_FN } from '../../../constants/variable';
import { useNavigation } from '@react-navigation/core'

export default function QuickSearch({ districts, setModalDistrict, modalDistrict, sex, roomType, handleChangeRender, city }) {
    const [districtsSelected, setDistrictSelected] = useState([]);
    const navigation = useNavigation();

    useEffect(() => {
    }, [])



    const handleSelected = (name) => {
        let index = districtsSelected.indexOf(`${name}`);
        if (index < 0) {
            setDistrictSelected([...districtsSelected, name])
        }
        else {
            let newData = districtsSelected;
            newData.splice(index, 1);
            setDistrictSelected([...newData])
        }
    }


    return (
        <View
            style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.1)' }}
            underlayColor="rgba(0,0,0,0)"
        >
            <View
                style={{
                    width: SIZES.width - SIZES.padding * 2,
                    borderRadius: SIZES.radius,
                    maxHeight: SIZES.height * 3 / 4,
                    ...SHADOW.shadow1,
                    padding: SIZES.padding,
                    paddingBottom: 0,
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
                            onPress={() => handleChangeRender('typeChoice')}
                        >
                            <Text
                                style={{
                                    ...FONTS.body4
                                }}
                            >
                                {roomType_FN(roomType)}
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
                            onPress={() => handleChangeRender('sexChoice')}

                        >
                            <Text
                                style={{
                                    ...FONTS.body4
                                }}
                            >
                                {Sex.filter(item => item.value === sex)[0].label}
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
                                        backgroundColor: districtsSelected.indexOf(`${item.name}`) >= 0 ? COLORS.white : COLORS.lightGray3,
                                        borderColor: districtsSelected.indexOf(`${item.name}`) >= 0 ? COLORS.primary : COLORS.lightGray3,
                                        borderWidth: 1,
                                        marginRight: SIZES.base,
                                        marginBottom: SIZES.base
                                    }}

                                    onPress={() => handleSelected(item.name)}
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
                <View
                    style={{
                        paddingTop: SIZES.padding,
                        paddingBottom: SIZES.base
                    }}
                >
                    <TouchableOpacity
                        style={{
                            backgroundColor: COLORS.primary,
                            padding: SIZES.base,
                            borderRadius: SIZES.radius / 2,
                            ...SHADOW.shadow1,
                            marginBottom: SIZES.base
                        }}
                        onPress={() => {
                            navigation.push('ProductListScreen', {
                                query: {
                                    sex: sex,
                                    type: roomType,
                                    multiDistricts: districtsSelected
                                }
                            })
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
                            setModalDistrict(false);
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

        </View>
    )
}
