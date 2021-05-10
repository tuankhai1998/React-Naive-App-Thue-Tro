import { useLazyQuery } from '@apollo/client'
import { Feather, Fontisto, Ionicons } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/core'
import React, { useState } from 'react'
import { Animated, FlatList, Image, Text, TouchableOpacity, View } from 'react-native'
import Swiper from 'react-native-swiper'
import { useEffect } from 'react/cjs/react.development'
import ItemHorizontalList from '../../components/ItemHorizontalList'
import SubText from '../../components/SubTexxt'
import { COLORS, FONTS, SIZES } from '../../constants'
import { FETCH_ROOM } from '../../graphql/room'
import { ProductHeader } from './components/ProductHeader'


let listImage = [
    "https://loremflickr.com/320/240",
    "https://loremflickr.com/320/240",
    "https://loremflickr.com/320/240",
    "https://loremflickr.com/320/240"
]

export default function ProductScreen() {
    let sex;
    const navigation = useNavigation();
    const scrollY = new Animated.Value(0);
    const [fetchSameRoom, { error: errorRoom, data: dataRoom, loading }] = useLazyQuery(FETCH_ROOM);
    const [sameRooms, setSameRooms] = useState([]);

    useEffect(() => {
        fetchSameRoom({
            variables: {
                page: 1,
                per_page: 6,
                query: {
                    addressName: {
                        city: 'Hà Nội'
                    }
                }
            }
        })
    }, [])

    useEffect(() => {
        if (dataRoom) {
            setSameRooms([...dataRoom.rooms]);
        }
    }, [dataRoom])

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

    return (
        <View
            style={{
                flex: 1,
                backgroundColor: 'rgba(0,0,0,0)'
            }}
        >
            <ProductHeader scrollY={scrollY} />
            <Animated.ScrollView
                scrollEventThrottle={1}
                onScroll={Animated.event(
                    [{ nativeEvent: { contentOffset: { y: scrollY } } }],
                    { useNativeDriver: false },
                )}
                style={{ backgroundColor: 'rgba(0,0,0,0.1)' }}
            >
                <View
                    style={{
                        height: SIZES.width * 2 / 3,
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
                                >30 <SubText base="m" exponent="2" color={COLORS.primary} /></Text>
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
                        marginBottom: SIZES.base
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

                {/*----------------address------------- */}
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
                            marginBottom: SIZES.base
                        }}
                    >
                        Địa chỉ
                    </Text>


                    <TouchableOpacity
                        style={{
                            ...FONTS.body3,
                            flexDirection: 'row',
                            flexWrap: 'wrap',
                            marginBottom: SIZES.base
                        }}
                    >
                        <Text>
                            <Feather name="map-pin" size={SIZES.body3} color="black" />
                            <Text > 127 Đường Phạm Hùng, Trung Hòa, Cầu Giấy, Hà Nội.</Text>
                            <Text> </Text>
                            <Text style={{ fontSize: SIZES.body3 - 1, color: '#0000EE' }}>
                                Chỉ đường
                            </Text>
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={{
                            ...FONTS.body3,
                            flexDirection: 'row',
                            flexWrap: 'wrap',
                            marginBottom: SIZES.base
                        }}
                    >
                        <Text>
                            <Feather name="phone" size={SIZES.body3} color="black" />
                            <Text>  </Text>
                            <Text >035 706 0055.</Text>
                        </Text>
                    </TouchableOpacity>

                </View>
                {/*----------------address------------- */}

                {/* ---------------Poster-------------- */}
                <TouchableOpacity
                    style={{
                        backgroundColor: COLORS.white,
                        padding: SIZES.padding,
                        marginBottom: SIZES.base,
                        flexDirection: 'row',
                        alignItems: 'center'
                    }}
                >
                    <View
                        style={{
                            width: 70,
                            height: 70,
                            borderRadius: 50,
                            overflow: 'hidden',
                            marginRight: SIZES.padding
                        }}
                    >
                        <Image source={{
                            uri: 'https://loremflickr.com/320/240',
                        }}
                            style={{
                                resizeMode: 'stretch',
                                width: '100%',
                                height: '100%'
                            }} />
                    </View>
                    <View
                        style={{
                            flex: 1
                        }}
                    >
                        <Text
                            style={{ ...FONTS.body2 }}
                        >
                            Đạt 1 Lít
                        </Text>

                        <Text
                            style={{ color: COLORS.primary }}
                        >
                            n phòng
                        </Text>

                    </View>
                    <Feather name="chevron-right" size={24} color="black" />

                </TouchableOpacity>
                {/* ---------------Poster-------------- */}
                {/* ---------------Utilities----------- */}
                <View
                    style={{
                        backgroundColor: COLORS.white,
                        padding: SIZES.padding,
                        marginBottom: SIZES.base
                    }}
                >
                    <Text
                        style={{
                            ...FONTS.body3
                        }}
                    >
                        Các phòng cùng tiêu chí
                    </Text>


                    <FlatList
                        contentContainerStyle={{ alignSelf: 'flex-start' }}
                        numColumns={2}
                        showsVerticalScrollIndicator={false}
                        showsHorizontalScrollIndicator={false}
                        data={sameRooms.length > 0 ? sameRooms : []}
                        renderItem={({ item, index }) => <ItemHorizontalList index={index} item={item} />}
                        style={{
                            marginTop: SIZES.base,
                        }}
                    />
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
        </View >
    )
}
