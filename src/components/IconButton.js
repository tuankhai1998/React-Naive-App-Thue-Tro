import React, { useCallback } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { COLORS, FONTS, SIZES } from '../constants';

const IconButton = ({ srcIcon, text, selected, handleSelected, index }) => {

    const renderIconButton = useCallback(() => {
        return (
            <TouchableOpacity style={styles.item} onPress={() => { handleSelected(index, !selected) }}>
                <Image style={{ width: 30, height: 30, tintColor: selected ? COLORS.primary : COLORS.primaryTextColor }} source={srcIcon} />
                <Text style={{ fontSize: 12, color: selected ? COLORS.primary : COLORS.primaryTextColor, ...FONTS.body3 }}>{text}</Text>
            </TouchableOpacity>
        )
    }, [selected])
    return (
        renderIconButton()
    )
}

export default IconButton;


const styles = StyleSheet.create({
    item: {
        flexBasis: "25%",
        marginVertical: 10,
        alignItems: "center",
    },
})