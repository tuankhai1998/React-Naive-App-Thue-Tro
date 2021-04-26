import React from 'react'
import { View, Text, TouchableHighlight, TouchableOpacity } from 'react-native'
import { COLORS, FONTS, SHADOW, SIZES } from '../../../constants';

export default function CityChoice({ modalVisible, setModalVisible, bigCity, changeCitySelected, citySelected }) {
    return (
        <TouchableHighlight
            style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.1)' }}
            onPress={() => { setModalVisible(!modalVisible); }}
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
                <Text
                    style={{
                        ...FONTS.body2,
                        textTransform: "uppercase",
                        textAlign: 'center',
                        paddingBottom: SIZES.padding,
                        borderBottomColor: COLORS.black,
                        borderBottomWidth: 1
                    }}
                >
                    Chọn Thành Phố
            </Text>
                <View>
                    {bigCity.map(city => (
                        <TouchableOpacity
                            style={{
                                flexDirection: "row",
                                alignItems: "center",
                                paddingVertical: SIZES.padding / 2,
                                borderBottomColor: COLORS.black,
                                borderBottomWidth: 1,
                            }}

                            onPress={() => {
                                changeCitySelected(city.id)
                                setModalVisible(false);
                            }}
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
                                    city.id == citySelected && <View
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
                            >{city.name}</Text>
                        </TouchableOpacity>
                    ))}
                </View>

            </View>
        </TouchableHighlight>
    )
}
