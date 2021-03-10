import React from 'react'
import { SafeAreaView, StatusBar, StyleSheet, Text } from 'react-native'
import { COLORS, FONTS, SIZES } from '../constants/theme'

export default function Header(props) {
    let { title, left, right } = props

    return (
        <SafeAreaView style={{ height: SIZES.height / 10, backgroundColor: COLORS.primary }}>
            <StatusBar
                animated={true}
                backgroundColor={COLORS.darkGreen}
            />
            <Text style={{ ...FONTS.body1, color: COLORS.black }}>
                {title}
            </Text>
        </SafeAreaView>
    )
}


const styles = StyleSheet.create({

})