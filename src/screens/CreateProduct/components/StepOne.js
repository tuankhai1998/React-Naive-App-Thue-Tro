//import liraries
import React, { Component, useEffect, useState } from 'react';
import { View, Text, StyleSheet, TextInput } from 'react-native';
import { Checkbox } from 'react-native-paper';
import RadioButton from '../../../components/RadioButton';
import SubText from '../../../components/SubTexxt';
import { COLORS, FONTS, SIZES } from '../../../constants';
import { RoomType, Sex } from '../../../constants/values';

// create a component
const StepOne = ({ data, setData, setValidate }) => {
    const { sex, type, roomNum, acreage, peoples, price } = data;

    const { room, electricity, internet, water } = price;
    let checkPrice = () => {
        let number = 0;
        for (const key in price) {
            if (Object.hasOwnProperty.call(price, key)) {
                const element = price[key];
                if (element.price || element.free) {
                    number++;
                }
            }
        }
        return number == 4;
    };

    useEffect(() => {
        if (typeof sex == 'number' && typeof type == 'number' && roomNum && acreage && peoples && checkPrice()) {
            setValidate(true);
        } else {
            setValidate(false);
        }
    }, [sex, type, roomNum, acreage, peoples, price]);

    return (
        <>
            <View
                style={{
                    flex: 1,
                    padding: SIZES.padding,
                }}
            >
                <Text
                    style={{
                        ...FONTS.body2,
                        marginTop: SIZES.base,
                        marginBottom: SIZES.base,
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
                <RadioButton
                    data={RoomType}
                    selected={type}
                    setSelected={(values) => setData({ ...data, type: values })}
                />
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
                        alignItems: 'baseline',
                    }}
                >
                    <TextInput
                        style={{
                            backgroundColor: COLORS.white,
                            ...styles.inputStyle,
                            maxWidth: (SIZES.width * 2) / 3 - 2 * SIZES.padding,
                        }}
                        keyboardType="number-pad"
                        value={acreage ? acreage : ''}
                        onChangeText={(text) => setData({ ...data, acreage: parseInt(text) })}
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
                        alignItems: 'baseline',
                    }}
                >
                    <TextInput
                        style={{
                            backgroundColor: COLORS.white,
                            ...styles.inputStyle,
                            maxWidth: (SIZES.width * 2) / 3 - 2 * SIZES.padding,
                        }}
                        value={roomNum ? roomNum : ''}
                        onChangeText={(text) => setData({ ...data, roomNum: parseInt(text) })}
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
                        alignItems: 'baseline',
                    }}
                >
                    <TextInput
                        style={{
                            backgroundColor: COLORS.white,
                            ...styles.inputStyle,
                            maxWidth: (SIZES.width * 2) / 3 - 2 * SIZES.padding,
                        }}
                        keyboardType="number-pad"
                        value={peoples ? peoples : ''}
                        onChangeText={(text) => setData({ ...data, peoples: parseInt(text) })}
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
                <RadioButton data={Sex} selected={sex} setSelected={(values) => setData({ ...data, sex: values })} />

                <Text
                    style={{
                        ...FONTS.body2,
                        marginTop: SIZES.padding,
                        marginBottom: SIZES.base,
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
                        alignItems: 'baseline',
                    }}
                >
                    <TextInput
                        style={{
                            backgroundColor: COLORS.white,
                            ...styles.inputStyle,
                        }}
                        value={price && room && room?.price ? room?.price : ''}
                        onChangeText={(text) =>
                            setData({
                                ...data,
                                price: {
                                    ...price,
                                    room: {
                                        ...room,
                                        price: parseInt(text),
                                    },
                                },
                            })
                        }
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
                        alignItems: 'baseline',
                    }}
                >
                    {electricity?.free ? (
                        <View
                            style={{
                                backgroundColor: electricity?.free ? COLORS.lightGray : COLORS.white,
                                ...styles.inputStyle,
                                height: 43,
                            }}
                        />
                    ) : (
                        <TextInput
                            style={{
                                backgroundColor: electricity?.free ? COLORS.lightGray : COLORS.white,
                                ...styles.inputStyle,
                            }}
                            value={price && electricity && electricity?.price ? electricity?.price : ''}
                            onChangeText={(text) => {
                                setData({
                                    ...data,
                                    price: {
                                        ...price,
                                        electricity: {
                                            ...electricity,
                                            price: parseInt(text),
                                        },
                                    },
                                });
                            }}
                            keyboardType="number-pad"
                        />
                    )}
                    <Text>VND</Text>
                    <Checkbox.Item
                        label="Miễn phi"
                        status={price && electricity && electricity?.free ? 'checked' : 'unchecked'}
                        onPress={() =>
                            setData({
                                ...data,
                                price: {
                                    ...price,
                                    electricity: {
                                        ...electricity,
                                        free: !electricity?.free,
                                    },
                                },
                            })
                        }
                        labelStyle={{
                            ...FONTS.body3,
                            color: COLORS.black,
                        }}
                        color={COLORS.primary}
                        style={{
                            flexDirection: 'row-reverse',
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
                        alignItems: 'baseline',
                    }}
                >
                    {water?.free ? (
                        <View
                            style={{
                                backgroundColor: water?.free ? COLORS.lightGray : COLORS.white,
                                ...styles.inputStyle,
                                height: 43,
                            }}
                        />
                    ) : (
                        <TextInput
                            style={{
                                backgroundColor: COLORS.white,
                                ...styles.inputStyle,
                            }}
                            value={price && water && water?.price ? water?.price : ''}
                            onChangeText={(text) =>
                                setData({
                                    ...data,
                                    price: {
                                        ...price,
                                        water: {
                                            ...water,
                                            price: parseInt(text),
                                        },
                                    },
                                })
                            }
                            keyboardType="number-pad"
                        />
                    )}

                    <Text>VND</Text>
                    <Checkbox.Item
                        label="Miễn phi"
                        status={price && water && water?.free ? 'checked' : 'unchecked'}
                        onPress={() =>
                            setData({
                                ...data,
                                price: {
                                    ...price,
                                    water: {
                                        ...water,
                                        free: !water?.free,
                                    },
                                },
                            })
                        }
                        labelStyle={{
                            ...FONTS.body3,
                            color: COLORS.black,
                        }}
                        color={COLORS.primary}
                        style={{
                            flexDirection: 'row-reverse',
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
                        alignItems: 'baseline',
                    }}
                >
                    {internet?.free ? (
                        <View
                            style={{
                                backgroundColor: COLORS.lightGray,
                                ...styles.inputStyle,
                                height: 43,
                            }}
                        />
                    ) : (
                        <TextInput
                            style={{
                                backgroundColor: COLORS.white,
                                ...styles.inputStyle,
                            }}
                            value={price && internet && internet?.price ? internet?.price : ''}
                            onChangeText={(text) =>
                                setData({
                                    ...data,
                                    price: {
                                        ...price,
                                        internet: {
                                            ...internet,
                                            price: parseInt(text),
                                        },
                                    },
                                })
                            }
                            keyboardType="number-pad"
                        />
                    )}
                    <Text>VND</Text>
                    <Checkbox.Item
                        label="Miễn phi"
                        status={price && internet && internet?.free ? 'checked' : 'unchecked'}
                        onPress={() =>
                            setData({
                                ...data,
                                price: {
                                    ...price,
                                    internet: {
                                        ...internet,
                                        free: !internet?.free,
                                    },
                                },
                            })
                        }
                        labelStyle={{
                            ...FONTS.body3,
                            color: COLORS.black,
                        }}
                        color={COLORS.primary}
                        style={{
                            flexDirection: 'row-reverse',
                        }}
                    />
                </View>
                {/* <View
                    style={{
                        justifyContent: 'flex-end',
                        marginHorizontal: -SIZES.padding
                    }}
                >

                    <Checkbox.Item
                        label="Chỗ để xe"
                        status={electricFree ? 'checked' : 'unchecked'}
                        onPress={() => setElectricFree(!electricFree)}
                        labelStyle={{
                            ...FONTS.body3,
                            color: COLORS.black,
                        }}
                        color={COLORS.primary}
                        style={{
                            flexDirection: 'row-reverse',
                            justifyContent: 'flex-end',

                        }}
                    />
                </View>

                <Text
                    style={{
                        ...FONTS.body3,
                    }}
                >
                    Để xe
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
                </View> */}
            </View>
        </>
    );
};

//make this component available to the app
export default StepOne;

const styles = StyleSheet.create({
    inputStyle: {
        paddingHorizontal: SIZES.base,
        flex: 1,
        marginRight: SIZES.padding,
        marginVertical: SIZES.base,
        borderRadius: SIZES.radius / 2,
        paddingVertical: SIZES.base,
        maxWidth: (SIZES.width * 2) / 3 - 2 * SIZES.padding,
    },
});
