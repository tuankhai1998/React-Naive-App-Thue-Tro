import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/core';
import React, { useState } from 'react'
import { View, Text, SafeAreaView, TouchableOpacity } from 'react-native'
import { COLORS, FONTS, SIZES } from '../constants';

export default function SearchScreen() {
    let [modalVisible, setModalVisible] = useState(false);
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
    return (
        <View
            style={{
                flex: 1,
                backgroundColor: 'red'
            }}
        >

            {renderHeader()}
            <Text>Hello this is search screen</Text>
        </View>
    )
}
