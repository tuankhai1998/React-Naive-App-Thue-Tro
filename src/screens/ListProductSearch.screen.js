import { useLazyQuery } from '@apollo/client';
import { useNavigation, useRoute } from '@react-navigation/core'
import React, { useEffect, useState } from 'react'
import { View, Text, FlatList } from 'react-native'
import Header from '../components/Header';
import ItemVerticalList from '../components/ItemVerticalList';
import { COLORS, SIZES } from '../constants'
import { FETCH_ROOM } from '../graphql/room';

export default function ListProductSearchScreen() {
    const [page, setPage] = useState(0);
    const route = useRoute();
    const { params } = route;
    const [fetchRoom, { data, error }] = useLazyQuery(FETCH_ROOM);

    useEffect(() => {
        fetchRoom({
            variables: {
                page: page,
                per_page: 6,
                query: {
                    addressName: {
                        district: params.district,
                        city: params.city
                    }
                }
            }
        })
    }, [params])

    return (
        <>
            <Header title="Kết quả tìm kiếm" left />
            <View
                style={{
                    flex: 1,
                    backgroundColor: COLORS.white,
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
                    data={data && data.rooms ? data.rooms : []}
                    renderItem={({ item, index }) => <ItemVerticalList item={item} index={index} />}
                    style={{
                        marginTop: SIZES.base,
                    }}
                />

            </View>
        </>
    )
}
