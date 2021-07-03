//import liraries
import { useLazyQuery } from '@apollo/client';
import { useQuery } from '@apollo/client';
import { useFocusEffect } from '@react-navigation/core';
import React, { useState } from 'react';
import { FlatList, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { AuthContext } from '../../components/AuthContext';
import HotRoom from '../../components/Home/HotRoom';
import NewRoom from '../../components/Home/NewRoom';
import { Images } from '../../constants';
import { CITY } from '../../constants/city';
import { COLORS, FONTS, SIZES } from '../../constants/theme';
import { CURRENT_USER, GET_LIST_ROOM_LIKED, USER_INFO } from '../../graphql/user';
import { removeStorage } from '../../helpers/storage';
import BlogItem from './components/BlogItem';
import HomeHeader from './components/HomeHeader';
import SearchTrend from './components/SearchTrend';


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

// create a component

const HomeScreen = () => {
    let [citySelect, setCitySelect] = useState(2);
    const { loading } = useQuery(GET_LIST_ROOM_LIKED);
    const [getCurrentUser, { data, loading: currentUserLoading, error }] = useLazyQuery(CURRENT_USER);

    const { logOut } = React.useContext(AuthContext);
    useFocusEffect(
        React.useCallback(() => {
            getCurrentUser()
            if (error) {
                removeStorage().then(
                    () => {
                        logOut()
                    }
                ).catch(err => console.log(err))
            }
        }, [data])
    )

    const getCity = () => {
        return citySelect == 1 ? "Hồ Chí Minh" : citySelect == 2 ? "Hà Nội"  : "Đà Nẵng"
    }

    return (
        <ScrollView style={{
            flex: 1,
            backgroundColor: 'rgba(0,0,0,0.1)'
        }}>

            <HomeHeader citySelected={citySelect} changeCitySelected={(id) => setCitySelect(id)} city={CITY} />
            <View
                style={{
                    marginVertical: SIZES.padding,
                    paddingHorizontal: SIZES.padding
                }}
            >
                <Text
                    style={{
                        ...FONTS.body2,
                    }}
                >Xu hướng tìm kiếm</Text>
            </View>

            <View
                style={{
                    paddingHorizontal: SIZES.padding,
                }}
            >
                <FlatList
                    contentContainerStyle={{ alignSelf: 'flex-start' }}
                    numColumns={district['1'].length / 2}
                    showsVerticalScrollIndicator={false}
                    showsHorizontalScrollIndicator={false}
                    data={district['1']}
                    renderItem={({ item, index }) => <SearchTrend item={item} index={index} />}
                />
            </View>
            {!loading && <HotRoom city={getCity()} />}


            <View
                style={{
                    flex: 1,
                    backgroundColor: COLORS.white,
                    borderRadius: SIZES.radius,
                    paddingHorizontal: SIZES.padding,
                    paddingVertical: SIZES.radius,
                }}
            >
                <View
                    style={{
                        flexDirection: "row",
                        justifyContent: 'space-between',
                        alignItems: 'flex-end'
                    }}
                >
                    <Text
                        style={{
                            ...FONTS.body2,
                        }}
                    >FindHome Blog</Text>
                    <TouchableOpacity>
                        <Text
                            style={{
                                ...FONTS.body4,
                                color: '#0000EE'
                            }}
                        >Xem tất cả</Text>
                    </TouchableOpacity>
                </View>

                <FlatList
                    contentContainerStyle={{ alignSelf: 'flex-start' }}
                    horizontal={true}
                    showsVerticalScrollIndicator={false}
                    showsHorizontalScrollIndicator={false}
                    data={district['1']}
                    renderItem={({ item, index }) => <BlogItem item={item} index={index} />}
                    style={{
                        marginTop: SIZES.base,
                    }}
                />
            </View>

            {!loading && <NewRoom city={getCity()} />}
        </ScrollView>
    );
};


//make this component available to the app
export default HomeScreen;