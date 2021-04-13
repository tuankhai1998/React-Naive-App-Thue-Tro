import { AntDesign } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/core'
import React from 'react'
import { StatusBar, StyleSheet, Text, View } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { COLORS, FONTS, SHADOW, SIZES } from '../constants/theme'

export default function Header(props) {
    let { title, left, right } = props
    const navigate = useNavigation()
    return (
        <View style={{
            height: SIZES.width * 2 > SIZES.height ? (SIZES.height / 10) : (SIZES.height / 9),
            backgroundColor: COLORS.white, ...SHADOW.shadow1,
            borderBottomColor: COLORS.gray,
            borderBottomWidth: 1
        }}>

            <View style={{
                paddingHorizontal: SIZES.base,
                paddingTop: SIZES.width * 2 > SIZES.height ? SIZES.body2 : SIZES.padding * 2,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: "space-between"
            }}>
                <View style={!left ? { width: 24, height: 3, ...styles.iconSpace } : null}>
                    {left &&
                        <TouchableOpacity
                            onPress={() => navigate.goBack()}
                            style={{ ...styles.iconSpace }}
                        >
                            <AntDesign name="arrowleft" size={24} color={COLORS.primaryTextColor} />
                        </TouchableOpacity>
                    }
                </View>

                <Text style={{ ...FONTS.body2, color: COLORS.primaryTextColor, textAlign: "center", flex: 1 }}>
                    {title}
                </Text>
                <View style={!right ? { width: 24, height: 3, ...styles.iconSpace } : null}>
                    {right && <TouchableOpacity style={{ ...styles.iconSpace }}>
                        <AntDesign name="search1" size={19} color={COLORS.primaryTextColor} />
                    </TouchableOpacity>}
                </View>
            </View>

        </View >
    )
}


const styles = StyleSheet.create({
    iconSpace: {
        marginHorizontal: SIZES.base,
        marginVertical: -SIZES.base,
        paddingHorizontal: -SIZES.base,
        paddingVertical: 2 * SIZES.base
    }
})