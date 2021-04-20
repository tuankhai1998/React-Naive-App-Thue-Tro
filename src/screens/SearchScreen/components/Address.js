import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'

export default function Address() {
    return (
        <View>
            <Text>Quận/Huyện:</Text> <TouchableOpacity></TouchableOpacity>
            <Text>Xã/Phường:</Text> <TouchableOpacity></TouchableOpacity>
        </View>
    )
}
