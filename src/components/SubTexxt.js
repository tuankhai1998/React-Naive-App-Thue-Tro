import React from 'react'
import { View, Text } from 'react-native'
import { COLORS } from '../constants'

export default function SubText({ base, exponent, color }) {
    return (
        <View style={{ flexDirection: 'row' }}>
            <View style={{ alignItems: 'flex-end' }}>
                <Text style={{ fontSize: 15, color: color ? color : COLORS.black }}>{base}</Text>
            </View>
            <View style={{ alignItems: 'flex-start' }}>
                <Text style={{ fontSize: 10, color: color ? color : COLORS.black }}>{exponent}</Text>
            </View>
        </View>
    )
}
