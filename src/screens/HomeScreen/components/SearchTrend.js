import React from 'react'
import { View, Text, TouchableOpacity, Image } from 'react-native'
import { COLORS, FONTS, SHADOW, SIZES } from '../../../constants'
import { useNavigation } from '@react-navigation/core';

export default function SearchTrend({ item, index }) {
    const navigation = useNavigation();

    return (
        <TouchableOpacity
            style={{
                width: SIZES.containerWidth / 3 - SIZES.radius / 3 * 2,
                height: SIZES.containerWidth / 3 - SIZES.radius / 3 * 2,
                borderRadius: SIZES.radius,
                overflow: 'hidden',
                marginLeft: index % 3 === 0 ? 0 : SIZES.radius,
                marginBottom: SIZES.radius,
                ...SHADOW.shadow1
            }}

            onPress={() => { navigation.push('ProductListScreen', { district: item.name, city: 'Hà Nội' }) }}
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
