import { useLazyQuery } from '@apollo/client';
import React, { useEffect, useState } from 'react'
import { View, Text, Image, FlatList, TouchableOpacity } from 'react-native'
import { COLORS, FONTS, Images, SIZES } from '../../constants';
import { FETCH_ROOM } from '../../graphql/room';
import ItemVerticalList from '../ItemVerticalList';

let district = {
    1: [
        {
            name: "Hai Bà Trưng",
            image: Images.HBT
        },
        {
            name: "Đống Đa",
            image: Images.DONGDA
        },
        {
            name: "Cầu Giấy",
            image: Images.CAUGIAY
        },
        {
            name: "Nam Từ Liêm",
            image: Images.NAMTULIEM
        },
        {
            name: "Bắc Từ Liêm",
            image: Images.BACTULIEM
        },
        {
            name: "Hoàng Mai",
            image: Images.HOANGMAI
        }
    ]
}

const NewRoom = ({ city }) => {
    let [page, setPage] = useState(0);
    let [fetchNewRoom, { data, loading, error }] = useLazyQuery(FETCH_ROOM);
    let [newRoom, setNewRoom] = useState([]);



    useEffect(() => {
        fetchNewRoom({
            variables: {
                page: page,
                per_page: 5,
                query: {
                    addressName: {
                        city
                    }
                },
                sortBy: [
                    {
                        key: "createdAt",
                        value: true
                    }
                ]
            }
        })
    }, [page, city])


    useEffect(() => {
        if (data && page > 0) {
            setNewRoom([...newRoom, ...data.rooms])
        } else if (data) {
            setNewRoom([...data.rooms])
        }
    }, [data])

    useEffect(() => {
        setPage(0)
    }, [city])

    return (
        <>
            <View
                style={{
                    backgroundColor: COLORS.white,
                    paddingVertical: SIZES.base,
                    marginBottom: SIZES.base,
                    marginTop: SIZES.padding,
                    justifyContent: 'center',
                    alignItems: 'center'
                }}
            >

                <Image
                    source={Images.NEWROOM}
                    style={{
                        width: SIZES.width - 2 * SIZES.base,
                        height: SIZES.width * 1 / 3,
                        resizeMode: 'cover',
                        borderRadius: SIZES.radius / 2
                    }}


                />
            </View>
            <View
                style={{
                    flex: 1,
                    backgroundColor: COLORS.white,
                    borderRadius: SIZES.radius,
                    paddingVertical: SIZES.base,
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginBottom: SIZES.padding,
                }}
            >
                <FlatList
                    contentContainerStyle={{ alignSelf: 'flex-start' }}
                    showsVerticalScrollIndicator={false}
                    showsHorizontalScrollIndicator={false}
                    data={newRoom.length > 0 ? newRoom : district['1']}
                    renderItem={({ item, index }) => <ItemVerticalList item={item} index={index} />}
                    style={{
                        marginTop: SIZES.base,
                    }}
                />

                <TouchableOpacity
                    onPress={() => {
                        setPage(page + 1);
                    }}
                >
                    <Text
                        style={{
                            textAlign: 'center',
                            ...FONTS.body3,
                            color: '#0000EE'
                        }}
                    >Xem Thêm</Text>
                </TouchableOpacity>

            </View>
        </>
    )
}

export default NewRoom;


