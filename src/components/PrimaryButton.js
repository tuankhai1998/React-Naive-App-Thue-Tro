import React from 'react';
import { TouchableOpacity, StyleSheet } from "react-native";
import { useTheme } from 'react-native-paper';
import Text from './Text';

const PrimaryButton = ({ buttonWidth, text, onclick, buttonStyle }) => {
    const { colors } = useTheme();
    return (
        <TouchableOpacity
            style={[{ width: buttonWidth ? buttonWidth : 200, backgroundColor: colors.primary }, styles.primaryButton, buttonStyle]}
            onPress={() => { onclick() }}
        >
            <Text style={styles.buttonText}>{text}</Text>
        </TouchableOpacity >
    );
}

export default PrimaryButton;


const styles = StyleSheet.create({
    primaryButton: {
        height: 50,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 5
    },
    buttonText: {
        textTransform: "uppercase",
        color: "#fff",
        fontWeight: "bold"
    },
})