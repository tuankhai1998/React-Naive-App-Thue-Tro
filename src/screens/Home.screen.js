//import liraries
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { ImageBackground, Modal, Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { bigCity } from '../constants/bigCity';
import { COLORS, FONTS, SHADOW, SIZES } from '../constants/theme';

let buttonSearchHeader = [
    {
        background: "#17BEBB",
        text: "Tìm theo nhiều quận",
        icon: () => <Ionicons name="md-flash-outline" size={40} color={COLORS.white} />,
        onPress: () => { console.log("haha") }

    },
    {
        background: "#E4572E",
        text: "Tìm gần nơi học & làm",
        icon: () => <MaterialCommunityIcons name="google-nearby" size={40} color={COLORS.white} />,
        onPress: () => { console.log("haha") }

    },
    {
        background: "#27FB6B",
        text: "Đăng phòng",
        icon: () => <MaterialCommunityIcons name="home-plus-outline" size={40} color={COLORS.white} />,
        onPress: () => { console.log("haha") }

    }
]

// create a component

const HomeHeader = () => {
    let [citySelect, setCitySelect] = useState(1)
        , [modalVisible, setModalVisible] = useState(false)

    let selected = bigCity.filter(city => {
        return city.id == citySelect
    })[0].acronym

    return (
        <View>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    Alert.alert("Modal has been closed.");
                    setModalVisible(!modalVisible);
                }}
            >
                <View
                    style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.1)' }}
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
                                        borderBottomWidth: 1
                                    }}

                                    onPress={() => {
                                        setCitySelect(city.id)
                                        setModalVisible(!modalVisible);
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
                                            city.id == citySelect && <View
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
                </View>
            </Modal>
            <ImageBackground
                source={{ uri: 'https://images.unsplash.com/photo-1514565131-fce0801e5785?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=2024&q=80' }}
                style={{
                    width: SIZES.width,
                    height: SIZES.height / 3,
                    position: 'relative'
                }}
            />
            <View
                style={{
                    marginTop: - SIZES.height / 8,
                    paddingHorizontal: SIZES.padding,
                    paddingVertical: SIZES.padding,
                    marginHorizontal: SIZES.padding,
                    backgroundColor: COLORS.white,
                    borderRadius: SIZES.radius,
                    ...SHADOW.shadow1
                }}
            >
                {/* search  */}
                <View
                    style={{
                        flexDirection: "row",
                        backgroundColor: "#C0C0C0",
                        borderRadius: SIZES.radius,
                        overflow: "hidden"
                    }}
                >
                    <TouchableOpacity
                        style={{
                            backgroundColor: "#B0B0B0",
                            borderRadius: SIZES.radius,
                            flexDirection: 'row',
                            padding: SIZES.base,
                            alignItems: 'center'
                        }}
                        onPress={() => setModalVisible(!modalVisible)}
                    >
                        <MaterialCommunityIcons name="map-marker" size={17} color={COLORS.secondary} />
                        <Text style={{
                            color: COLORS.secondary,
                            ...FONTS.body4
                        }}>{selected}</Text>
                    </TouchableOpacity>
                    {/* Input */}
                    <TouchableOpacity
                        style={{
                            flex: 1,
                            justifyContent: 'center',
                            marginHorizontal: SIZES.base,
                            borderRadius: SIZES.borderRadius
                        }}
                    >
                        <Text style={{ color: COLORS.white, ...FONTS.body4, fontSize: 12.5 }}>Tìm theo quận, tên đường, địa điểm</Text>
                    </TouchableOpacity>

                </View>
                <View
                    style={{
                        marginTop: SIZES.padding,
                        flexDirection: "row",
                        justifyContent: 'space-between'
                    }}
                >
                    {
                        buttonSearchHeader.map(button => (
                            <View
                                style={{
                                    width: (SIZES.width - SIZES.padding * 4) / 3 - (SIZES.base * 3),
                                    justifyContent: 'center',
                                    alignItems: 'center'
                                }}
                            >
                                <TouchableOpacity
                                    style={{
                                        backgroundColor: `${button.background}`,
                                        borderRadius: SIZES.radius * 1.75,
                                        width: (SIZES.width - SIZES.padding * 4) / 4 - (SIZES.base * 3),
                                        height: (SIZES.width - SIZES.padding * 4) / 4 - (SIZES.base * 3),
                                        justifyContent: 'center',
                                        alignItems: 'center'
                                    }}

                                    onPress={() => button.onPress()}
                                >
                                    {button.icon()}
                                </TouchableOpacity>
                                <Text style={{
                                    textAlign: 'center'
                                }}>{button.text}</Text>
                            </View>
                        ))
                    }

                </View>
            </View>
        </View >
    )
}


const HomeScreen = () => {
    return (
        <View style={{
            flex: 1,
            justifyContent: "flex-start",
        }}>
            <HomeHeader />

        </View>
    );
};


//make this component available to the app
export default HomeScreen;
