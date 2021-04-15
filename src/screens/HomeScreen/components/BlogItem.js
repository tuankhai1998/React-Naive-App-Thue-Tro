import React from 'react'
import { View, Text, TouchableOpacity, ImageBackground } from 'react-native'
import { COLORS, FONTS, SIZES } from '../../../constants'

export default function BlogItem({ item, index }) {

    return (
        <TouchableOpacity
            style={{
                width: SIZES.containerWidth / 1.5 - SIZES.base / 2,
                minHeight: 50,
                marginLeft: index === 0 ? 0 : SIZES.padding,
                marginBottom: SIZES.padding
            }}
        >
            <View
                style={{
                    width: '100%',
                    height: (SIZES.containerWidth / 2 - SIZES.base) * 14 / 16,
                    borderRadius: SIZES.radius,
                    overflow: 'hidden'
                }}
            >
                <ImageBackground
                    source={item.image}
                    style={{
                        width: '100%',
                        height: "100%",
                    }}
                />
            </View>
            <View>
                <Text style={{ ...FONTS.h4 }} numberOfLines={2}>
                    Kinh nghiệm khi tìm phòng trọ: Khi xem trọ nên xem gì?
                    </Text>
                <Text style={{ ...FONTS.body4, fontSize: 15, COLORS: COLORS.black }}>Xem trọ không phải công việc đơn giản, nếu chủ quan bạn sẽ rất dễ thuê </Text>
            </View>
        </TouchableOpacity >
    )

}
