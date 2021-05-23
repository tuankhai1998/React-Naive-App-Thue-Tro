//import liraries
import { useApolloClient, useQuery } from '@apollo/client';
import React from 'react';
import { ActivityIndicator, FlatList, StyleSheet, View } from 'react-native';
import Header from '../../components/Header';
import ItemVerticalList from '../../components/ItemVerticalList';
import { COLORS, SIZES } from '../../constants';
import { GET_LIST_ROOM_LIKED } from '../../graphql/user';

// create a component
const LikeScreen = () => {

    const { loading } = useQuery(GET_LIST_ROOM_LIKED);
    const client = useApolloClient();
    const { user } = client.readQuery({
        query: GET_LIST_ROOM_LIKED
    })
    const userLiked = user && user?.liked?.map(roomLike => roomLike._id)

    return (
        <View style={styles.container}>
            <Header title="Like" />
            <View
                style={{
                    alignItems: 'center'
                }}
            >
                {loading && <ActivityIndicator size="large" color={COLORS.primary} />}
                <FlatList
                    contentContainerStyle={{ alignSelf: 'flex-start' }}
                    showsVerticalScrollIndicator={false}
                    showsHorizontalScrollIndicator={false}
                    data={user?.liked.length > 0 ? user?.liked : []}
                    renderItem={({ item, index }) => <ItemVerticalList index={index} item={item} userLiked={userLiked} />}
                    style={{
                        marginTop: SIZES.base,

                    }}
                />
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
export default LikeScreen;
