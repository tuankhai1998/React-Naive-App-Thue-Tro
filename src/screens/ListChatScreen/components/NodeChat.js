import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { FONTS, SHADOW } from '../../../constants';

const NodeChat = ({ sender, chatContent, createdAt }) => {

    const handelCreatedAt = () => {
        let now = Date.now();
        let millisBetween = now - createdAt;

        if (millisBetween < 1000 * 3600) return `${(millisBetween / (3600 * 1000) * 60).toFixed(0)} minutes ago`
        if (millisBetween < 1000 * 3600 * 24) return `${(millisBetween / (1000 * 3600)).toFixed(0)} hours ago`

        return `${(millisBetween / (1000 * 3600 * 24)).toFixed(0)} days ago`
    }

    return (
        <View style={{ ...styles.chatLineView, ...SHADOW.shadow1 }} >
            <View style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                width: '100%'
            }}>
                <Text style={styles.itemUserName}>{sender} </Text>
                <Text>{handelCreatedAt()}</Text>
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

