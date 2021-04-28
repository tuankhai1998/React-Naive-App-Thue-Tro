import { AntDesign } from '@expo/vector-icons';
import React, { useState } from 'react'
import { View, Text } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useEffect } from 'react/cjs/react.development';
import { COLORS, FONTS, SIZES } from '../../../constants';

export default function NumberPeople({ numberPeople, setNumberPeople }) {
    const [number, setNumber] = useState(numberPeople.num);
    const [sex, setSex] = useState(numberPeople.sex)

    useEffect(() => {
        setNumberPeople({ num: number, sex: sex })
    }, [number, sex])



    return (
        <View
            style={{
                width: SIZES.width,
                paddingVertical: SIZES.padding,
                paddingHorizontal: SIZES.padding,
            }}
        >
            <View
                style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginBottom: SIZES.padding

                }}
            >
                <Text style={{ ...FONTS.body3 }}>Số người:</Text>
                <View
                    style={{
                        flexDirection: 'row',
                        alignItems: 'center'
                    }}
                >
                    <TouchableOpacity
                        onPress={() => setNumber(number + 1)}
                    >
                        <AntDesign name="pluscircleo" size={24} color={COLORS.primary} />
                    </TouchableOpacity>
                    <Text
                        style={{
                            ...FONTS.body2,
                            marginHorizontal: SIZES.base
                        }}
                    >{number}</Text>
                    <TouchableOpacity
                        onPress={() => number > 1 && setNumber(number - 1)}
                    >
                        <AntDesign name="minuscircleo" size={24} color={COLORS.primary} />
                    </TouchableOpacity>
                </View>
            </View>
            <View
                style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',

                }}
            >
                <Text style={{ ...FONTS.body3 }}>Giới Tính:</Text>
                <View
                    style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                    }}
                >
                    <TouchableOpacity
                        style={{
                            paddingHorizontal: SIZES.base * 3 / 2,
                            paddingVertical: SIZES.base * 2 / 3,
                            backgroundColor: sex == 0 ? COLORS.white : 'rgba(0,0,0,0.1)',
                            minWidth: 70,
                            borderWidth: sex == 0 ? 1 : 0,
                            borderColor: COLORS.primary,
                            borderRadius: SIZES.radius / 2
                        }}
                        onPress={() => setSex(0)}
                    >
                        <Text style={{ ...FONTS.body3, textAlign: 'center' }}>Tất cả</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={{
                            paddingHorizontal: SIZES.base * 3 / 2,
                            paddingVertical: SIZES.base * 2 / 3,
                            backgroundColor: sex == 1 ? COLORS.white : 'rgba(0,0,0,0.1)', minWidth: 70,
                            borderWidth: sex == 1 ? 1 : 0,
                            borderColor: COLORS.primary,
                            borderRadius: SIZES.radius / 2
                        }}
                        onPress={() => setSex(1)}
                    >
                        <Text style={{ ...FONTS.body3, textAlign: 'center' }}>Nam</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={{
                            paddingHorizontal: SIZES.base * 3 / 2,
                            paddingVertical: SIZES.base * 2 / 3,
                            backgroundColor: sex == 2 ? COLORS.white : 'rgba(0,0,0,0.1)', minWidth: 70,
                            borderWidth: sex == 2 ? 1 : 0,
                            borderColor: COLORS.primary,
                            borderRadius: SIZES.radius / 2
                        }}
                        onPress={() => setSex(2)}
                    >
                        <Text style={{ ...FONTS.body3, textAlign: 'center' }}>Nữ</Text>
                    </TouchableOpacity>

                </View>
            </View>


        </View>
    )
}
