import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import RadioButton from '../../../components/RadioButton'
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
                <RadioButton data={Sex} setSelected={(value) => setSexChoice(value)} selected={sexSelected} />
            </View>
        </View>
    )
}
