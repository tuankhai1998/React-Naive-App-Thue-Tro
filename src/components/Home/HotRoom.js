import { useLazyQuery } from '@apollo/client';
import React, { useEffect, useState } from 'react'
import { View, Text, FlatList, TouchableOpacity } from 'react-native'
import { COLORS, FONTS, SIZES } from '../../constants'
import { FETCH_ROOM } from '../../graphql/room';
import ItemHorizontalList from '../ItemHorizontalList'

export default function HotRoom({ city }) {
    const [fetchRoom, { error: errorRoom, data: dataRoom, loading }] = useLazyQuery(FETCH_ROOM);
    const [hotRooms, setHotRooms] = useState([]),
        [page, setPage] = useState(0);


    useEffect(() => {
        fetchRoom({
            variables: {
                page,
                per_page: 6,
                query: {
                    addressName: {
                        city
                    }
                }
            }
        })
    }, [page, city])

    useEffect(() => {
        if (dataRoom && page > 0) {
            setHotRooms([...hotRooms, ...dataRoom.rooms]);
        } else if (dataRoom) {

            setHotRooms([...dataRoom.rooms]);
        }
    }, [dataRoom])

    useEffect(() => {
        setPage(0)
    }, [city])

    return (
        <View
            style={{
                flex: 1,
                backgroundColor: COLORS.white,
                borderRadius: SIZES.radius,
                marginVertical: SIZES.padding,
                paddingHorizontal: SIZES.padding,
                paddingVertical: SIZES.radius
            }}
        >
            <Text
                style={{
                    ...FONTS.body2,
                }}
            >Phòng nổi bật</Text>
            <FlatList
                contentContainerStyle={{ alignSelf: 'flex-start' }}
                numColumns={2}
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
                data={hotRooms.length > 0 ? hotRooms : []}
                renderItem={({ item, index }) => <ItemHorizontalList index={index} item={item} />}
                style={{
                    marginTop: SIZES.base,
                }}
            />


            <TouchableOpacity
                onPress={() => setPage(page + 1)}
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
    )
}
