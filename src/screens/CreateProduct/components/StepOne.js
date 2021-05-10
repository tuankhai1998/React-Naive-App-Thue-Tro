//import liraries
import React, { Component, useState } from 'react';
import { View, Text, StyleSheet, TextInput } from 'react-native';
import { Checkbox } from 'react-native-paper';
import RadioButton from '../../../components/RadioButton';
import SubText from '../../../components/SubTexxt';
import { COLORS, FONTS, SIZES } from '../../../constants';
import { RoomType, Sex } from '../../../constants/values';

// create a component
const StepOne = () => {
    const [roomTypeSelected, setRoomTypeSelected] = useState(1);
    const [sexSelected, setSexSelected] = useState(0);
    const [electricFree, setElectricFree] = useState(false);
    return (
        <View style={{
            flex: 1,
            padding: SIZES.padding
        }}>
            <Text
                style={{
                    ...FONTS.body2,
                    marginTop: SIZES.base,
                    marginBottom: SIZES.base
                }}
            >
                Thông tin
            </Text>
            <Text
                style={{
                    ...FONTS.body3,
                }}
            >
                Loại phòng
            </Text>
            <RadioButton data={RoomType} selected={roomTypeSelected} setSelected={(values => setRoomTypeSelected(values))} />
            <Text
                style={{
                    ...FONTS.body3,
                }}
            >
                Diện Tích
            </Text>
            <View
                style={{
                    flexDirection: 'row',
                    alignItems: 'baseline'
                }}
            >
                <TextInput
                    style={{
                        backgroundColor: COLORS.white,
                        paddingHorizontal: SIZES.base,
                        flex: 1,
                        marginRight: SIZES.padding,
                        marginVertical: SIZES.base,
                        borderRadius: SIZES.radius / 2,
                        paddingVertical: SIZES.base,
                        maxWidth: SIZES.width * 2 / 3 - 2 * SIZES.padding
                    }}
                    keyboardType="number-pad"
                />
                <SubText base="m" exponent="2" />
            </View>

            <Text
                style={{
                    ...FONTS.body3,
                }}
            >
                Số phòng
            </Text>
            <View
                style={{
                    flexDirection: 'row',
                    alignItems: 'baseline'
                }}
            >
                <TextInput
                    style={{
                        backgroundColor: COLORS.white,
                        paddingHorizontal: SIZES.base,
                        flex: 1,
                        marginRight: SIZES.padding,
                        marginVertical: SIZES.base,
                        borderRadius: SIZES.radius / 2,
                        paddingVertical: SIZES.base,
                        maxWidth: SIZES.width * 2 / 3 - 2 * SIZES.padding
                    }}
                    keyboardType="number-pad"
                />
                <Text>phòng</Text>
            </View>

            <Text
                style={{
                    ...FONTS.body3,
                }}
            >
                Số người
            </Text>

            <View
                style={{
                    flexDirection: 'row',
                    alignItems: 'baseline'
                }}
            >
                <TextInput
                    style={{
                        backgroundColor: COLORS.white,
                        paddingHorizontal: SIZES.base,
                        flex: 1,
                        marginRight: SIZES.padding,
                        marginVertical: SIZES.base,
                        borderRadius: SIZES.radius / 2,
                        paddingVertical: SIZES.base,
                        maxWidth: SIZES.width * 2 / 3 - 2 * SIZES.padding
                    }}
                    keyboardType="number-pad"
                />
                <Text>người</Text>
            </View>

            <Text
                style={{
                    ...FONTS.body3,
                }}
            >
                Gới tính
            </Text>
            <RadioButton data={Sex} selected={sexSelected} setSelected={(values => setSexSelected(values))} />

            <Text
                style={{
                    ...FONTS.body2,
                    marginTop: SIZES.padding,
                    marginBottom: SIZES.base
                }}
            >
                Chi phí
            </Text>

            <Text
                style={{
                    ...FONTS.body3,
                }}
            >
                Giá phòng
            </Text>
            <View
                style={{
                    flexDirection: 'row',
                    alignItems: 'baseline'
                }}
            >
                <TextInput
                    style={{
                        backgroundColor: COLORS.white,
                        paddingHorizontal: SIZES.base,
                        flex: 1,
                        marginRight: SIZES.padding,
                        marginVertical: SIZES.base,
                        borderRadius: SIZES.radius / 2,
                        paddingVertical: SIZES.base,
                        maxWidth: SIZES.width * 2 / 3 - 2 * SIZES.padding
                    }}
                    keyboardType="number-pad"
                />
                <Text>VND/phòng</Text>
            </View>
            <Text
                style={{
                    ...FONTS.body3,
                }}
            >
                Giá điện
            </Text>
            <View
                style={{
                    flexDirection: 'row',
                    alignItems: 'baseline'
                }}
            >
                <TextInput
                    style={{
                        backgroundColor: COLORS.white,
                        paddingHorizontal: SIZES.base,
                        flex: 1,
                        marginRight: SIZES.padding,
                        marginVertical: SIZES.base,
                        borderRadius: SIZES.radius / 2,
                        paddingVertical: SIZES.base,
                        maxWidth: SIZES.width * 2 / 3 - 2 * SIZES.padding
                    }}
                    keyboardType="number-pad"
                />
                <Text>VND</Text>
                <Checkbox.Item
                    label="Miễn phi"
                    status={electricFree ? 'checked' : 'unchecked'}
                    onPress={() => setElectricFree(!electricFree)}
                    labelStyle={{
                        ...FONTS.body3,
                        color: COLORS.black,
                    }}
                    color={COLORS.primary}
                    style={{
                        flexDirection: 'row-reverse'
                    }}
                />
            </View>
            <Text
                style={{
                    ...FONTS.body3,
                }}
            >
                Giá nước
            </Text>
            <View
                style={{
                    flexDirection: 'row',
                    alignItems: 'baseline'
                }}
            >
                <TextInput
                    style={{
                        backgroundColor: COLORS.white,
                        paddingHorizontal: SIZES.base,
                        flex: 1,
                        marginRight: SIZES.padding,
                        marginVertical: SIZES.base,
                        borderRadius: SIZES.radius / 2,
                        paddingVertical: SIZES.base,
                        maxWidth: SIZES.width * 2 / 3 - 2 * SIZES.padding
                    }}
                    keyboardType="number-pad"
                />
                <Text>VND</Text>
                <Checkbox.Item
                    label="Miễn phi"
                    status={electricFree ? 'checked' : 'unchecked'}
                    onPress={() => setElectricFree(!electricFree)}
                    labelStyle={{
                        ...FONTS.body3,
                        color: COLORS.black,
                    }}
                    color={COLORS.primary}
                    style={{
                        flexDirection: 'row-reverse'
                    }}
                />
            </View>
            <Text
                style={{
                    ...FONTS.body3,
                }}
            >
                Internet
            </Text>
            <View
                style={{
                    flexDirection: 'row',
                    alignItems: 'baseline'
                }}
            >
                <TextInput
                    style={{
                        backgroundColor: COLORS.white,
                        paddingHorizontal: SIZES.base,
                        flex: 1,
                        marginRight: SIZES.padding,
                        marginVertical: SIZES.base,
                        borderRadius: SIZES.radius / 2,
                        paddingVertical: SIZES.base,
                        maxWidth: SIZES.width * 2 / 3 - 2 * SIZES.padding
                    }}
                    keyboardType="number-pad"
                />
                <Text>VND</Text>
                <Checkbox.Item
                    label="Miễn phi"
                    status={electricFree ? 'checked' : 'unchecked'}
                    onPress={() => setElectricFree(!electricFree)}
                    labelStyle={{
                        ...FONTS.body3,
                        color: COLORS.black,
                    }}
                    color={COLORS.primary}
                    style={{
                        flexDirection: 'row-reverse'
                    }}
                />
            </View>

            <Checkbox.Item
                label="Chỗ để xe"
                status={electricFree ? 'checked' : 'unchecked'}
                onPress={() => setElectricFree(!electricFree)}
                labelStyle={{
                    ...FONTS.body3,
                    color: COLORS.black,
                    paddingLeft: 0
                }}
                color={COLORS.primary}
                style={{
                    flexDirection: 'row-reverse',
                    justifyContent: 'flex-end'
                }}
            />

        </View>
    );
};


//make this component available to the app
export default StepOne;
