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
            height: SIZES.height / 12, backgroundColor: COLORS.white, ...SHADOW.shadow1,
            marginTop: SIZES.base,
            borderBottomColor: COLORS.gray,
            borderBottomWidth: 1
        }}>

            <View style={{
                paddingHorizontal: SIZES.base,
                paddingVertical: SIZES.body3,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: "space-between"
            }}>
                <View style={!left ? { width: 27.3 } : null}>
                    {left &&
                        <TouchableOpacity
                            onPress={() => console.log("hahah")}
                            style={{ marginHorizontal: SIZES.base, marginVertical: -SIZES.base, paddingHorizontal: -SIZES.base, paddingVertical: 2 * SIZES.base }}
                        >
                            <AntDesign name="arrowleft" size={24} color={COLORS.primaryTextColor} />
                        </TouchableOpacity>
                    }
                </View>

                <Text style={{ ...FONTS.body1, color: COLORS.primaryTextColor, textAlign: "center" }}>
                    {title}
                </Text>
                <View>
                    <TouchableOpacity style={{ marginHorizontal: SIZES.base, marginVertical: -SIZES.base, paddingHorizontal: -SIZES.base, paddingVertical: 2 * SIZES.base }}>
                        <AntDesign name="search1" size={24} color={COLORS.primaryTextColor} />
                    </TouchableOpacity>
                </View>
            </View>

        </View>
    )
}


const styles = StyleSheet.create({

})