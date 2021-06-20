import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { FONTS, SHADOW } from '../../../constants';

const NodeChat = ({ sender, chatContent, createdAt }) => {

    return (
        <View style={{ ...styles.chatLineView, ...SHADOW.shadow1 }} >
            <View style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                width: '100%'
            }}>
                <Text style={styles.itemUserName}>{sender} </Text>
                <Text>{createdAt}</Text>
            </View>

            <Text style={styles.itemText}>{chatContent}</Text>

        </View>
    );
}

export default NodeChat


const styles = StyleSheet.create({
    chatLineView: {
        flex: 1,
        flexDirection: 'column',
        maxWidth: '70%',
        alignItems: 'flex-start',
        padding: 8,
        backgroundColor: '#ffffff',
        borderRadius: 8,
        marginBottom: 10,
        marginTop: 10,
        marginLeft: 5,
        marginRight: 5
    },
    itemUserName: {
        color: "#3399ff",
        padding: 5,
        fontSize: 14,
        ...FONTS.body4
    },
    itemText: {
        color: "#000000",
        padding: 5,
        fontSize: 14,
        ...FONTS.body3
    },

});

