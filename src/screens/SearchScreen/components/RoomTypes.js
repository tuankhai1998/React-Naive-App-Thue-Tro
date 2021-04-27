import React, { useState } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { useCallback } from 'react/cjs/react.development';
import { COLORS, FONTS, SIZES } from '../../../constants';
import { RoomType } from '../../../constants/values';

export default function RoomTypes({ type, setRoomType }) {
    
    let renderOption = (item, type) => {
        return (
            <TouchableOpacity
                style={{
                    marginBottom: SIZES.padding,
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'flex-start',
                    width: '100%'
                }}
                onPress={() => setRoomType(item.value)}
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
                        item.value == type && <View
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
                    {item.label}
                </Text>
            </TouchableOpacity>
        )
    }

    let renderOptions = useCallback(() => RoomType.map(item => renderOption(item, type)), [type])
    return (
        <View
            style={{
                paddingHorizontal: SIZES.padding,
                width: SIZES.width,
                paddingTop: SIZES.padding
            }}
        >
            {renderOptions()}
        </View>
    )
}
