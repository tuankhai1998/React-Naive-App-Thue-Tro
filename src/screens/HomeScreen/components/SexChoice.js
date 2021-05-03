import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { COLORS, FONTS, SHADOW, SIZES } from '../../../constants'
import { Sex } from '../../../constants/values'

export default function SexChoice({ setSexChoice, sexSelected }) {
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
                    backgroundColor: COLORS.white
                }}
            >
                <Text style={{ ...FONTS.h3 }}>Chọn giới tính </Text>
                {
                    Sex.map(({ value, label }, index) => {
                        return (
                            <TouchableOpacity
                                style={{
                                    flexDirection: "row",
                                    alignItems: "center",
                                    paddingVertical: SIZES.padding / 2,
                                    borderBottomColor: COLORS.black,
                                    borderBottomWidth: index + 1 == Sex.length ? 0 : 1,
                                }}

                                onPress={() => setSexChoice(value)}
                            >
                                <View
                                    style={{
                                        width: 30,
                                        height: 30,
                                        borderRadius: 15,
                                        borderColor: COLORS.black,
                                        borderWidth: 2,
                                        justifyContent: 'center',
                                        alignItems: 'center'
                                    }}
                                >
                                    {
                                        value == sexSelected && <View
                                            style={{
                                                width: 20,
                                                height: 20,
                                                borderRadius: 16,
                                                backgroundColor: COLORS.primary
                                            }}
                                        ></View>
                                    }
                                </View>
                                <Text
                                    style={{
                                        marginLeft: SIZES.padding,
                                        fontSize: SIZES.body2
                                    }}
                                >{label}</Text>
                            </TouchableOpacity>
                        )
                    })
                }
            </View>
        </View>
    )
}