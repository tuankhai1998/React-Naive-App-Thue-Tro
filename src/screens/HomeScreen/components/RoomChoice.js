import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import RadioButton from '../../../components/RadioButton'
import { COLORS, FONTS, SHADOW, SIZES } from '../../../constants'
import { RoomType } from '../../../constants/values'

export default function RoomChoice({ setRoomChoice, roomSelected }) {

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
                <Text style={{ ...FONTS.h3 }}>Chọn loại phòng </Text>
                <RadioButton data={RoomType} setSelected={(value) => { setRoomChoice(value) }} selected={roomSelected} />
            </View>
        </View>
    )
}
