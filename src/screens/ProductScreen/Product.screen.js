import { useLazyQuery, useQuery } from '@apollo/client'
import { Feather, Fontisto, Ionicons } from '@expo/vector-icons'
import { useNavigation, useRoute } from '@react-navigation/core'
import React, { useState } from 'react'
import { Alert, Animated, FlatList, Image, Linking, Platform, Text, TouchableOpacity, View } from 'react-native'
import { Avatar } from 'react-native-paper'
import Swiper from 'react-native-swiper'
import { useEffect } from 'react/cjs/react.development'
import GroupUtilities from '../../components/GroupUtilities'
import ItemHorizontalList from '../../components/ItemHorizontalList'
import PrimaryButton from '../../components/PrimaryButton'
import SubText from '../../components/SubTexxt'
import { COLORS, FONTS, SIZES } from '../../constants'
import { Utilities } from '../../constants/values'
import { URI } from '../../graphql/apollo'
import { CURRENT_ROOM, FETCH_ROOM } from '../../graphql/room'
import { ProductHeader } from './components/ProductHeader'
import getDirections from 'react-native-google-maps-directions'
import * as Location from 'expo-location';
import { useMutation } from '@apollo/react-hooks'
import { CREATE_CHAT_ROOM } from '../../graphql/chat'

let listUtilities = Utilities.map(item => Object.assign({}, item))

export default function ProductScreen() {
    const navigation = useNavigation();
    const scrollY = new Animated.Value(0);
    const route = useRoute();
    const { params } = route;
    const { idRoom, rent } = params;

    const [fetchSameRoom, { error: errorRoom, data: dataRoom, loading }] = useLazyQuery(FETCH_ROOM);
    const { data: currentRoom, loading: roomLoading, error: currentRoomError } = useQuery(CURRENT_ROOM, {
        variables: {
            idRoom
        }
    })

    const [createChatRoom] = useMutation(CREATE_CHAT_ROOM, {
        onCompleted: (data) => {

            console.log(data)
            let { members, _id } = data.createRoomChat;
            let { room } = currentRoom

            let userID = members.find(member => member._id !== room.createdBy._id)

            navigation.push('ChatList', {
                _id,
                userID,
                to: room.createdBy._id
            })
        },
        onError: (err) => console.log(err)
    })

    const [sameRooms, setSameRooms] = useState([]);


    const handleGetDirections = ({ longitude, latitude }) => {

        const getLocation = async () => {
            try {
                let { status } = await Location.requestPermissionsAsync();
                if (status !== 'granted') {
                    setErrorMsg('Permission to access location was denied');
                    return;
                }
                let { coords } = await Location.getCurrentPositionAsync({});

                return coords

            } catch (error) {
                console.log(error)
            }
        }
        const data = {
            source: getLocation(),
            destination: {
                latitude,
                longitude
            },
            params: [
                {
                    key: "travelmode",
                    value: "motorcycle "        // may be "walking", "bicycling" or "transit" as well
                },
                {
                    key: "dir_action",
                    value: "navigate"       // this instantly initializes navigation using the given travel mode
                }
            ],
        }

        getDirections(data)
    }

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
                            key={`${index}${item}`}
                            style={{
                                flex: 1,
                                justifyContent: 'center',
                                backgroundColor: 'transparent'
                            }}
                        >
                            <Text>{`http${URI}images/${item}`}</Text>
                            <Image
                                resizeMode="stretch"
                                style={{
                                    width: SIZES.width,
                                    flex: 1,
                                }}
                                source={{ uri: `http${URI}images/${item}` }}
                            />
                        </View>

                    ))
                }

            </Swiper >
        )
    }

    const renderGroupButton = () => {
        return (
            <View style={{
                flexDirection: 'row',
                position: "absolute",
                bottom: SIZES.padding,
                width: SIZES.width,
                paddingHorizontal: SIZES.base,
                justifyContent: 'space-between'
            }}>
                <PrimaryButton text="Đã thuê" buttonStyle={{
                    backgroundColor: COLORS.Google
                }} />

                <PrimaryButton text="Chỉnh sửa" buttonStyle={{
                    backgroundColor: COLORS.primary
                }}
                    onclick={() => {
                        navigation.push('CreateProduct', {
                            idRoom
                        })
                    }}
                />
            </View>
        )
    }


    const callNumber = phone => {
        let phoneNumber = phone;
        if (Platform.OS !== 'android') {
            phoneNumber = `telprompt:${phone}`;
        }
        else {
            phoneNumber = `tel:${phone}`;
        }
        Linking.canOpenURL(phoneNumber)
            .then(supported => {
                if (!supported) {
                    Alert.alert('Phone number is not available');
                } else {
                    return Linking.openURL(phoneNumber);
                }
            })
            .catch(err => console.log(err));
    };


    const renderProduct = React.useCallback(() => {

        if (currentRoom) {
            let { room } = currentRoom
            let { createdBy, images, utilities, address } = room

            let Utilities = utilities.map(item => listUtilities.find((itemUtilities) => itemUtilities.value == item))

            return <>
                <View
                    style={{
                        height: SIZES.width * 2 / 3,
                        zIndex: 1
                    }}
                >
                    {renderSlideProduct(images)}
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
                    >Tìm người thuê. {room.peoples} <Ionicons name={room.sex == 0 ? "male-female-outline" : room.sex == 1 ? "female-outline" : "female-outline"} size={13} color="black" /></Text>
                    <Text
                        style={{
                            ...FONTS.body2,
                            color: '#333333'
                        }}
                    >
                        {room.roomName}
                    </Text>
                    <View
                        style={{
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}
                    >
                        <Text style={{ ...FONTS.h3, color: COLORS.primary, marginVertical: SIZES.base }}>{room.price.room.price / 1000000} triệu VND/phòng</Text>
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
                                > {room.acreage} <SubText base="m" exponent="2" color={COLORS.primary} /></Text>
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
                                >{room.price.room.price / 1000000}tr </Text>
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
                                }}>{room.price.electricity.free ? 'free' : `${room.price.electricity.price / 1000}k`}</Text>
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
                                }}>{room.price.water.free ? 'free' : `${room.price.water.price / 1000}k`}</Text>
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
                                }}>{room.price.internet.free ? 'free' : `${room.price.internet.price / 1000}k`}</Text>
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
                                }}>{room.price.internet.free ? 'free' : `${room.price.internet.price / 1000}k`}</Text>
                        </View>

                    </View>
                </View>
                {/* --------------- ----- */}
                {/* <View
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
                </View> */}
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
                    }}>
                        <GroupUtilities utilities={Utilities} />
                    </View>

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

                        onPress={() => handleGetDirections({
                            latitude: address.loc.coordinates[1],
                            longitude: address.loc.coordinates[0]
                        })}
                    >
                        <Text>
                            <Feather name="map-pin" size={SIZES.body3} color="black" />
                            <Text >{room && room.address && `${room.address.name.any}, ${room.address.name.wardsAndStreet}, ${room.address.name.districts},${room.address.name.city}`} </Text>
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
                        onPress={() => callNumber(room.phone)}
                    >
                        <Text>
                            <Feather name="phone" size={SIZES.body3} color="black" />
                            <Text>  </Text>
                            <Text >{room.phone}</Text>
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

                    onPress={() => {
                        createChatRoom({
                            variables: {
                                user_id: createdBy._id
                            }
                        })
                    }}
                >

                    <Avatar.Image size={70} source={{ uri: createdBy && createdBy.avatar ? `${URI}/images/${createdBy.avatar}` : 'https://images.daznservices.com/di/library/GOAL/e8/d1/mason-mount-chelsea_1u2vf25gf8pl31mk1yhvfwoxv9.jpg?t=64552568&amp;quality=60&amp;w=800' }} />
                    <View
                        style={{
                            flex: 1
                        }}
                    >
                        <Text
                            style={{ ...FONTS.body2, marginLeft: SIZES.padding }}
                        >
                            {room.createdBy && room.createdBy.name ? room.createdBy.name : room.createdBy.email}
                        </Text>
                    </View>
                    <Feather name="chevron-right" size={24} color="black" />

                </TouchableOpacity>
                {/* ---------------Poster-------------- */}
                {/* ---------------Utilities----------- */}

                {/* ---------------Utilities----------- */}


            </>
        }

        return <> </>

    }, [currentRoom])

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
                {currentRoom && !loading && <>
                    {renderProduct()}
                    <View
                        style={{
                            backgroundColor: COLORS.white,
                            padding: SIZES.padding,
                            marginBottom: rent ? SIZES.padding * 3 : SIZES.base,
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
                </>}

            </Animated.ScrollView>
            {rent && renderGroupButton()}
        </View >
    )
}
