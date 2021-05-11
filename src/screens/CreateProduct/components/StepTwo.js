import { Ionicons } from '@expo/vector-icons';
import React, { useCallback, useState } from 'react';
import { Modal, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { COLORS, FONTS, SHADOW, SIZES } from '../../../constants';
import { city } from '../../../constants/city'



export default function StepTwo() {
    const [modalVisible, setModalVisible] = useState(false);
    const [datas, setDatas] = useState([...city]);
    const [citySelected, setCitySelected] = useState('Hà Nội')




    const renderModal = useCallback(
        () => {
            return (
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
                    <View>
                        {datas.map(data => (
                            <TouchableOpacity
                                style={{
                                    flexDirection: "row",
                                    alignItems: "center",
                                    paddingVertical: SIZES.padding / 2,
                                    borderBottomColor: COLORS.black,
                                    borderBottomWidth: 1,
                                }}

                                onPress={() => {
                                    setCitySelected(data.name)
                                    setModalVisible(false);
                                }}
                            >
                                <View
                                    style={{
                                        width: 15,
                                        height: 15,
                                        borderRadius: 15,
                                        borderColor: COLORS.black,
                                        borderWidth: 2,
                                        justifyContent: 'center',
                                        alignItems: 'center'
                                    }}
                                >
                                    {
                                        data.name == citySelected && <View
                                            style={{
                                                width: 10,
                                                height: 10,
                                                borderRadius: 16,
                                                backgroundColor: COLORS.primary
                                            }}
                                        ></View>
                                    }
                                </View>
                                <Text
                                    style={{
                                        marginLeft: SIZES.padding,
                                        fontSize: SIZES.body2,
                                        ...FONTS.body2
                                    }}
                                >{data.name}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>

                </View>
            )
        },
        [datas],
    )


    return (
        <View
            style={{
                flex: 1,
                padding: SIZES.padding
            }}
        >
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(!modalVisible);
                }}
            >
                <View
                    style={{
                        backgroundColor: "rgba(0,0,0,0.1)",
                        width: SIZES.width,
                        height: SIZES.height,
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}
                >
                    {renderModal()}
                </View>
            </Modal>
            <Text
                style={{
                    ...FONTS.body2,
                    marginBottom: SIZES.base
                }}
            >
                Địa chỉ
            </Text>

            <Text
                style={{
                    ...FONTS.body3,
                }}
            >
                Thành phố
            </Text>
            <View
                style={{
                    marginVertical: SIZES.base
                }}
            >
                <TouchableOpacity
                    style={{
                        paddingLeft: SIZES.base,
                        paddingVertical: SIZES.base,
                        borderBottomColor: COLORS.black,
                        borderBottomWidth: 1,
                        flexDirection: 'row',
                        justifyContent: 'space-between'

                    }}
                    onPress={() => setModalVisible(true)}
                >
                    <Text
                        style={{
                            ...FONTS.body3
                        }}
                    >Thành phố</Text>

                    <Ionicons name="chevron-down" size={20} color="black" />
                </TouchableOpacity>
            </View>

            <Text
                style={{
                    ...FONTS.body3,
                }}
            >
                Quận/Huyện
            </Text>
            <View
                style={{
                    marginVertical: SIZES.base
                }}
            >
                <TouchableOpacity
                    style={{
                        paddingLeft: SIZES.base,
                        paddingVertical: SIZES.base,
                        borderBottomColor: COLORS.black,
                        borderBottomWidth: 1,
                        flexDirection: 'row',
                        justifyContent: 'space-between'

                    }}
                >
                    <Text
                        style={{
                            ...FONTS.body3
                        }}
                    >Quận/ Huyện</Text>

                    <Ionicons name="chevron-down" size={20} color="black" />
                </TouchableOpacity>
            </View>

            <Text
                style={{
                    ...FONTS.body3,
                }}
            >
                Xã/ Phường
            </Text>
            <View
                style={{
                    marginVertical: SIZES.base
                }}
            >
                <TouchableOpacity
                    style={{
                        paddingLeft: SIZES.base,
                        paddingVertical: SIZES.base,
                        borderBottomColor: COLORS.black,
                        borderBottomWidth: 1,
                        flexDirection: 'row',
                        justifyContent: 'space-between'

                    }}
                >
                    <Text
                        style={{
                            ...FONTS.body3
                        }}
                    > Xã/ Phường</Text>

                    <Ionicons name="chevron-down" size={20} color="black" />
                </TouchableOpacity>
            </View>

            <Text
                style={{
                    ...FONTS.body3,
                }}
            >
                Đương,Số Nhà
            </Text>
            <View
                style={{
                    marginVertical: SIZES.base
                }}
            >
                <TextInput
                    style={{
                        backgroundColor: COLORS.white,
                        paddingHorizontal: SIZES.base,
                        flex: 1,
                        marginVertical: SIZES.base,
                        borderRadius: SIZES.radius / 2,
                        paddingVertical: SIZES.base,
                    }}
                />
            </View>



        </View>
    )
}
