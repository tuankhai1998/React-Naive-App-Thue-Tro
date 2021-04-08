import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/core";
import React from "react";
import {
    Animated,
    Platform,
    StyleSheet,
    Text, TouchableOpacity, View
} from "react-native";
//Animatable
import * as Animatable from "react-native-animatable";
import { COLORS, FONTS, SIZES } from "../../../constants";

const HEADER_MAX_HEIGHT = SIZES.width * 2 / 3;
const HEADER_MIN_HEIGHT = Platform.OS === "android" ? SIZES.height / 11 : SIZES.height > 667 ? 80 : 70;
const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;

export const ProductHeader = ({ scrollY }) => {
    const headerTranslate = scrollY.interpolate({
        inputRange: [0, HEADER_SCROLL_DISTANCE],
        outputRange: [0, -HEADER_SCROLL_DISTANCE],
        extrapolate: "clamp",
    });
    const navigation = useNavigation();
    const headerOpacity = scrollY.interpolate({
        inputRange: [0, HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE],
        outputRange: [0, 0, 1],
        extrapolate: "clamp",
    });
    const imageOpacity = scrollY.interpolate({
        inputRange: [0, HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE],
        outputRange: [0, 0, 1],
        extrapolate: "clamp",
    });

    const iconOpacity = scrollY.interpolate({
        inputRange: [0, HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE],
        outputRange: [1, 0.5, 0],
        extrapolate: "clamp",
    });

    return (
        <Animatable.View delay={500} animation="fadeInDown" style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            zIndex: 100,
        }} >
            <View style={{ ...styles.topBar }}>
                <TouchableOpacity
                    onPress={() => {
                        navigation.goBack();
                    }}
                    style={styles.goBackIcon}
                >
                    <View style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                        width: 30,
                        height: 30,
                        borderRadius: 15,
                        overflow: "hidden"
                    }}>
                        <Animated.View
                            style={{
                                backgroundColor: `rgb(255,255,255)`,
                                justifyContent: 'center',
                                alignItems: 'center',
                                width: 30,
                                height: 30,
                                borderRadius: 15,
                                overflow: "hidden",
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                opacity: iconOpacity,
                            }}
                        />
                        <Ionicons name="ios-arrow-back" size={25} color={COLORS.primaryTextColor} />
                    </View>
                </TouchableOpacity>
                <Animated.View style={{ opacity: headerOpacity }}>
                    <Text
                        style={{ color: COLORS.primaryTextColor, fontWeight: "500", ...FONTS.body2 }}
                    >
                        Thông tin phòng
                    </Text>
                </Animated.View>
                <View style={styles.shareIcon}>

                </View>
            </View>
            <Animated.View
                style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    backgroundColor: COLORS.white,
                    overflow: "hidden",
                    opacity: imageOpacity,
                    height: HEADER_MAX_HEIGHT,
                    transform: [{ translateY: headerTranslate }],

                }}
            ></Animated.View>



        </Animatable.View >
    );
};

const styles = StyleSheet.create({
    topBar: {
        paddingTop: Platform.OS !== "android" ? 25 : SIZES.height > 2 * SIZES.width ? 40 : 15,
        width: "100%",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        paddingHorizontal: 20,
        alignItems: "center",
        height: HEADER_MIN_HEIGHT,
        zIndex: 1000,
    },
    goBackIcon: {
        width: 40,
    },
    shareIcon: {
        width: 40,
        alignItems: "flex-end",
    },
    image: {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        width: null,
        height: HEADER_MAX_HEIGHT,
        resizeMode: "stretch",
    },
});
