//import liraries
import { useApolloClient } from '@apollo/client';
import { useQuery } from '@apollo/client';
import { useNavigation } from '@react-navigation/core';
import React from 'react';
import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Header from '../../components/Header';
import { COLORS, FONTS, SIZES } from '../../constants';
import { URI } from '../../graphql/apollo';
import { GET_ALL_CHAT_ROOM } from '../../graphql/chat';
import { CURRENT_USER, USER_INFO } from '../../graphql/user';

// create a component
const MessagesScreen = () => {
    const navigation = useNavigation();

    const { data: listRoomChat, loading, error } = useQuery(GET_ALL_CHAT_ROOM)
    const client = useApolloClient();
    const { user } = client.readQuery({
        query: CURRENT_USER
    })

    let itemChat = ({ index, item }) => {

        let itemData = item.members.find(member => member._id !== user._id)
        return (
            <TouchableOpacity
                style={{
                    padding: SIZES.padding,
                    flexDirection: 'row',
                    alignItems: 'center'
                }}

                onPress={() => navigation.push('ChatList', {
                    _id: item._id,
                    userId: user._id,
                    to: itemData._id
                })}
            >
                <Image source={{ uri: itemData.avatar ? `http${URI}images/${itemData.avatar}` : 'https://loremflickr.com/320/240' }}
                    style={{
                        width: SIZES.padding * 3,
                        height: SIZES.padding * 3,
                        borderRadius: SIZES.padding * 1.5,
                        marginRight: SIZES.padding
                    }}
                />
                <View>
                    <Text
                        style={{
                            ...FONTS.h3
                        }}
                    >{itemData.name ? itemData.name : itemData.email}</Text>
                    <Text>lorem text lorem text lorem text </Text>
                </View>
            </TouchableOpacity>
        )
    }

    const renderListItemChat = React.useCallback(() => {
        return (<FlatList
            contentContainerStyle={{ alignSelf: 'flex-start' }}
            data={listRoomChat ? listRoomChat.getAllChatRooms : []}
            renderItem={itemChat}
            style={{
                marginTop: SIZES.base,
            }}
        />)
    }, [listRoomChat, loading, error]
    )


    return (
        <View style={styles.container}>
            <Header title="Tin nhắn" />

            {
                renderListItemChat()
            }
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
export default MessagesScreen;
