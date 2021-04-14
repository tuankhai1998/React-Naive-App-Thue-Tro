import React, { useState } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { COLORS, FONTS, SIZES } from '../../../constants';

export default function RoomTypes() {
    const [selectedOption, setSelectedOption] = useState(1);
    const listOptions = [
        { key: 'Phòng cho thuê', value: 1 },
        { key: 'Căn hộ cho thuê', value: 2 },
        { key: 'Chung cư thuê', value: 3 },
        { key: 'Ở ghép', value: 4 },
    ]


    let renderOptions = (item) => {
        return (
            <TouchableOpacity
                style={{
                    marginBottom: SIZES.padding,
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'flex-start',
                    width: '100%'
                }}
                onPress={() => setSelectedOption(item.value)}
            >
                <View
                    style={{
                        borderRadius: 10,
                        width: 20,
                        height: 20,
                        borderWidth: 1,
                        borderColor: COLORS.primaryTextColor,
                        marginRight: SIZES.base,
                        justifyContent: 'center',
                        alignItems: 'center'

                    }}
                >
                    {
                        item.value == selectedOption && <View
                            style={{
                                width: 15,
                                height: 15,
                                backgroundColor: COLORS.primary,
                                borderRadius: 8.5
                            }}
                        ></View>
                    }
                </View>

                <Text
                    style={{
                        ...FONTS.body3
                    }}
                >
                    {item.key}
                </Text>
            </TouchableOpacity>
        )
    }
    return (
        <View
            style={{
                paddingHorizontal: SIZES.padding,
                width: SIZES.width,
                paddingTop: SIZES.padding
            }}
        >
            {listOptions.map(item => renderOptions(item))}
        </View>
    )
}
