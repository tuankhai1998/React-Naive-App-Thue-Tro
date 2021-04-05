import { Fontisto, Ionicons } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/core'
import React from 'react'
import { Animated, Image, ScrollView, Text, TouchableOpacity, View } from 'react-native'
import Swiper from 'react-native-swiper'
import { COLORS, FONTS, SIZES } from '../../constants'

import { Header } from './components';


let listImage = [
    "https://loremflickr.com/320/240",
    "https://loremflickr.com/320/240",
    "https://loremflickr.com/320/240",
    "https://loremflickr.com/320/240"
]

export default function ProductScreen() {

    const scrollY = new Animated.Value(0);
    let sex;
    const navigation = useNavigation();
    const RenderHeader = ({ showBg }) => {
        return (
            <View
                style={{
                    width: SIZES.width,
                    height: SIZES.height / 12,
                    maxHeight: 70,
                    paddingHorizontal: SIZES.padding,
                    justifyContent: 'space-between',
                    paddingTop: 30,
                    flexDirection: 'row',
                    zIndex: 2
                }}
            >

                <TouchableOpacity
                    style={{
                        width: 30,
                        height: 30,
                        justifyContent: 'center',
                        alignItems: 'center',
                        borderRadius: 20,
                        backgroundColor: 'rgba(0,0,0,0.2)'
                    }}
                    onPress={() => navigation.goBack()}
                >
                    <Ionicons name="arrow-back" size={24} color={COLORS.white} />
                </TouchableOpacity>

                <TouchableOpacity
                    style={{
                        width: 30,
                        height: 30,
                        justifyContent: 'center',
                        alignItems: 'center',
                        borderRadius: 20,
                        backgroundColor: 'rgba(0,0,0,0.2)'
                    }}
                >
                    <Ionicons name="heart-outline" size={25} color={COLORS.white} />
                </TouchableOpacity>

            </View>
        )
    }

    const renderSlideProduct = (itemList) => {

        return (
            <Swiper
                height={SIZES.width}
            >
                {
                    itemList.map((item, index) => (
                        <View
                            key={index}
                            style={{
                                flex: 1,
                                justifyContent: 'center',
                                backgroundColor: 'transparent'
                            }}
                        >
                            <Image
                                resizeMode="stretch"
                                style={{
                                    width: SIZES.width,
                                    flex: 1,
                                }}
                                source={{ uri: item }}
                            />
                        </View>

                    ))
                }

            </Swiper>
        )
    }

    const sub = (base, exponent, color) => {
        return <View style={{ flexDirection: 'row' }}>
            <View style={{ alignItems: 'flex-end' }}>
                <Text style={{ fontSize: 13, color: `${color}` }}>{base}</Text>
            </View>
            <View style={{ alignItems: 'flex-start' }}>
                <Text style={{ fontSize: 10, color: `${color}` }}>{exponent}</Text>
            </View>
        </View>
    }


    return (
        <View
            style={{
                backgroundColor: 'rgba(0,0,0,0.1)',
                flex: 1,
                paddingBottom: 20
            }}
        >

            <Header scrollY={scrollY} />
            <Animated.ScrollView
                scrollEventThrottle={1}
                onScroll={Animated.event(
                    [{ nativeEvent: { contentOffset: { y: scrollY } } }],
                    { useNativeDriver: false },
                )}
            >

                <View
                    style={{
                        height: SIZES.width * 2 / 3,
                        marginTop: -SIZES.height / 12,
                        zIndex: 1
                    }}
                >
                    {renderSlideProduct(listImage)}
                </View>
                {/* -------header-------- */}
                <View
                    style={{
                        backgroundColor: COLORS.white,
                        marginBottom: SIZES.base,
                        padding: SIZES.base * 2
                    }}
                >
                    <Text
                        style={{
                            ...FONTS.body4,
                            textTransform: 'uppercase',
                            fontSize: 13,
                        }}
                    >Tìm người thuê. 3 <Ionicons name={sex == 0 ? "male-female-outline" : sex == 1 ? "female-outline" : "female-outline"} size={13} color="black" /></Text>
                    <Text
                        style={{
                            ...FONTS.body2,
                            color: '#333333'
                        }}
                    >
                        Phòng cho thuê Đường Phạm Hùng, Quận Cầu Giấy
                </Text>
                    <View
                        style={{
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}
                    >
                        <Text style={{ ...FONTS.h3, color: COLORS.primary, marginVertical: SIZES.base }}>5 triệu VND/phòng</Text>
                        <View
                            style={{
                                flexDirection: 'row',
                                justifyContent: 'space-around',
                                width: '100%'
                            }}
                        >
                            <View
                                style={{
                                    justifyContent: 'center',
                                    alignItems: 'center'
                                }}
                            >
                                <Text style={{
                                    color: '#6C6C6C',
                                    ...FONTS.body4, textTransform: 'uppercase', fontSize: 13, marginBottom: SIZES.base
                                }}>Còn Phòng</Text>
                                <Text
                                    style={{
                                        color: COLORS.primary,
                                        ...FONTS.body3
                                    }}
                                >Còn</Text>
                            </View>
                            <View
                                style={{
                                    justifyContent: 'center',
                                    alignItems: 'center'
                                }}
                            >
                                <Text style={{
                                    color: '#6C6C6C',
                                    ...FONTS.body4, textTransform: 'uppercase', fontSize: 13, marginBottom: SIZES.base
                                }}>Diện Tích</Text>
                                <Text
                                    style={{
                                        color: COLORS.primary,
                                        ...FONTS.body3
                                    }}
                                >30 {sub('m', '2', COLORS.primary)}</Text>
                            </View>
                            <View
                                style={{
                                    justifyContent: 'center',
                                    alignItems: 'center'
                                }}
                            >
                                <Text style={{
                                    color: '#6C6C6C',
                                    ...FONTS.body4, textTransform: 'uppercase', fontSize: 13, marginBottom: SIZES.base
                                }}>Đặt Cọc</Text>
                                <Text
                                    style={{
                                        color: COLORS.primary,
                                        ...FONTS.body3
                                    }}
                                >5tr </Text>
                            </View>
                        </View>

                    </View>
                    <View
                        style={{
                            width: "100%",
                            flexDirection: 'row',
                            justifyContent: 'space-around',
                            marginTop: SIZES.base,
                            paddingTop: SIZES.base,
                            borderTopColor: COLORS.primaryTextColor,
                            borderTopWidth: 1
                        }}
                    >
                        <View
                            style={{
                                justifyContent: 'center',
                                alignItems: 'center'
                            }}
                        >
                            <Ionicons name="flash-outline" size={24} color="black" />
                            <Text
                                style={{
                                    ...FONTS.body4,
                                    marginTop: SIZES.base
                                }}>3k</Text>
                        </View>
                        <View
                            style={{
                                justifyContent: 'center',
                                alignItems: 'center'
                            }}
                        >
                            <Ionicons name="water-outline" size={24} color="black" />
                            <Text
                                style={{
                                    ...FONTS.body4,
                                    marginTop: SIZES.base
                                }}>3k</Text>
                        </View>
                        <View
                            style={{
                                justifyContent: 'center',
                                alignItems: 'center'
                            }}
                        >
                            <Ionicons name="wifi-outline" size={24} color="black" />
                            <Text
                                style={{
                                    ...FONTS.body4,
                                    marginTop: SIZES.base
                                }}>80k</Text>
                        </View>
                        <View
                            style={{
                                justifyContent: 'center',
                                alignItems: 'center'
                            }}
                        >
                            <Fontisto name="motorcycle" size={24} color="black" />
                            <Text
                                style={{
                                    ...FONTS.body4,
                                    marginTop: SIZES.base
                                }}>80k</Text>
                        </View>

                    </View>
                </View>
                {/* --------------- ----- */}
                <View
                    style={{
                        backgroundColor: COLORS.white,
                        padding: SIZES.padding,
                        marginBottom: SIZES.base
                    }}
                >
                    <Text
                        style={{
                            ...FONTS.body3,
                            color: COLORS.primary
                        }}
                    >
                        Phòng đã xác thực
                </Text>
                    <Text
                        style={{ ...FONTS.body3, textAlign: 'justify' }}
                    >
                        Phòng đã xác thực là phòng được FindHome đảm bảo chất lượng và giá cả. Nơi bạn có thể yên thâm đặt đọc giữ chỗ ngay trên FindHome. Bạn không phải lo lắng mỗi khi đặt cọc giữu chỗ với chủ nhà xa lạ nưa.
                </Text>
                </View>
                {/* ---------------Utilities----------- */}
                <View
                    style={{
                        backgroundColor: COLORS.white,
                        padding: SIZES.padding,
                        marginBottom: SIZES.padding
                    }}
                >
                    <Text
                        style={{
                            ...FONTS.body3
                        }}
                    >
                        Tiện ích
                </Text>
                    <View style={{
                        width: '100%',
                        flexDirection: 'row',
                        justifyContent: 'flex-start',
                        flexWrap: 'wrap'

                    }}>
                        <View
                            style={{
                                justifyContent: 'center',
                                alignItems: 'center',
                                marginBottom: SIZES.base,
                                width: (SIZES.width - SIZES.padding * 2) / 4
                            }}
                        >
                            <Ionicons name="wifi-outline" size={24} color="black" />
                            <Text
                                style={{
                                    ...FONTS.body4,
                                    marginTop: SIZES.base / 2
                                }}>wifi</Text>
                        </View>
                        <View
                            style={{
                                justifyContent: 'center',
                                alignItems: 'center',
                                marginBottom: SIZES.base,
                                width: (SIZES.width - SIZES.padding * 2) / 4
                            }}
                        >
                            <Ionicons name="wifi-outline" size={24} color="black" />
                            <Text
                                style={{
                                    ...FONTS.body4,
                                    marginTop: SIZES.base / 2
                                }}>wifi</Text>
                        </View>
                        <View
                            style={{
                                justifyContent: 'center',
                                alignItems: 'center',
                                marginBottom: SIZES.base,
                                width: (SIZES.width - SIZES.padding * 2) / 4
                            }}
                        >
                            <Ionicons name="wifi-outline" size={24} color="black" />
                            <Text
                                style={{
                                    ...FONTS.body4,
                                    marginTop: SIZES.base / 2
                                }}>wifi</Text>
                        </View>
                        <View
                            style={{
                                justifyContent: 'center',
                                alignItems: 'center',
                                marginBottom: SIZES.base,
                                width: (SIZES.width - SIZES.padding * 2) / 4
                            }}
                        >
                            <Ionicons name="wifi-outline" size={24} color="black" />
                            <Text
                                style={{
                                    ...FONTS.body4,
                                    marginTop: SIZES.base / 2
                                }}>wifi</Text>
                        </View>
                        <View
                            style={{
                                justifyContent: 'center',
                                alignItems: 'center',
                                marginBottom: SIZES.base,
                                width: (SIZES.width - SIZES.padding * 2) / 4
                            }}
                        >
                            <Ionicons name="wifi-outline" size={24} color="black" />
                            <Text
                                style={{
                                    ...FONTS.body4,
                                    marginTop: SIZES.base / 2
                                }}>wifi</Text>
                        </View>
                        <View
                            style={{
                                justifyContent: 'center',
                                alignItems: 'center',
                                marginBottom: SIZES.base,
                                width: (SIZES.width - SIZES.padding * 2) / 4
                            }}
                        >
                            <Ionicons name="wifi-outline" size={24} color="black" />
                            <Text
                                style={{
                                    ...FONTS.body4,
                                    marginTop: SIZES.base / 2
                                }}>wifi</Text>
                        </View>
                        <View
                            style={{
                                justifyContent: 'center',
                                alignItems: 'center',
                                marginBottom: SIZES.base,
                                width: (SIZES.width - SIZES.padding * 2) / 4,
                                borderRadius: SIZES.radius,
                            }}
                        >
                            <Ionicons name="wifi-outline" size={24} color="black" />
                            <Text
                                style={{
                                    ...FONTS.body4,
                                    marginTop: SIZES.base / 2
                                }}>wifi</Text>
                        </View>
                        <View
                            style={{
                                justifyContent: 'center',
                                alignItems: 'center',
                                marginBottom: SIZES.base,
                                width: (SIZES.width - SIZES.padding * 2) / 4
                            }}
                        >
                            <Ionicons name="wifi-outline" size={24} color="black" />
                            <Text
                                style={{
                                    ...FONTS.body4,
                                    marginTop: SIZES.base / 2
                                }}>wifi</Text>
                        </View>

                    </View>
                    <TouchableOpacity
                        style={{
                            marginTop: SIZES.base,
                            borderTopWidth: 1,
                            borderColor: COLORS.primaryTextColor,
                            paddingTop: SIZES.base

                        }}
                    >
                        <Text
                            style={{
                                textAlign: 'center',
                                ...FONTS.body3,
                                color: '#0000EE'
                            }}
                        >
                            Xem Thêm
                    </Text>
                    </TouchableOpacity>
                </View>
                {/* ---------------Utilities----------- */}

            </Animated.ScrollView>

        </View>
    )
}
