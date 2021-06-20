import React, { useRef, useState } from 'react';
import { FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { COLORS, SHADOW, SIZES } from '../../../constants';
import NodeChat from './NodeChat';

const ChatList = ({ chatData, currentUser }) => {

    const flatListRef = useRef(null);

    const renderChatLine = ({ item }) => {
        console.log(item)
        if (item?.to?._id && item.to._id !== currentUser) {
            return (
                <View style={{ alignItems: 'flex-end' }} >
                    <NodeChat sender="You" chatContent={item.messageBody} createdAt={item.createdAt} />
                </View>
            );
        }
        return (
            <>
                <NodeChat sender={item.from.name ? item.from.name : item.from.email} chatContent={item.messageBody} createdAt={item.createdAt} />
            </>
        );
    };
    return (
        <View style={styles.container}>
            {
                chatData &&
                <FlatList
                    ref={flatListRef}
                    data={chatData}
                    onContentSizeChange={() => flatListRef.current.scrollToEnd()}
                    renderItem={renderChatLine}
                    styles={{ ...SHADOW.shadow1, flex: 1 }}
                />
            }



        </View >
    )


}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-end',
        backgroundColor: 'rgba(0,0,0,0.1)'
    },

    chatTextboxView: {
        flexDirection: 'row',
        height: '100%',
        justifyContent: 'space-around',
        alignItems: 'center',
        marginLeft: 2,
    },
    touchText: {
        color: COLORS.primaryTextColor,
        fontSize: 14
    },
    chatLineView: {
        flex: 1,
        flexDirection: 'column',
        width: '50%',
        alignItems: 'flex-start',
        padding: 8,
        backgroundColor: '#ffffff',
        borderRadius: 8,
        marginBottom: 10,
        marginTop: 10,
        marginLeft: 5,
        marginRight: 5
    },

    button: {
        height: 46,
        borderRadius: 10,
        backgroundColor: COLORS.primary,
        justifyContent: 'center',
        alignItems: 'center'
    },

});

export default ChatList