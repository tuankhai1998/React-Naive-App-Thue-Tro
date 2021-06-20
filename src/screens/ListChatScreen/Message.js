//import liraries
import { useLazyQuery } from '@apollo/client';
import { useApolloClient, useMutation } from '@apollo/react-hooks';
import { useRoute } from '@react-navigation/core';
import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Header from '../../components/Header';
import { COLORS, SIZES } from '../../constants';
import { GET_ALL_MESSAGE_ROOM, SEND_MESSAGE } from '../../graphql/chat';
import ChatList from './components/ChatList';

// create a component
const Messages = () => {
    const [chatInputContent, setChatInputContent] = useState('');
    const router = useRoute();
    const { _id, userId, to } = router.params;
    const [getListQuery] = useLazyQuery(GET_ALL_MESSAGE_ROOM)
    const client = useApolloClient()
    let dataMessages = client.readQuery({
        query: GET_ALL_MESSAGE_ROOM,
        variables: {
            roomID: _id
        }
    })


    const [sendMessage] = useMutation(SEND_MESSAGE, {
        onCompleted: () => {
            setChatInputContent('')
        },
        onError: (err) => {
            console.log(err)
        }
    })

    React.useEffect(() => {
        if (_id) {
            getListQuery({
                variables: {
                    roomID: _id
                }
            })
        }
    }, [_id]);

    return (
        <View style={{ flex: 1 }}>
            <Header title="Tin nhắn" left />
            <ChatList chatData={dataMessages?.getAllMessageOfChatRoom ? dataMessages.getAllMessageOfChatRoom : []} currentUser={userId} />
            <View style={{ paddingVertical: SIZES.padding, paddingHorizontal: SIZES.base, marginTop: SIZES.base, backgroundColor: COLORS.white, height: SIZES.height / 10 }} >
                <View style={styles.chatTextboxView}>
                    <View style={{ flex: 8 / 10 }} >
                        <TextInput placeholder="Typing..." value={chatInputContent} onChangeText={(text) => setChatInputContent(text)}
                            style={{ height: 46, fontSize: 18, borderBottomColor: COLORS.primary, borderBottomWidth: 1, paddingHorizontal: SIZES.base }} />
                    </View>
                    <View style={{ flex: 2 / 10 }} >
                        <TouchableOpacity onPress={() => {
                            if (chatInputContent.trim() !== '') {
                                sendMessage({
                                    variables: {
                                        chatRoom: _id,
                                        messageBody: chatInputContent.trim(),
                                        to
                                    }
                                })
                            }
                        }}>
                            <View style={styles.button}>
                                <Text style={styles.touchText}>Send</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </View>
    );
};


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


//make this component available to the app
export default Messages;
