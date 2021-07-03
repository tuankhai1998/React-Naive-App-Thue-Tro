import { useApolloClient } from '@apollo/client';
import { useLazyQuery } from '@apollo/client';
import { useQuery } from '@apollo/react-hooks';
import React, { useEffect, useState } from 'react'
import { View, Text, Image, FlatList, TouchableOpacity } from 'react-native'
import { COLORS, FONTS, Images, SIZES } from '../../constants';
import { CURRENT_ROOM, FETCH_ROOM } from '../../graphql/room';
import { CURRENT_USER, GET_LIST_ROOM_LIKED } from '../../graphql/user';
import ItemVerticalList from '../ItemVerticalList';


const NewRoom = ({ city }) => {
    let [page, setPage] = useState(0);
    let [fetchNewRoom, { data }] = useLazyQuery(FETCH_ROOM);
    let [newRoom, setNewRoom] = useState([]);
    const client = useApolloClient();
    const listRoomLike = client.readQuery({
        query: GET_LIST_ROOM_LIKED
    });
    const userLiked = listRoomLike?.user && listRoomLike?.user?.liked?.map(roomLike => roomLike._id)
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
                    data={newRoom.length > 0 ? newRoom : []}
                    renderItem={({ item, index }) => <ItemVerticalList item={item} index={index} userLiked={userLiked} />}
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


