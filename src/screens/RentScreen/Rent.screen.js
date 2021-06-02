//import liraries
import { useApolloClient, useLazyQuery } from '@apollo/client';
import { useNavigation } from '@react-navigation/core';
import { useFocusEffect } from '@react-navigation/native';
import React from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import Header from '../../components/Header';
import ItemVerticalList from '../../components/ItemVerticalList';
import { COLORS, SIZES } from '../../constants';
import { ROOM_USER_CREATED } from '../../graphql/room';

// create a component
const RentScreen = () => {
    const navigation = useNavigation();
    const [getRoomUserCreated, { loading }] = useLazyQuery(ROOM_USER_CREATED)
    const client = useApolloClient();
    const data = client.readQuery({
        query: ROOM_USER_CREATED
    })



    useFocusEffect(
        React.useCallback(() => {
            getRoomUserCreated()
        }, [])
    )

    const renderListRoom = React.useCallback(() => {
        if (data) {
            return (
                <FlatList
                    contentContainerStyle={{ alignSelf: 'flex-start' }}
                    showsVerticalScrollIndicator={false}
                    showsHorizontalScrollIndicator={false}
                    data={data?.user?.created && data?.user?.created.length > 0 ? data?.user?.created : []}
                    renderItem={({ item, index }) => <ItemVerticalList item={item} index={index} rent={true} />}
                    style={{
                        marginTop: SIZES.base,
                    }}
                />
            )
        }
    }, [data])

    console.log({ loading, data })


    return (
        <View style={styles.container}>
            <Header title="Phòng của bạn" />
            <View
                style={{
                    alignItems: 'center',
                    flex: 1
                }}
            >
                {loading && !data ? <Text>Loading</Text> :
                    <>{renderListRoom()}</>
                }
            </View>
        </View>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.white,
    },
});

//make this component available to the app
export default RentScreen;
