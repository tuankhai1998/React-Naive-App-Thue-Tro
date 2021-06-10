import React, { useRef, useState } from 'react';
import { FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { COLORS, SHADOW, SIZES } from '../../../constants';
import NodeChat from './NodeChat';

const ChatList = () => {
    const [userName, setUserName] = useState('khailt');
    const [chatInputContent, setChatInputContent] = useState('');
    const [chatData, setChatData] = useState([
        { userName: 'khailt', messages: 'HahahaHahahaHahahaHahahaHahahaHahahaHahahaHahahaHahaha Hahaha' },
        { userName: 'khanhNv', messages: 'hello' },
        { userName: 'khailt', messages: 'hello 1' },
        { userName: 'khailt', messages: 'HahahaHahahaHahahaHahahaHahahaHahahaHahahaHahahaHahaha Hahaha' },
        { userName: 'khanhNv', messages: 'hello' },
        { userName: 'khailt', messages: 'hello 1' },
        { userName: 'khailt', messages: 'HahahaHahahaHahahaHahahaHahahaHahahaHahahaHahahaHahaha Hahaha' },
        { userName: 'khanhNv', messages: 'hello' },
        { userName: 'khailt', messages: 'hello 1' }, { userName: 'khailt', messages: 'HahahaHahahaHahahaHahahaHahahaHahahaHahahaHahahaHahaha Hahaha' },
        { userName: 'khanhNv', messages: 'hello' },
        { userName: 'khailt', messages: 'hello 1' }, { userName: 'khailt', messages: 'HahahaHahahaHahahaHahahaHahahaHahahaHahahaHahahaHahaha Hahaha' },
        { userName: 'khanhNv', messages: 'hello' },
        { userName: 'khailt', messages: 'hello 1' }, { userName: 'khailt', messages: 'HahahaHahahaHahahaHahahaHahahaHahahaHahahaHahahaHahaha Hahaha' },
        { userName: 'khanhNv', messages: 'hello' },
        { userName: 'khailt', messages: 'ends' },
        { userName: 'khanhNv', messages: 'not end' },
    ]);

    const flatListRef = useRef(null);

    const renderChatLine = (item) => {
        if (item.userName === userName) {
            return (
                <View style={{ alignItems: 'flex-end' }} >
                    <NodeChat sender="You" chatContent={item.messages} />
                </View>
            );
        }
        return (
            <NodeChat sender={item.userName} chatContent={item.messages} />
        );
    };
    return (
        <View style={styles.container}>
            <FlatList
                ref={flatListRef}
                data={chatData}
                onContentSizeChange={() => flatListRef.current.scrollToEnd()}

                renderItem={({ item }, index) => renderChatLine(item)}
                styles={{ ...SHADOW.shadow1, flex: 1 }}
            />


            <View style={{ paddingVertical: SIZES.padding, paddingHorizontal: SIZES.base, marginTop: SIZES.base, backgroundColor: COLORS.white, height: SIZES.height / 10 }} >
                <View style={styles.chatTextboxView}>
                    <View style={{ flex: 8 / 10 }} >
                        <TextInput placeholder="Typing..." value={chatInputContent} onChangeText={(text) => setChatInputContent(text)}
                            style={{ height: 46, fontSize: 18, borderBottomColor: COLORS.primary, borderBottomWidth: 1, paddingHorizontal: SIZES.base }} />
                    </View>
                    <View style={{ flex: 2 / 10 }} >
                        <TouchableOpacity onPress={() => { }}>
                            <View style={styles.button}>
                                <Text style={styles.touchText}>Send</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
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