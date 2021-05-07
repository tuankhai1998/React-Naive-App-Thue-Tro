//import liraries
import { useNavigation } from '@react-navigation/core';
import React, { useEffect, useState } from 'react';
import { FlatList, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import HotRoom from '../../components/Home/HotRoom';
import NewRoom from '../../components/Home/NewRoom';
import { Images } from '../../constants';
import { city } from '../../constants/city';
import { COLORS, FONTS, SIZES } from '../../constants/theme';
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

    const navigation = useNavigation();

    const getCity = () => {
        return citySelect == 1 ? 'Hồ Chí Minh' : citySelect == 2 ? 'Hà Nội' : 'Đà Nẵng'
    }
   
    return (
        <ScrollView style={{
            flex: 1,
            backgroundColor: 'rgba(0,0,0,0.1)'
        }}>
            <HomeHeader citySelected={citySelect} changeCitySelected={(id) => setCitySelect(id)} city={city} />
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
            <HotRoom city={citySelect == 1 ? 'Hồ Chí Minh' : citySelect == 2 ? 'Hà Nội' : 'Đà Nẵng'} />


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

            <NewRoom city={getCity()} />



        </ScrollView>
    );
};


//make this component available to the app
export default HomeScreen;