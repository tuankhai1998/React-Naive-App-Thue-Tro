import { useApolloClient, useMutation } from '@apollo/client';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/core';
import React from 'react';
import { ImageBackground, Text, TouchableOpacity, View } from 'react-native';
import { COLORS, FONTS, Images, SIZES } from '../constants';
import { roomType_FN } from '../constants/variable';
import { CURRENT_USER, TOGGLE_LIKE_ROOM } from '../graphql/user';


const ItemVerticalList = ({ item, index }) => {
    const navigation = useNavigation();

    const client = useApolloClient();
    const { user } = client.readQuery({
        query: CURRENT_USER
    });
    const [handleLikeRoom, { loading }] = useMutation(TOGGLE_LIKE_ROOM);
    const userLiked = user?.liked.map(roomLike => roomLike._id)


    return (
        <TouchableOpacity
            style={{
                width: SIZES.containerWidth + SIZES.base,
                minHeight: 50,
                marginBottom: SIZES.padding,
                flexDirection: "row"
            }}

            onPress={() => navigation.push('ProductScreen', {
                idRoom: item._id
            })}
        >
            <View
                style={{
                    width: SIZES.containerWidth / 2 - SIZES.base / 2,
                    height: (SIZES.containerWidth / 2 - SIZES.base) * 12 / 16,
                    borderRadius: SIZES.radius,
                    overflow: 'hidden'
                }}
            >
                <ImageBackground
                    source={{ uri: item && item.images ? item.images[0] : Images.ImageLoading }}
                    style={{
                        width: '100%',
                        height: "100%",
                    }}
                >
                    <TouchableOpacity
                        style={{
                            marginTop: 5,
                            marginLeft: 'auto',
                            marginRight: 5,
                            backgroundColor: 'rgba(0,0,0,0.3)',
                            padding: 2,
                            borderRadius: 10
                        }}
                        onPress={
                            () => {
                                handleLikeRoom({
                                    variables: {
                                        idRoom: item._id
                                    }
                                })
                            }
                        }
                    >
                        {
                            userLiked && userLiked.indexOf(item._id) !== -1 ? <Ionicons name="heart-sharp" size={16} color={COLORS.Google} /> : <Ionicons name="heart-outline" size={16} color={COLORS.white} />
                        }
                    </TouchableOpacity>
                </ImageBackground>
            </View>

            {


                item && item.type && item.address && item.price ? (
                    <View
                        style={{
                            flex: 1,
                            marginLeft: SIZES.base
                        }}
                    >
                        <Text style={{ ...FONTS.body4, textTransform: "uppercase", fontSize: 12 }}>{roomType_FN(item.type)}</Text>
                        <Text style={{ ...FONTS.h4 }} numberOfLines={2}>
                            {`${roomType_FN(item.type)} ${item.address.name.city}, ${item.address.name.districts}`}
                        </Text>
                        <Text
                            style={{
                                ...FONTS.body4,
                                fontWeight: 'bold',
                                color: COLORS.secondary
                            }}
                        >
                            {`${item.price.room.price / 1000000} triệu/phòng`}
                        </Text>
                        <Text numberOfLines={2} ellipsizeMode='middle'>{`${item.address.name.city}, ${item.address.name.districts}, ${item.address.name.wardsAndStreet}`}</Text>
                    </View>
                ) : (<View
                    style={{
                        flex: 1,
                        marginLeft: SIZES.base
                    }}
                >
                    <View style={{ backgroundColor: COLORS.gray, width: '80%', height: 10, marginTop: SIZES.base / 2 }}></View>
                    <View style={{ backgroundColor: COLORS.gray, width: '80%', height: 10, marginTop: SIZES.base / 2 }}></View>
                    <View style={{ backgroundColor: COLORS.gray, width: '80%', height: 10, marginTop: SIZES.base / 2 }}></View>
                    <View style={{ backgroundColor: COLORS.gray, width: '60%', height: 10, marginTop: SIZES.base / 2 }}></View>
                    <View style={{ backgroundColor: COLORS.gray, width: '60%', height: 10, marginTop: SIZES.base / 2 }}></View>
                </View>)
            }
        </TouchableOpacity >
    )
}


export default ItemVerticalList;

